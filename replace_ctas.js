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

// Find all CTASection files and BlogCTA.tsx
const files = walk(dir).filter(f => (f.includes('CTASection') || f.includes('BlogCTA')) && f.endsWith('.tsx') && !f.includes('WhatsApp'));

for (let file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  if (content.includes('WhatsAppCTASection')) {
    continue; // already modified
  }
  if (!content.includes('<CTAForm') && !content.includes('<CTAFormMobile')) {
    continue;
  }

  // 1. Add imports
  if (content.includes("from 'next-intl'")) {
    if (!content.includes('useLocale')) {
      content = content.replace(/import\s+{([^}]*)}\s+from\s+'next-intl';/g, "import { $1, useLocale } from 'next-intl';");
    }
  } else {
    content = "import { useLocale } from 'next-intl';\n" + content;
  }
  
  // Insert WhatsApp import after the first line (usually 'use client';)
  if (content.startsWith("'use client';")) {
    content = content.replace("'use client';", "'use client';\nimport WhatsAppCTASection from '@/components/sections/whatsapp/WhatsAppCTASection';");
  } else {
    content = "import WhatsAppCTASection from '@/components/sections/whatsapp/WhatsAppCTASection';\n" + content;
  }

  // 2. Insert const locale = useLocale();
  if (!content.includes('const locale = useLocale()')) {
    content = content.replace(/(export (default )?function [^{]+\{)/, "$1\n  const locale = useLocale();");
  }

  // 3. Replace <CTAForm ... />
  // We use a non-greedy match that supports newlines: /<CTAForm[\s\S]*?\/>/
  const ctaRegex = /(<CTAForm[\s\S]*?\/>)/;
  if (ctaRegex.test(content)) {
    content = content.replace(ctaRegex, `{locale === 'en' ? (
          <div className="absolute right-[80px] top-1/2 -translate-y-1/2 z-10 w-[460px]">
             <WhatsAppCTASection />
          </div>
        ) : (
          $1
        )}`);
  }

  // 4. Replace <CTAFormMobile ... />
  const ctaMobRegex = /(<CTAFormMobile[\s\S]*?\/>)/;
  if (ctaMobRegex.test(content)) {
    content = content.replace(ctaMobRegex, `{locale === 'en' ? (
           <div className="w-full flex justify-center mt-10">
               <WhatsAppCTASection />
           </div>
        ) : (
          $1
        )}`);
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log('Updated ' + file);
}
