const fs = require('fs');
const fn = 'src/messages/en.json';
let text = fs.readFileSync(fn, 'utf8');

// Replace <br> and <mobilebr> with \n
text = text.replace(/<br>/g, '\\n');
text = text.replace(/<mobilebr> /g, '\\n');

// Replace <ul><li> with text representations
text = text.replace(/<ul><li>/g, '\\n- ');
text = text.replace(/<\/li><li>/g, '\\n- ');
text = text.replace(/<\/li><\/ul>/g, '');

// The user changed titleMobile/titleDesktop to title with <desktop>/<mobile> tags in Whitening equipment
const titleRegex = /"title": "We utilize KFDA-approved,\\n<desktop>authentic professional whitening systems<\/desktop><mobile>authentic professional\\nwhitening systems<\/mobile>"/g;
text = text.replace(titleRegex, `"titleMobile": "We utilize KFDA-approved,\\nauthentic professional\\nwhitening systems",\n      "titleDesktop": "We utilize KFDA-approved, authentic professional whitening systems"`);

fs.writeFileSync(fn, text, 'utf8');
console.log('en.json UI/ICU crashes fixed!');
