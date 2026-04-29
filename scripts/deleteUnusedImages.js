const fs = require('fs');
const path = require('path');

const imageDir = path.join(__dirname, '../public/images');
const srcDir = path.join(__dirname, '../src');

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const srcFiles = getAllFiles(srcDir).filter(f => f.endsWith('.ts') || f.endsWith('.tsx') || f.endsWith('.css'));
const allSrcCode = srcFiles.map(f => fs.readFileSync(f, 'utf8')).join('\n');

const images = fs.readdirSync(imageDir).filter(f => f.endsWith('.png') || f.endsWith('.jpg'));

let deletedCount = 0;
for (const file of images) {
  if (!allSrcCode.includes(file)) {
    fs.unlinkSync(path.join(imageDir, file));
    console.log('Deleted unused image:', file);
    deletedCount++;
  }
}
console.log('Total deleted:', deletedCount);
