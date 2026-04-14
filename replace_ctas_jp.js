const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/김승연/OneDrive/Desktop/blanche-backend-main/blanche-backend-main/src/components/sections';

function walk(directory) {
  let results = [];
  const list = fs.readdirSync(directory);
  for (let file of list) {
    file = path.join(directory, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  }
  return results;
}

const files = walk(dir).filter(f => (f.includes('CTASection') || f.includes('BlogCTA')) && f.endsWith('.tsx') && !f.includes('WhatsApp') && !f.includes('LineCTASection'));

for (let file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  if (content.includes('WhatsAppCTASection') && !content.includes('<LineCTASection')) {
    // Add import
    content = content.replace("import WhatsAppCTASection", "import LineCTASection from '@/components/sections/line/LineCTASection';\nimport WhatsAppCTASection");

    // Replace desktop CTAForm
    content = content.replace(/\)\s*:\s*\(\s*<CTAForm/g, ") : locale === 'jp' ? (\n          <div className=\"absolute right-[80px] top-1/2 -translate-y-1/2 z-10 w-[460px]\">\n             <LineCTASection />\n          </div>\n        ) : (\n          <CTAForm");

    // Replace mobile CTAFormMobile
    content = content.replace(/\)\s*:\s*\(\s*<CTAFormMobile/g, ") : locale === 'jp' ? (\n           <div className=\"w-full flex justify-center mt-10\">\n               <LineCTASection />\n           </div>\n        ) : (\n          <CTAFormMobile");

    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated JP ' + file);
  }
}
