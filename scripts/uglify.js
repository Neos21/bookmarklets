const fs = require('fs');
const path = require('path');
const uglifyEs = require('uglify-es');

const srcDir = './src';
const distDir = './dist';

if(!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

fs.readdirSync(srcDir).forEach((fileName) => {
  const uglified = uglifyEs.minify({
    file: fs.readFileSync(path.join(srcDir, fileName), 'utf-8')
  }).code;
  
  fs.writeFileSync(path.join(distDir, fileName), uglified, 'utf-8');
});
