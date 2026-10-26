const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const src = path.join(root, 'src');

function walk(dir, filelist = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fp = path.join(dir, file);
    const stat = fs.statSync(fp);
    if (stat.isDirectory()) walk(fp, filelist);
    else if (/\.(ts|tsx|js|jsx|html)$/.test(file)) filelist.push(fp);
  });
  return filelist;
}

const files = walk(path.join(src));
const hrefs = new Set();
const hrefRegex = /href=\{?\s*["'`]?(\/[^"'`\} >]+)["'`\}]?/g;

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  let m;
  while ((m = hrefRegex.exec(content)) !== null) {
    hrefs.add(m[1]);
  }
}

function existsRoute(p) {
  // normalize path: remove leading slash
  if (p === '/') return true; // home
  const rel = p.replace(/^\/+/, '');
  const segments = rel.split('/').filter(Boolean);
  const appBase = path.join(src, 'app');

  // Candidate checks:
  // 1. src/app/<segments...>/page.tsx
  // 2. src/app/<segments...>.tsx
  // 3. src/app/<first>/[slug]/page.tsx (dynamic)
  // 4. src/app/<first>/[slug]/<rest>/page.tsx if deeper
  // 5. src/app/<first>/page.tsx if only first

  const pageCandidate = path.join(appBase, ...segments, 'page.tsx');
  const pageCandidateJsx = path.join(appBase, ...segments, 'page.jsx');
  const fileCandidate = path.join(appBase, ...segments) + '.tsx';
  const fileCandidateJs = path.join(appBase, ...segments) + '.jsx';

  if (fs.existsSync(pageCandidate) || fs.existsSync(pageCandidateJsx) || fs.existsSync(fileCandidate) || fs.existsSync(fileCandidateJs)) return true;

  // dynamic check
  if (segments.length >= 2) {
    // e.g. /services/mobile -> check src/app/services/[slug]/page.tsx
    const first = segments[0];
    const rest = segments.slice(1).join('/');
    const dyn1 = path.join(appBase, first, '[slug]', 'page.tsx');
    const dyn1jsx = path.join(appBase, first, '[slug]', 'page.jsx');
    if (fs.existsSync(dyn1) || fs.existsSync(dyn1jsx)) return true;
    // also check nested dynamic: src/app/first/[slug]/.../page.tsx
    const dynNested = path.join(appBase, first, '[slug]', ...segments.slice(1), 'page.tsx');
    if (fs.existsSync(dynNested)) return true;
  } else if (segments.length === 1) {
    const first = segments[0];
    // check dynamic at root: src/app/[slug]/page.tsx
    const dynRoot = path.join(appBase, '[slug]', 'page.tsx');
    if (fs.existsSync(dynRoot)) return true;
  }

  return false;
}

const results = [];
for (const h of Array.from(hrefs).sort()) {
  // ignore external and hash/mailto/tel
  if (!h.startsWith('/')) continue;
  if (h.startsWith('/#')) continue;
  if (h.startsWith('/mailto:') || h.startsWith('/tel:')) continue;
  const ok = existsRoute(h);
  results.push({ href: h, ok });
}

const broken = results.filter(r => !r.ok && !r.href.startsWith('/_next'));

console.log('Scanned files:', files.length);
console.log('Found hrefs:', results.length);
console.log('\nBroken internal links:');
if (broken.length === 0) {
  console.log('  None 🎉');
} else {
  for (const b of broken) console.log('  ', b.href);
}

// write report
fs.writeFileSync(path.join(root, 'link-check-report.json'), JSON.stringify({ scannedFiles: files.length, hrefCount: results.length, broken }, null, 2));
console.log('\nReport written to link-check-report.json');
