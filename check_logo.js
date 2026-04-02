const fs = require('fs');
const buf = fs.readFileSync('src/assets/Bahtiyar TUNA Logo_2-07.png');
let offset = 8;
while (offset < buf.length) {
  const len = buf.readUInt32BE(offset);
  const type = buf.slice(offset + 4, offset + 8).toString('ascii');
  if (type === 'IHDR') {
    const w = buf.readUInt32BE(offset + 8);
    const h = buf.readUInt32BE(offset + 12);
    console.log('Width:', w, 'Height:', h, 'Ratio:', (w/h).toFixed(2));
    break;
  }
  offset += 12 + len;
}
