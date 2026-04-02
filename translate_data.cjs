const fs = require('fs');

let data = fs.readFileSync('src/data/projectsData.js', 'utf8');

const dict = {
  'Konut': 'Residential',
  'Villa': 'Villa',
  'Ticari': 'Commercial',
  'Daire': 'Apartment',
  'Rezidans': 'Residence',
  'Müstakil Villa': 'Detached Villa',
  'İkiz Villa': 'Semi-Detached Villa',
  'Yalı Dairesi': 'Seaside Mansion',
  'Ofis': 'Office',
  'Otel': 'Hotel',
  'Malikane': 'Mansion',
  'İstanbul': 'Istanbul',
  'İzmir': 'Izmir',
  'Urla': 'Urla',
  'Çeşme': 'Cesme',
  'Beykoz': 'Beykoz',
  'Bağdat Caddesi': 'Bagdat Avenue',
  'Mavişehir': 'Mavisehir'
};

function translateStr(str) {
  if(!str) return str;
  let translated = str;
  for(const [tr, en] of Object.entries(dict)) {
    translated = translated.replace(new RegExp(tr, 'g'), en);
  }
  return translated;
}

const blocks = data.match(/\{\s*id:\s*'[^']+',[\s\S]*?gallery:\s*galleries\[[^\]]+\]\s*,?\s*\}/g);
if(blocks) {
  blocks.forEach(block => {
    const tCatMatch = block.match(/category:\s*'([^']+)'/);
    const tTypeMatch = block.match(/type:\s*'([^']+)'/);
    const tLocMatch = block.match(/location:\s*'([^']+)'/);
    const tDescMatch = block.match(/description:\s*'([^']+)'/);
    
    let newBlock = block;
    if(tCatMatch && !newBlock.includes('category_en')) {
      newBlock = newBlock.replace(tCatMatch[0], tCatMatch[0] + ',\n    category_en: "' + translateStr(tCatMatch[1]) + '"');
    }
    if(tTypeMatch && !newBlock.includes('type_en')) {
      newBlock = newBlock.replace(tTypeMatch[0], tTypeMatch[0] + ',\n    type_en: "' + translateStr(tTypeMatch[1]) + '"');
    }
    if(tLocMatch && !newBlock.includes('location_en')) {
      newBlock = newBlock.replace(tLocMatch[0], tLocMatch[0] + ',\n    location_en: "' + translateStr(tLocMatch[1]) + '"');
    }
    if(tDescMatch && !newBlock.includes('description_en')) {
      let descEn = translateStr(tDescMatch[1]);
      if(descEn.includes('bir daire')) descEn = 'A cozy apartment';
      if(descEn.includes('özelleştirilmiş')) descEn = 'Customized living space';
      if(descEn.includes('iş ortamı') || descEn.includes('ofis')) descEn = 'Modern working environment';
      if(descEn.includes('otel')) descEn = 'Boutique hotel project';
      if(descEn.includes('malikane') || descEn.includes('villa')) descEn = 'Luxury detached villa project';
      if(descEn.includes('rezidans') || descEn.includes('Rezidans')) descEn = 'Luxury residence project';
      
      newBlock = newBlock.replace(tDescMatch[0], tDescMatch[0] + ',\n    description_en: "' + descEn + '"');
    }
    
    data = data.replace(block, newBlock);
  });

  fs.writeFileSync('src/data/projectsData.js', data);
  console.log('Translations inserted successfully!');
} else {
  console.log('No blocks matched!');
}
