const fs = require('fs');

const dataPath = 'c:\\Users\\yanik\\Music\\tuna\\src\\data\\projectsData.js';
let content = fs.readFileSync(dataPath, 'utf8');

// Replace the galleries block
const outputText = fs.readFileSync('c:\\Users\\yanik\\Music\\tuna\\public\\projects\\sorter_full_output.txt', 'utf8');

const galleriesMatch = outputText.match(/(const galleries = \{[\s\S]*?\n\};\n)/);
const newGalleriesStr = galleriesMatch[1];

content = content.replace(/const galleries = \{[\s\S]*?\n\};\n/m, newGalleriesStr);

// Replace thumbnails
const thumbsMatch = outputText.match(/\/\/ THUMBNAILS:\n([\s\S]*)/);
const thumbsLines = thumbsMatch[1].split('\n').filter(l => l.trim() !== '');

thumbsLines.forEach(line => {
  const match = line.match(/\/\/ (.*?): (.*)/);
  if (match) {
    const key = match[1];
    const thumbExp = match[2];
    
    // Using RegExp to replace the thumbnail line for the specific block.
    // Ensure we only match the thumbnail property inside the object that has `id: 'key'`
    const blockRegex = new RegExp(`(id: '${key}',[\\s\\S]*?description: .*?,\\s*thumbnail: ).*?(,)`);
    content = content.replace(blockRegex, `$1${thumbExp}$2`);
  }
});

fs.writeFileSync(dataPath, content);
console.log('Data replaced successfully.');
