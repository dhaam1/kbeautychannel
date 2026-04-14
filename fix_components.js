const fs = require('fs');

// 1. ImplantEquipmentSection.tsx
let eq = fs.readFileSync('src/components/sections/implant/ImplantEquipmentSection.tsx', 'utf8');
eq = eq.replace(
  "import { useTranslations } from 'next-intl';", 
  "import { useTranslations, useLocale } from 'next-intl';"
);
eq = eq.replace(
  "export function ImplantEquipmentSection() {", 
  "export function ImplantEquipmentSection() {\n  const locale = useLocale();\n  const isEn = locale === 'en';"
);
eq = eq.replace(
  "nameKo: item.nameKo,", 
  "nameKo: isEn ? item.nameEn : item.nameKo,"
);
fs.writeFileSync('src/components/sections/implant/ImplantEquipmentSection.tsx', eq, 'utf8');

// 2. ImplantTabSection.tsx
let tab = fs.readFileSync('src/components/sections/implant/ImplantTabSection.tsx', 'utf8');
tab = tab.replace(
  "const isJp = locale === 'jp';", 
  "const isJp = locale === 'jp';\n    const isEn = locale === 'en';"
);
tab = tab.replace(
  "{isJp ? '施術期間' : '시술 기간'}", 
  "{isJp ? '施術期間' : isEn ? 'Procedure Duration' : '시술 기간'}"
);
tab = tab.replace(
  "{isJp ? 'ブランシュ歯科の\\n技術力' : '블랑쉬치과의\\n기술력'}", 
  "{isJp ? 'ブランシュ歯科の\\n技術力' : isEn ? 'Blanche\\'s\\nMastery' : '블랑쉬치과의\\n기술력'}"
);
fs.writeFileSync('src/components/sections/implant/ImplantTabSection.tsx', tab, 'utf8');

// 3. ImplantKbsVideoSection.tsx
let kbs = fs.readFileSync('src/components/sections/implant/ImplantKbsVideoSection.tsx', 'utf8');
kbs = kbs.replace(
  "import { buildVimeoUrl } from '@/lib/vimeoUtils';",
  "import { buildVimeoUrl } from '@/lib/vimeoUtils';\nimport { useLocale } from 'next-intl';"
);
kbs = kbs.replace(
  "export function ImplantKbsVideoSection() {",
  "export function ImplantKbsVideoSection() {\n  const locale = useLocale();\n  const isEn = locale === 'en';\n  const isJp = locale === 'jp';"
);

// Mobile title
kbs = kbs.replace(
  "생로병사의 비밀\n          </p>",
  "{isEn ? 'KBS Documentary' : isJp ? 'KBSドキュメンタリー' : '생로병사의 비밀'}\n          </p>"
);

// Desktop title
kbs = kbs.replace(
  "생로병사의 비밀\n              </p>",
  "{isEn ? 'KBS Documentary' : isJp ? 'KBSドキュメンタリー' : '생로병사의 비밀'}\n              </p>"
);

// Mobile description
kbs = kbs.replace(
  "KBS &lt;생로병사의 비밀&gt;\n            <br />\n            &lsquo;100세 시대, 구강 건강의 모든 것&rsquo;편에\n            <br />\n            김태형 대표원장님이 함께하셨습니다.",
  "{isEn ? <><span style={{fontWeight: 700}}>Chief Director Kim Tae-hyung</span><br />featured on KBS Documentary<br />&lsquo;Secrets of Life and Death&rsquo;</> : isJp ? <>KBS ドキュメンタリー<br />「生老病死の秘密」に<br />キム・テヒョン代表院長が出演しました。</> : <>KBS &lt;생로병사의 비밀&gt;<br />&lsquo;100세 시대, 구강 건강의 모든 것&rsquo;편에<br />김태형 대표원장님이 함께하셨습니다.</>}"
);

// Desktop description
kbs = kbs.replace(
  "KBS &lt;생로병사의 비밀&gt;\n                <br />\n                &lsquo;100세 시대, 구강 건강의 모든 것&rsquo;편에\n                <br />\n                김태형 대표원장님이 함께하셨습니다.",
  "{isEn ? <><span style={{fontWeight: 700}}>Chief Director Kim Tae-hyung</span><br />featured on KBS Documentary<br />&lsquo;Secrets of Life and Death&rsquo;</> : isJp ? <>KBS ドキュメンタリー<br />「生老病死の秘密」に<br />キム・テヒョン代表院長が出演しました。</> : <>KBS &lt;생로병사의 비밀&gt;<br />&lsquo;100세 시대, 구강 건강의 모든 것&rsquo;편에<br />김태형 대표원장님이 함께하셨습니다.</>}"
);

fs.writeFileSync('src/components/sections/implant/ImplantKbsVideoSection.tsx', kbs, 'utf8');

console.log('Fixed all components!');
