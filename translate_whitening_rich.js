const fs = require('fs');

const krPath = 'src/messages/kr.json';
const enPath = 'src/messages/en.json';

const krData = JSON.parse(fs.readFileSync(krPath, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Update location with rich tags
krData.whitening.location.title = "식약처 승인, 전문가용\n<desktop>정품 미백 시스템을 사용합니다</desktop><mobile>정품 미백 시스템을\n사용합니다</mobile>";
delete krData.whitening.location.titleMobile;
delete krData.whitening.location.titleDesktop;

enData.whitening.location.title = "We utilize KFDA-approved,\n<desktop>authentic professional whitening systems</desktop><mobile>authentic professional\nwhitening systems</mobile>";
delete enData.whitening.location.titleMobile;
delete enData.whitening.location.titleDesktop;

// Update customer with rich tags
krData.whitening.customer.title = "빛나는 미소,\n집에서도 변함없이<br> 지켜드립니다";
enData.whitening.customer.title = "A radiant smile,\npreserved flawlessly<br> even at home";

// Update director
krData.whitening.director.title = "치아 미백으로\n서울대학교 석사 학위를 받은\n치아 미백 전문가가\n<mobilebr> 직접 시술합니다";
enData.whitening.director.title = "Performed directly by\na whitening expert holding a Master's degree\nfrom Seoul National University<mobilebr> ";

// Update FAQ with rich tags
krData.whitening.faq.items[0].question = "미백 효과는 <br>얼마나 지속되나요?";
krData.whitening.faq.items[1].question = "시술 후 다시 예전처럼 <br>누렇게 되나요?";
krData.whitening.faq.items[2].question = "시술은 <br>몇 번 받아야 하나요?";
krData.whitening.faq.items[3].question = "미백이 효과 없는 <br>경우도 있나요?";
krData.whitening.faq.items[4].question = "시술 중 <br>많이 시리나요?";

enData.whitening.faq.items[0].question = "How long do the <br>whitening effects last?";
enData.whitening.faq.items[1].question = "Will my teeth turn <br>yellow again after treatment?";
enData.whitening.faq.items[2].question = "How many sessions <br>are required?";
enData.whitening.faq.items[3].question = "Are there cases where <br>whitening is ineffective?";
enData.whitening.faq.items[4].question = "Will my teeth be <br>very sensitive during the procedure?";

fs.writeFileSync(krPath, JSON.stringify(krData, null, 2) + '\n', 'utf8');
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2) + '\n', 'utf8');

console.log('Successfully updated kr.json and en.json with rich tags.');
