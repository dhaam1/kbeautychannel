const fs = require('fs');

const krPath = 'src/messages/kr.json';
const enPath = 'src/messages/en.json';

const krData = JSON.parse(fs.readFileSync(krPath, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

function fixSelfClosingTags(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      // Replace <br> with <br></br>
      obj[key] = obj[key].replace(/<br>/g, '<br></br>');
      // Replace <mobilebr> with <mobilebr></mobilebr>
      obj[key] = obj[key].replace(/<mobilebr>/g, '<mobilebr></mobilebr>');
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      fixSelfClosingTags(obj[key]);
    }
  }
}

fixSelfClosingTags(krData.whitening);
fixSelfClosingTags(enData.whitening);

fs.writeFileSync(krPath, JSON.stringify(krData, null, 2) + '\n', 'utf8');
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2) + '\n', 'utf8');

console.log('Fixed ICU tag parsing issues.');
