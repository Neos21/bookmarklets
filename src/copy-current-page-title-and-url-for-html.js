/**
 * Copy Current Page Title And URL For HTML
 * 
 * <p>閲覧中のページのタイトルと URL を HTML リンク形式にしてクリップボードにコピーする。</p>
 */
((doc, textarea) => {
  textarea = doc.createElement('textarea');
  textarea.textContent = `<a href="${doc.URL.replace(/&/gu, '&amp;')}">${doc.title.replace(/(\[|\]|<|>)/gu, ' ').replace(/ +/gu, ' ').trim()}</a>`;
  doc.body.appendChild(textarea);
  textarea.select();
  doc.execCommand('copy');
  doc.body.removeChild(textarea);
})(document);
