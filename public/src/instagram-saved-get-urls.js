/**
 * Instagram Saved Get URLs
 * 
 * <p>Instagram の「保存済み」ページで本ブックマークを起動し、全てスクロールしたら Esc キーを押下する。するとクリップボードに投稿 URL がコピーされる。</p>
 */
((doc, linkSet, timer, textarea) => {
  timer = setInterval(() => {
    doc.querySelectorAll('a').forEach((a) => {
      if(a.href.match(/(?!.*liked_by).*(?=\/p\/)/)) {
        linkSet.add('igsv ' + a.href + '\n');
      }
    });
    //console.log(linkSet.size);
  }, 200);
  
  doc.addEventListener('keydown', (event) => {
    if(event.key.includes('Esc')) {
      clearInterval(timer);
      textarea = doc.createElement('textarea');
      textarea.textContent = Array.from(linkSet).join('');
      doc.body.appendChild(textarea);
      textarea.select();
      doc.execCommand('copy');
      doc.body.removeChild(textarea);
      alert(linkSet.size + '件');
    }
  });
})(document, new Set());