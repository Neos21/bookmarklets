const fs = require('fs');
const path = require('path');
const uglifyEs = require('uglify-es');

const srcDir = './src';
const destDir = './';

fs.readdirSync(srcDir).forEach((fileName) => {
  const uglified = uglifyEs.minify({
    file: fs.readFileSync(path.join(srcDir, fileName), 'utf-8')
  }).code;
  
  fs.writeFileSync(path.join(destDir, fileName), uglified, 'utf-8');
});
