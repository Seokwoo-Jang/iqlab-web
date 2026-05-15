const sharp = require('sharp');
const path = require('path');

// Strip the white studio background from the gold-pin chip stock image
// and write a transparent, tightly-cropped PNG.
async function main() {
  const input = path.resolve(
    __dirname,
    '..',
    '..',
    '..',
    '.cursor',
    'projects',
    'c-Users-wkdtj-make-web',
    'assets',
    'c__Users_wkdtj_AppData_Roaming_Cursor_User_workspaceStorage_d21a256abdfc6fe94dde9cd581d38208_images_image-74dbfe91-8005-4279-9371-c1b913389109.png',
  );
  const output = path.resolve(__dirname, '..', 'public', 'hero', 'chip-stock.png');

  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  // Binary-style mask with a thin 8-px anti-aliased ramp on the very edge.
  // The chip body is mid-grey, so a linear "distance-from-white" alpha makes it
  // semi-transparent. We instead consider a pixel "background" only when it's
  // very close to pure white, and treat everything else as fully opaque.
  const BG_NEAR = 10;   // <= this far from white  -> background
  const EDGE_FAR = 22;  // >= this far from white  -> fully opaque
  let minX = width, minY = height, maxX = -1, maxY = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      const minRGB = Math.min(r, g, b);
      const maxRGB = Math.max(r, g, b);
      const lightDeficit = 255 - minRGB;
      const colorfulness = maxRGB - minRGB;
      const dist = Math.max(lightDeficit, colorfulness);

      let a;
      if (dist <= BG_NEAR) {
        a = 0;
      } else if (dist >= EDGE_FAR) {
        a = 255;
      } else {
        a = Math.round(((dist - BG_NEAR) / (EDGE_FAR - BG_NEAR)) * 255);
      }
      data[idx + 3] = a;

      if (a > 24) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  const pad = 6;
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
