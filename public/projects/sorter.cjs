const fs = require('fs');
const path = require('path');

const basePath = 'c:\\Users\\yanik\\Music\\tuna\\public\\projects';

const projectMap = {
  'sahin-balikcilik': 'sahin-balikcilik',
  'ds-yali-dairesi': 'd&s-yali-dairesi',
  'sa-villa': 's&a-villa',
  'zo-malikane': 'z&o-malikane',
  'bf-villa': 'b&f-villa',
  'fm-yali-dairesi': 'f&m-yali-dairesi',
  'eb-villa': 'e&b-villa',
  'spor-kulubu': 'spor-kulubu-ofis',
  'mi-villa': 'm&i-villa',
  'sb-villa': 's&b-villa',
  'ev-villa': 'e&v-villa',
  'kk-villa': 'k&k-villa',
  'sigacik-otel': 'sigacik-otel',
  'bomonti-ofis': 'bomonti-ofis',
  'sm-villa': 's&m-villa',
  'ad-daire': 'a.d-daire',
  'na-daire': 'n&a-daire',
  'beykoz-villa': 'beykoz-villa',
  'ce-daire': 'c&e-daire'
};

let galleriesOutput = 'const galleries = {\n';
let thumbnailsMap = {};

for (const [key, folder] of Object.entries(projectMap)) {
  const pPath = path.join(basePath, folder);
  if (!fs.existsSync(pPath)) continue;
  
  const files = fs.readdirSync(pPath);
  
  // Find grid and kapak (any extension .jpg, .png, etc.)
  const grid = files.find(f => f.startsWith('grid.'));
  const kapak = files.find(f => f.startsWith('kapak.'));
  
  // Find yatays and dikeys
  const yatays = files.filter(f => f.startsWith('yatay-')).sort((a,b) => parseInt(a.replace('yatay-','')) - parseInt(b.replace('yatay-','')));
  const dikeys = files.filter(f => f.startsWith('dikey-'));
  
  // Group dikeys by letter
  const dikeyGroups = {};
  dikeys.forEach(f => {
    // wait dikey-a1.png -> f.charAt(6) is 'a'
    const letter = f.charAt(6); 
    if (!dikeyGroups[letter]) dikeyGroups[letter] = [];
    dikeyGroups[letter].push(f);
  });
  
  // Sort each group
  Object.keys(dikeyGroups).forEach(k => dikeyGroups[k].sort());
  const dikeyLetters = Object.keys(dikeyGroups).sort();
  let currentDikeyIndex = 0;
  
  let orderedImages = kapak ? [kapak] : [];
  
  let currentYatayIdx = 0;
  let i = 1;

  // Maximum safe loop to prevent infinite just in case
  let escapeCount = 0;
  while (escapeCount < 100 && (currentYatayIdx < yatays.length || currentDikeyIndex < dikeyLetters.length)) {
    escapeCount++;
    const expectedPrefix = `yatay-${i}.`;
    const foundYatay = yatays.find(y => y.startsWith(expectedPrefix));
    
    if (foundYatay) {
      orderedImages.push(foundYatay);
      currentYatayIdx++;
    } else {
      // It's missing! So insert the next dikey group
      if (currentDikeyIndex < dikeyLetters.length) {
        const letter = dikeyLetters[currentDikeyIndex];
        orderedImages.push(...dikeyGroups[letter]);
        currentDikeyIndex++;
      }
    }
    i++;
  }
  
  galleriesOutput += `\n  '${key}': {\n    images: [\n`;
  orderedImages.forEach(img => {
    if(img) galleriesOutput += `      p('${folder}', '${img}'),\n`;
  });
  galleriesOutput += `    ],\n  },\n`;
  
  thumbnailsMap[key] = grid ? `p('${folder}', '${grid}')` : `galleries['${key}'].images[0]`;
}

galleriesOutput += '};\n\n// THUMBNAILS:\n';
for (const [key, thumbStr] of Object.entries(thumbnailsMap)) {
  galleriesOutput += `// ${key}: ${thumbStr}\n`;
}

fs.writeFileSync('c:\\Users\\yanik\\Music\\tuna\\public\\projects\\sorter_full_output.txt', galleriesOutput);
console.log('Full generation done.');
