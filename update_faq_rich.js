const fs = require('fs');

const krPath = 'src/messages/kr.json';
const enPath = 'src/messages/en.json';

const krData = JSON.parse(fs.readFileSync(krPath, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

krData.whitening.faq.items[3].answer = "아래의 경우에는 일반 미백 대신 다른 치료가 필요할 수 있습니다.<ul><li>법랑질이 너무 얇은 경우</li><li>신경치료를 받은 치아</li><li>레진이나 보철물이 있는 치아</li></ul>블랑쉬치과에서는 시술 전 정밀 진단을 통해 미백이 적합한지 먼저 확인해드립니다.";
enData.whitening.faq.items[3].answer = "In the following cases, alternative treatments may be necessary instead of conventional whitening:<ul><li>Extremely thin enamel</li><li>Teeth that have undergone root canal therapy</li><li>Teeth with resin restorations or prosthetics</li></ul>At Blanche, we conduct a thorough precision diagnosis prior to any procedure to determine if whitening is the optimal solution for you.";

krData.whitening.cta.title = "자신 있게 웃는 하루,<br>블랑쉬치과에서 시작하세요";
enData.whitening.cta.title = "A day filled with confident smiles,<br>start it today at Blanche";

// Add br tags to cta design elements 
krData.whitening.cta.designElements.box = "미소가<br>작품이<br>되는곳";
krData.whitening.cta.designElements.text = "블랑쉬에서,<br>당신의 변화를<br>시작하세요";
enData.whitening.cta.designElements.box = "We craft<br>smiles<br>like art";
enData.whitening.cta.designElements.text = "At Blanche,<br>start your<br>transformation";

fs.writeFileSync(krPath, JSON.stringify(krData, null, 2) + '\n', 'utf8');
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2) + '\n', 'utf8');

console.log('FAQ and CTA rich tags updated.');
