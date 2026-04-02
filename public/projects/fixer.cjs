const fs = require('fs');

const dataPath = 'c:\\Users\\yanik\\Music\\tuna\\src\\data\\projectsData.js';
let content = fs.readFileSync(dataPath, 'utf8');

content = content.replace(/thumbnail: p\('(.*?)', 'grid\.jpg'\), 'grid\.jpg'\),/g, "thumbnail: p('$1', 'grid.jpg'),");
content = content.replace(/thumbnail: p\('(.*?)', 'grid\.png'\), 'grid\.png'\),/g, "thumbnail: p('$1', 'grid.png'),");

fs.writeFileSync(dataPath, content);
console.log('Fixed syntax errors.');
