const fs = require('fs');
let content = fs.readFileSync('src/messages/en.json.temp', 'utf8');

// Fix 1: address  "casesHero":
content = content.replace(
    /"directionsLabel": "오시는 방법",\s*"address  "casesHero": \{/g,
    `"directionsLabel": "Directions",
    "addressValue": "7F B722 Bldg, 531 Gangnam-daero, Seocho-gu, Seoul",
    "parking": "Parking available in building",
    "directions": "Right in front of Nonhyeon Station Exit 4"
  },
  "casesHero": {`
);

// Fix 2: 족스럽습니다." to floatingActionButton
// We use a broader regex to catch everything from the end of casesCTA text to the end of casesCTA in kr.json
content = content.replace(
    /"text": "At Blanche,\\nstart your\\ntransformation"\s*\}\s*\}족스럽습니다\."[\s\S]*?"text": "블랑쉬에서,\\n당신의 변화를\\n시작하세요"\s*\}\s*\},/g,
    `"text": "At Blanche,\\nstart your\\ntransformation"
    }
  },`
);

try {
    JSON.parse(content);
    console.log('JSON parse successful after fixes!');
    fs.writeFileSync('src/messages/en.json', content, 'utf8');
} catch (e) {
    console.error('JSON parse failed:', e.message);
    // Write anyway so we can inspect
    fs.writeFileSync('src/messages/en.json.temp2', content, 'utf8');
}
