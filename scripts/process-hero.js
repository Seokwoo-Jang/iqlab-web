const sharp = require('sharp');
const path = require('path');

// Remove the "intel CORE" wordmark from the silver IHS in hero_template.PNG.
// Strategy:
//  1. In a tight ROI around the silver chip face, build a "text" mask of dark
//     low-saturation pixels (the wordmark + TM glyph).
//  2. Dilate the mask slightly so anti-aliased edges are also covered.
//  3. Vertically inpaint: for every masked pixel, find the nearest non-masked
//     silver pixel above and below in the same column, then linearly blend
//     them by distance. The brushed-metal IHS has near-uniform vertical
//     gradient, so this leaves no visible seam.
async function main() {
  const input = path.resolve(__dirname, '..', '..', 'hero_template.PNG');
  const output = path.resolve(__dirname, '..', '..', 'hero_template_remove.png');

  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  if (channels !== 4) throw new Error('Expected RGBA');

  // ROI for the silver IHS (where the wordmark lives).
  const roi = { x0: 360, y0: 188, x1: 700, y1: 285 };

  // Build the text mask
  const mask = new Uint8Array(width * height);
  for (let y = roi.y0; y <= roi.y1; y++) {
    for (let x = roi.x0; x <= roi.x1; x++) {
      const idx = (y * width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const lum = (r + g + b) / 3;
      const sat = Math.max(r, g, b) - Math.min(r, g, b);
      // Dark, low-saturation → likely the wordmark
      if (lum < 135 && sat < 40) {
        mask[y * width + x] = 1;
      }
    }
  }

  // Dilate mask by 3 px to catch anti-aliasing halos.
  const dilated = new Uint8Array(width * height);
  const R = 3;
  for (let y = roi.y0; y <= roi.y1; y++) {
    for (let x = roi.x0; x <= roi.x1; x++) {
      if (!mask[y * width + x]) continue;
      for (let dy = -R; dy <= R; dy++) {
        for (let dx = -R; dx <= R; dx++) {
          const yy = y + dy;
          const xx = x + dx;
          if (yy < 0 || yy >= height || xx < 0 || xx >= width) continue;
          dilated[yy * width + xx] = 1;
        }
      }
    }
  }

  // Vertical inpaint: for each masked pixel, blend nearest non-masked silver
  // pixels above and below in the same column.
  const out = Buffer.from(data); // copy
  // Bounds for vertical search (slightly larger than ROI so we always find clean source pixels)
  const searchY0 = Math.max(0, roi.y0 - 30);
  const searchY1 = Math.min(height - 1, roi.y1 + 30);

  for (let x = roi.x0; x <= roi.x1; x++) {
    // Collect masked y-values in this column
    for (let y = roi.y0; y <= roi.y1; y++) {
      if (!dilated[y * width + x]) continue;

      // Search up
      let yUp = y - 1;
      while (yUp >= searchY0 && dilated[yUp * width + x]) yUp--;
      // Search down
      let yDn = y + 1;
      while (yDn <= searchY1 && dilated[yDn * width + x]) yDn++;

      const upOK = yUp >= searchY0;
      const dnOK = yDn <= searchY1;

      let r, g, b;
      if (upOK && dnOK) {
        const idxU = (yUp * width + x) * 4;
        const idxD = (yDn * width + x) * 4;
        const t = (y - yUp) / (yDn - yUp);
        r = data[idxU] * (1 - t) + data[idxD] * t;
        g = data[idxU + 1] * (1 - t) + data[idxD + 1] * t;
        b = data[idxU + 2] * (1 - t) + data[idxD + 2] * t;
      } else if (upOK) {
        const idxU = (yUp * width + x) * 4;
        r = data[idxU];
        g = data[idxU + 1];
        b = data[idxU + 2];
      } else if (dnOK) {
        const idxD = (yDn * width + x) * 4;
        r = data[idxD];
        g = data[idxD + 1];
        b = data[idxD + 2];
      } else {
        continue;
      }

      const idx = (y * width + x) * 4;
      out[idx] = Math.round(r);
      out[idx + 1] = Math.round(g);
      out[idx + 2] = Math.round(b);
      out[idx + 3] = 255;
    }
  }

  // Light horizontal smoothing across the inpainted region to dampen vertical
  // streaks left over from anti-aliased glyph edges.
  const smoothed = Buffer.from(out);
  for (let y = roi.y0; y <= roi.y1; y++) {
    for (let x = roi.x0; x <= roi.x1; x++) {
      if (!dilated[y * width + x]) continue;
      let sr = 0, sg = 0, sb = 0, n = 0;
      for (let dx = -2; dx <= 2; dx++) {
        const xx = x + dx;
        if (xx < 0 || xx >= width) continue;
        const idx = (y * width + xx) * 4;
        sr += out[idx];
        sg += out[idx + 1];
        sb += out[idx + 2];
        n++;
      }
      const idx = (y * width + x) * 4;
      smoothed[idx] = Math.round(sr / n);
      smoothed[idx + 1] = Math.round(sg / n);
      smoothed[idx + 2] = Math.round(sb / n);
    }
  }

  await sharp(smoothed, { raw: { width, height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(output);

  console.log(`OK -> ${output} (${width}x${height})`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
