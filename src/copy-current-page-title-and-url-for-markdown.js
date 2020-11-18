/**
 * Copy Current Page Title And URL For Markdown
 * 
 * <p>閲覧中のページのタイトルと URL を Markdown リンク形式にしてクリップボードにコピーする。</p>
 */
((doc, textarea) => {
  textarea = doc.createElement('textarea');
  textarea.textContent = `- [${doc.title.replace(/(\[|\])/gu, ' ').replace(/ +/gu, ' ').trim()}](${doc.URL.replace(/&/gu, '&amp;')})`;
  doc.body.appendChild(textarea);
  textarea.select();
  doc.execCommand('copy');
  doc.body.removeChild(textarea);
})(document);
