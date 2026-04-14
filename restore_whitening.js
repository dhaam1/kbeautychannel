const fs = require('fs');
const fn = 'src/messages/en.json';
let text = fs.readFileSync(fn, 'utf8');

const regex = /"titleMobile"\s*:\s*"We utilize KFDA-approved,\\nauthentic professional\\nwhitening systems",\s*"titleDesktop"\s*:\s*"We utilize KFDA-approved, authentic professional whitening systems"/g;

let matches = text.match(regex);
if (matches) {
    text = text.replace(regex, `"title": "We utilize KFDA-approved,\\n<desktop>authentic professional whitening systems</desktop><mobile>authentic professional\\nwhitening systems</mobile>"`);
    fs.writeFileSync(fn, text, 'utf8');
    console.log('Restored title key for whitening location!');
} else {
    console.log('Regex did not match. Looking manually...');
    // In case the spacing is slightly different
    text = text.replace(/"titleMobile"[\s\S]*?"titleDesktop"[\s\S]*?"[^"]*"/g, `"title": "We utilize KFDA-approved,\\n<desktop>authentic professional whitening systems</desktop><mobile>authentic professional\\nwhitening systems</mobile>"`);
    fs.writeFileSync(fn, text, 'utf8');
}
