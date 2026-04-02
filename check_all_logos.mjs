import { readFileSync, readdirSync } from 'fs';

function getPNGDimensions(filepath) {
  try {
    const buf = readFileSync(filepath);
    let offset = 8;
    while (offset < buf.length) {
      const len = buf.readUInt32BE(offset);
      const type = buf.slice(offset + 4, offset + 8).toString('ascii');
      if (type === 'IHDR') {
        const w = buf.readUInt32BE(offset + 8);
        const h = buf.readUInt32BE(offset + 12);
        return { w, h };
      }
      offset += 12 + len;
    }
  } catch(e) {
    return null;
  }
  return null;
}

const files = readdirSync('src/assets').filter(f => f.endsWith('.png'));
for (const f of files) {
  const dims = getPNGDimensions(`src/assets/${f}`);
  if (dims) {
    console.log(`${f}: ${dims.w}x${dims.h} (ratio: ${(dims.w/dims.h).toFixed(2)})`);
  }
}
