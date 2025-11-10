const fs = require('fs');
const path = require('path');

const pathsFile = '/tmp/all-paths.txt';
const paths = fs.readFileSync(pathsFile, 'utf8').trim().split('\n');

paths.forEach(p => {
  const fullPath = path.join(__dirname, p);
  const dir = path.dirname(fullPath);
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  if (!fs.existsSync(fullPath)) {
    if (p.endsWith('.css')) {
      fs.writeFileSync(fullPath, '/* Stub */\n');
    } else {
      fs.writeFileSync(fullPath, 'export default function Component() { return null; }\n');
    }
  }
});

console.log('Created', paths.length, 'stub files');
