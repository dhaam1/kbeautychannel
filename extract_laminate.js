const fs = require('fs');
const kr = require('./src/messages/kr.json');

const faq = kr.solution.laminate.faq;
const cta = kr.solution.laminate.ctaSection;

fs.writeFileSync('kr_laminate_export.json', JSON.stringify({ faq, cta }, null, 2), 'utf8');
console.log('Exported to kr_laminate_export.json');
