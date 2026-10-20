// Static checks: i18n key coverage, KE/SC id references, STR key parity (en/tr).
const fs = require('fs');
const html = fs.readFileSync('kozmik-ag.html', 'utf8');

// 1) data-i18n* keys used in HTML
const used = new Set();
for (const m of html.matchAll(/data-i18n(?:-html|-aria|-ph)?="([^"]+)"/g)) used.add(m[1]);

// 2) STR blocks: grab the en: {...} and tr: {...} object bodies by brace counting
function grab(str, startIdx) {
  const open = str.indexOf('{', startIdx); let d = 0;
  for (let i = open; i < str.length; i++) {
    const c = str[i];
    if (c === "'" || c === '`' || c === '"') { const q = c; i++; while (i < str.length && str[i] !== q) { if (str[i] === '\\') i++; i++; } continue; }
    if (c === '{') d++; else if (c === '}') { d--; if (!d) return str.slice(open, i + 1); }
  }
  throw new Error('unclosed');
}
const script = html.match(/<script type="module">([\s\S]*?)<\/script>/)[1];
const enBody = grab(script, script.indexOf('  en: {'));
const trBody = grab(script, script.indexOf('  tr: {'));
// top-level key scanner: skips strings and nested brackets
function keysOf(body) {
  const keys = new Set(); let i = 1; const n = body.length;
  const skipStr = j => { const q = body[j]; j++; while (j < n && body[j] !== q) { if (body[j] === '\\') j++; j++; } return j + 1; };
  while (i < n) {
    const c = body[i];
    if (c === "'" || c === '"' || c === '`') { i = skipStr(i); continue; }
    if (c === '{' || c === '[') {
      let d = 0, j = i;
      while (j < n) { const cc = body[j];
        if (cc === "'" || cc === '"' || cc === '`') { j = skipStr(j); continue; }
        if (cc === '{' || cc === '[') d++; else if (cc === '}' || cc === ']') { d--; if (!d) break; } j++; }
      i = j + 1; continue;
    }
    if (/[A-Za-z_]/.test(c)) {
      let j = i; while (j < n && /[A-Za-z0-9_]/.test(body[j])) j++;
      let k = j; while (k < n && body[k] === ' ') k++;
      if (body[k] === ':') keys.add(body.slice(i, j));
      i = j; continue;
    }
    i++;
  }
  return keys;
}
const enK = keysOf(enBody), trK = keysOf(trBody);
const missEn = [...used].filter(k => !enK.has(k)), missTr = [...used].filter(k => !trK.has(k));
const enOnly = [...enK].filter(k => !trK.has(k)), trOnly = [...trK].filter(k => !enK.has(k));
console.log('i18n: used', used.size, '| en keys', enK.size, '| tr keys', trK.size);
console.log('  missing in EN:', missEn.length ? missEn : '—');
console.log('  missing in TR:', missTr.length ? missTr : '—');
console.log('  EN-only keys:', enOnly.length ? enOnly : '—', '| TR-only keys:', trOnly.length ? trOnly : '—');

// 3) defined ids: L array tuples + L.push + def( 'sgw'/'spw' generated ids
const ids = new Set();
for (const m of script.matchAll(/\['([a-z0-9]+)',\s*\{/g)) ids.add(m[1]);
for (const m of script.matchAll(/L\.push\(\['([a-z0-9]+)',\s*\{/g)) ids.add(m[1]);
for (let i = 0; i < 8; i++) ids.add('sgw' + i);
for (let i = 0; i < 7; i++) ids.add('spw' + i);
// KE endpoints
const kePairs = [...script.matchAll(/\[\s*'([a-z0-9]+)'\s*,\s*'([a-z0-9]+)'\s*(?:,\s*[\d.]+)?\s*\]/g)]
  .filter(m => script.slice(Math.max(0, m.index - 12), m.index).match(/KE\.push\(|,$/));
const badKE = [];
for (const m of script.matchAll(/KE\.push\(\['([a-z0-9]+)',\s*'([a-z0-9]+)'/g)) {
  if (!ids.has(m[1]) || !ids.has(m[2])) badKE.push(m[1] + ' -> ' + m[2]);
}
// base KE array rows
const keBlock = script.slice(script.indexOf('const KE = ['), script.indexOf('];', script.indexOf('const KE = [')));
for (const m of keBlock.matchAll(/\['([a-z0-9]+)',\s*'([a-z0-9]+)'/g)) {
  if (!ids.has(m[1]) || !ids.has(m[2])) badKE.push(m[1] + ' -> ' + m[2]);
}
console.log('ids defined:', ids.size, '| bad KE endpoints:', badKE.length ? badKE : '—');
// SC 'of' members
const badSC = [];
for (const m of script.matchAll(/SC\.push\(\{n:'[^']+', of:\[([^\]]+)\]/g)) {
  for (const id of m[1].match(/'([a-z0-9]+)'/g).map(s => s.slice(1, -1))) if (!ids.has(id)) badSC.push(id);
}
const scBlock = script.slice(script.indexOf('const SC = ['), script.indexOf('];', script.indexOf('const SC = [')));
for (const m of scBlock.matchAll(/of:\[([^\]]+)\]/g)) {
  for (const id of m[1].match(/'([a-z0-9]+)'/g).map(s => s.slice(1, -1))) if (!ids.has(id)) badSC.push(id);
}
console.log('bad SC member ids:', badSC.length ? badSC : '—');
