const fs = require('fs');

const krPath = 'src/messages/kr.json';
const enPath = 'src/messages/en.json';

const krData = JSON.parse(fs.readFileSync(krPath, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Delete the broken title
delete krData.whitening.location.title;
delete enData.whitening.location.title;

// Re-add titleDesktop and titleMobile
krData.whitening.location.titleDesktop = "식약처 승인, 전문가용\n정품 미백 시스템을 사용합니다";
krData.whitening.location.titleMobile = "식약처 승인, 전문가용\n정품 미백 시스템을\n사용합니다";

enData.whitening.location.titleDesktop = "We utilize KFDA-approved,\nauthentic professional whitening systems";
enData.whitening.location.titleMobile = "We utilize KFDA-approved,\nauthentic professional\nwhitening systems";

fs.writeFileSync(krPath, JSON.stringify(krData, null, 2) + '\n', 'utf8');
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2) + '\n', 'utf8');

console.log('Split location.title into titleDesktop and titleMobile.');
