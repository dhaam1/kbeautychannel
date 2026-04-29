const fs = require('fs');
let content = fs.readFileSync('src/constants/procedures.ts', 'utf8');

if (!content.includes('image?: string;')) {
    content = content.replace('effects?: string[];', 'effects?: string[];\n  image?: string;');
}

const categories = [
    { cat: 'thermage', img: '/images/lifting_texture.png' },
    { cat: 'skin-booster', img: '/images/booster_texture.png' },
    { cat: 'petit', img: '/images/petit_texture.png' },
    { cat: 'laser', img: '/images/laser_texture.png' }
];

for (const { cat, img } of categories) {
    const regex = new RegExp(`(slug:\\s*'${cat}'.*?)(?=\\s+slug:\\s*'.*?'|$)`, 's');
    const match = regex.exec(content);
    if (match) {
        let block = match[1];
        block = block.replace(/(icon:\s*'.*?',)/g, `$1\n        image: '${img}',`);
        content = content.substring(0, match.index) + block + content.substring(match.index + match[1].length);
    }
}

fs.writeFileSync('src/constants/procedures.ts', content, 'utf8');
console.log('Done!');
