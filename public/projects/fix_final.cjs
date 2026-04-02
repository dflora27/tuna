const fs = require('fs');

// Read full output text generated from earlier sorter.
let output = fs.readFileSync('public/projects/sorter_full_output.txt', 'utf8');

// Replace folder name artifacts
output = output.replace(/a\.d-daire/g, 'ad-daire').replace(/c&e-daire/g, 'ce-daire');

// Extract the galleries object precisely
const galleriesMatch = output.match(/(const galleries = \{[\s\S]*?\n\};)/);
if (!galleriesMatch) {
  console.log("Galleries match failed in sorter_full_output");
  process.exit(1);
}
const galleriesStr = galleriesMatch[1];

// Extract the project array exactly without mutating it
let currentProjectData = fs.readFileSync('src/data/projectsData.js', 'utf8');
const projectsArrayContent = currentProjectData.substring(currentProjectData.indexOf('export const projectsData = ['));

// Re-assemble file safely
const topBase = `// Tüm proje fotoğrafları public/projects/ altında tutulmaktadır.
// Vite glob yerine static URL listesi kullanıyoruz (özel karakter & ve boşluk sorunlarından kaçınmak için).

const BASE = '/projects';

const p = (folder, file) => \`\${BASE}/\${folder}/\${encodeURIComponent(file)}\`;

// ─── Galeri tanımları: { layout, images }
// layout dizisindeki 'full' = tam genişlik, 'pair' = iki görsel yan yana
// images sıralanmış fotoğraf URL'leri (referans sitedeki sıraya göre)
`;

const newFileContent = topBase + "\n" + galleriesStr + "\n\n" + projectsArrayContent;

fs.writeFileSync('src/data/projectsData.js', newFileContent);
console.log("Fix completed successfully.");
