/**
 * Copy Current Page Title And URL
 * 
 * <p>閲覧中のページのタイトルと URL をクリップボードにコピーする。</p>
 */
((doc, textarea) => {
  textarea = doc.createElement('textarea');
  textarea.textContent = doc.title + ' ' + doc.URL;
  doc.body.appendChild(textarea);
  textarea.select();
  doc.execCommand('copy');
  doc.body.removeChild(textarea);
})(document);
