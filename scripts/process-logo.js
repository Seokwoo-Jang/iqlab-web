const sharp = require('sharp');
const path = require('path');

// Remove white background from iqlab_logo.png and auto-crop edges.
// Pixels close to white become transparent; bounding box of the rest is cropped.
async function main() {
  const input = path.resolve(__dirname, '..', '..', 'iqlab_logo.png');
  const output = path.resolve(__dirname, '..', '..', 'iqlab_logo_remove.png');

  const img = sharp(input).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  // Build alpha mask: brighter / less saturated = more transparent.
  // The logo is dark red on white background, so we knock out near-white pixels.
  let minX = width, minY = height, maxX = -1, maxY = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      // Alpha: how "non-white" the pixel is.
      // A pixel that is fully white (255,255,255) → alpha 0.
      // A pure dark-red pixel → alpha 255.
      const minRGB = Math.min(r, g, b);
      const maxRGB = Math.max(r, g, b);
      // distance from white (lightness deficit)
      const lightDeficit = 255 - minRGB; // 0 if any channel is 255
      // colorfulness (saturation contribution)
      const colorfulness = maxRGB - minRGB;

      // Treat near-white as transparent.
      let a = Math.max(lightDeficit, colorfulness);
      // Boost so colored mid-tones go to opaque quickly.
      a = Math.min(255, Math.round(a * 1.6));
      if (a < 12) a = 0; // clamp tiny noise to 0
      data[idx + 3] = a;

      if (a > 12) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (maxX < minX || maxY < minY) {
    throw new Error('No opaque pixels found.');
  }

  // Add a small padding around the cropped logo.
  const pad = 8;
  const cx = Math.max(0, minX - pad);
  const cy = Math.max(0, minY - pad);
  const cw = Math.min(width, maxX + pad) - cx;
  const ch = Math.min(height, maxY + pad) - cy;

  await sharp(data, { raw: { width, height, channels: 4 } })
    .extract({ left: cx, top: cy, width: cw, height: ch })
    .png({ compressionLevel: 9 })
    .toFile(output);

  console.log(`OK -> ${output} (${cw}x${ch})`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
