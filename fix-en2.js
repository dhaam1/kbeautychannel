const fs = require('fs');

let content = fs.readFileSync('src/messages/en.json.temp', 'utf8');

// Fix 1
content = content.replace(/"directionsLabel": "오시는 방법",\s*"address  "casesHero": \{/g,
`"directionsLabel": "Directions",
    "addressValue": "7F B722 Bldg, 531 Gangnam-daero, Seocho-gu, Seoul",
    "parking": "Parking available in building",
    "directions": "Right in front of Nonhyeon Station Exit 4"
  },
  "casesHero": {`);

// Fix 2: Find "casesCTA": { and everything up to "floatingActionButton": {
const ctaRegex = /"casesCTA":\s*\{[\s\S]*?"floatingActionButton":\s*\{/;
content = content.replace(ctaRegex, 
`"casesCTA": {
    "category": "Book Consultation",
    "title": "A smile that lasts a lifetime,\\nBlanche will create it for you",
    "description": "The choice to protect your teeth,\\nfor that choice, we deeply analyze your dental condition\\nand explain it transparently.\\n\\nFor dental concerns, consult with Blanche.",
    "designElements": {
      "box": "Where\\na smile\\nbecomes a masterpiece",
      "text": "At Blanche,\\nstart your\\ntransformation"
    }
  },
  "floatingActionButton": {`);

fs.writeFileSync('src/messages/en.json', content, 'utf8');

try {
    JSON.parse(content);
    console.log('JSON parsed perfectly!');
} catch (e) {
    console.error('JSON parse error:', e.message);
}
