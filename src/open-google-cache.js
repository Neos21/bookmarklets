/**
 * Open Google Cache
 * 
 * <p>閲覧中のページの Google キャッシュを開く。</p>
 */
((x) => {
  open('http://webcache.googleusercontent.com/search?q=cache:' + location.href, '');
})();
