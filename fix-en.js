const fs = require('fs');
const lines = fs.readFileSync('src/messages/en.json.temp', 'utf8').split('\n');
const fixedLines = [];
let skip = false;

for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    // Fix 1: address casesHero syntax
    if (line.includes('"address  "casesHero": {')) {
        fixedLines.push('    "addressValue": "7F B722 Bldg, 531 Gangnam-daero, Seocho-gu, Seoul",');
        fixedLines.push('    "parking": "Parking available in building",');
        fixedLines.push('    "directions": "Right in front of Nonhyeon Station Exit 4"');
        fixedLines.push('  },');
        fixedLines.push('  "casesHero": {');
        continue;
    }
    
    // Fix 2: Skip broken kr.json block that was pasted into en.json
    if (line.includes('}족스럽습니다."')) {
        fixedLines.push('    }');
        fixedLines.push('  },');
        skip = true;
        continue;
    }
    
    if (skip) {
        if (line.includes('"floatingActionButton": {')) {
            skip = false;
            fixedLines.push(line);
        }
        continue;
    }
    
    fixedLines.push(line);
}

fs.writeFileSync('src/messages/en.json', fixedLines.join('\n'), 'utf8');

try {
    JSON.parse(fs.readFileSync('src/messages/en.json', 'utf8'));
    console.log('en.json fixed and validated perfectly!');
} catch (e) {
    console.error('Still invalid JSON:', e.message);
}
