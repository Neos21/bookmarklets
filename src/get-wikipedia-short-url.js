/**
 * Get Wikipedia Short URL
 * 
 * <p>Wikipedia のページ ID を取得して短縮 URL を取得する。</p>
 */
((matchResult, id) => {
  [].forEach.call(document.querySelectorAll('script'), (script) => {
    matchResult = script.innerHTML.match((/wgArticleId.*?(\d+)/u));
    id = id ? id : matchResult ? matchResult[1] : '';
  });
  id ? prompt('URL', 'https://ja.wikipedia.org/?curid=' + id) : alert('探索失敗');
})();
