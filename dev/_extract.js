const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const m = html.match(/<script type="module">([\s\S]*?)<\/script>/);
if (!m) { console.error('module script not found'); process.exit(1); }
fs.writeFileSync('dev/_check.mjs', m[1]);
console.log('extracted', m[1].length, 'chars');
