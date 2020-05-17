/** ./src/・./dist/ ディレクトリ配下のファイルを利用し、./scripts/build-index.html をベースに HTML を構築して ./index.html を生成する */

const fs = require('fs');
const path = require('path');

// Table Of Contents 部分の HTML を蓄える配列
const tableOfContents = ['<ul>'];

// src/ ディレクトリ内のファイルを読み込み HTML を生成していく
const contents = fs.readdirSync(path.resolve(__dirname, '../src/')).map((fileName) => {
  const id = fileName.replace((/\.js$/u), '');  // 拡張子を除去して ID に使用する
  
  const srcFile = fs.readFileSync(path.join(__dirname, '../src/', fileName), 'utf-8');  // JS ファイルを読み込む
  const comments = srcFile.split('\n')
    .filter((line) => { return line.startsWith(' * ') && line !== ' * '; })  // テキストがあるコメント行のみ取得する
    .map((line) => { return line.slice(3).replace((/^</u), '  <'); });  // コメントの記号とスペース部分を除去し、先頭に HTML 開始タグがあればインデントを入れておく
  
  const title = comments.shift();  // 最初の要素 = 1行目がタイトルなのでそれを取得・コメント行からは除去しておく
  
  // Table Of Contents 部分の HTML を生成する
  tableOfContents.push(`  <li><a href="#${id}">${title}</a></li>`);
  
  // ブックマークレット読み込み用のブックマークレットを出力しないオプション指定があるか調べる
  const optionIndexDisablePrintDistScript = comments.findIndex((line) => { return line === '{{disable-print-dist-script}}'; });
  const isDisablePrintDistScript = optionIndexDisablePrintDistScript !== -1;
  if(isDisablePrintDistScript) {
    comments.splice(optionIndexDisablePrintDistScript);  // オプション行をコメントから除去しておく
  }
  
  // Contents 部分の HTML を生成する
  const content = [`<section id="${id}">`, `  <h2><a href="./dist/${fileName}">${title}</a> (<a href="./src/${fileName}">${fileName}</a>)</h2>`];
  if(!isDisablePrintDistScript) {
    const distFile = fs.readFileSync(path.join(__dirname, '../dist/', fileName), 'utf-8');
    content.push(`  <pre>javascript:${distFile.replace((/</gu), '&lt;').replace((/>/gu), '&gt;').replace(/"/gu, '&quot;')}</pre>`);
  }
  content.push(...comments);
  if(!isDisablePrintDistScript) {
    content.push(`  <pre>javascript:((d,s)=&gt;{s=d.createElement('script');s.src='https://neos21.github.io/bookmarklets/dist/${fileName}';d.body.appendChild(s)})(document);</pre>`);
  }
  content.push('</section>');
  return content.join('\n');
});

// Table Of Contents の終了タグを入れておく
tableOfContents.push('</ul>');

// ベースとなる HTML を読み込む
const srcIndexHtml = fs.readFileSync(path.resolve(__dirname, './build-index.html'), { encoding: 'utf-8'});

// 置換文字列部分を置換し HTML を組み立てる
const distIndexHtml = srcIndexHtml
  .replace('{{table-of-contents}}', tableOfContents.join('\n'))
  .replace('{{contents}}', contents.join('\n'));

// index.html を出力する
fs.writeFileSync(path.resolve(__dirname, '../index.html'), distIndexHtml, { encoding: 'utf-8' });
