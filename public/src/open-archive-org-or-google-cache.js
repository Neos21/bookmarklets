/**
 * Open Archive.org Or Google Cache
 * 
 * <p>閲覧中のページの Archive.org か Google キャッシュを開く。</p>
 */
((x) => {
  x = confirm('OK：Archive.org\nCancel：GoogleCache') ? 'web.archive.org/web/*/' : 'webcache.googleusercontent.com/search?q=cache:';
  open('http://' + x + location.href, '');
})();
