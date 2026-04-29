const fs = require('fs');
let content = fs.readFileSync('src/constants/procedures.ts', 'utf8');

const replacements = [
    { title: '써마지FLX', img: '/images/thermage.png' },
    { title: '올리지오X', img: '/images/oligio.png' },
    { title: '소프웨이브', img: '/images/sofwave.png' },
    { title: '울쎄라피 프라임', img: '/images/ulthera.png' },
    { title: '쥬베룩', img: '/images/juvelook.png' },
    { title: '리쥬란 힐러', img: '/images/rejuran.png' },
];

for (const { title, img } of replacements) {
    const regex = new RegExp(`(title:\\s*'${title}'.*?)(image:\\s*'.*?',)`, 's');
    content = content.replace(regex, `$1image: '${img}',`);
}

fs.writeFileSync('src/constants/procedures.ts', content, 'utf8');
console.log('Done!');
