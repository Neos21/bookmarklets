/** ../public/src/ ディレクトリ配下の JS ファイルを難読化し ../public/dist/ ディレクトリに出力する */

const fs = require('fs');
const path = require('path');
const uglifyEs = require('uglify-es');

const srcDir  = path.resolve(__dirname, '../public/src');
const distDir = path.resolve(__dirname, '../public/dist');

/**
 * JS ファイル1つをビルドする
 * 
 * @param {string} fileName ファイル名
 */
function buildFile(fileName) {
  const uglified = uglifyEs.minify({
    file: fs.readFileSync(path.join(srcDir, fileName), 'utf-8')
  }).code;
  fs.writeFileSync(path.join(distDir, fileName), uglified, 'utf-8');
}

if(!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

if(process.argv.length > 2) {
  let fileName = process.argv[2];  // 0・1 は確定・2 が第1引数となる
  if(!fileName.endsWith('.js')) {
    fileName += '.js';
  }
  if(!fs.existsSync(path.join(srcDir, fileName))) {
    console.error(`The File [${fileName}] Does Not Exist. Aborted`);
    return;
  }
  console.log(`Build The File [${fileName}]`);
  buildFile(fileName);
}
else {
  console.log('Build All Files');  // 通常は全ファイルをビルドする
  fs.readdirSync(srcDir).forEach((fileName) => {
    buildFile(fileName);
  });
}
