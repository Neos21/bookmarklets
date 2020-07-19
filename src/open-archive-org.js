/**
 * Open Archive.org
 * 
 * <p>閲覧中のページの Archive.org を開く。</p>
 */
((x) => {
  open('http://web.archive.org/web/*/' + location.href, '');
})();
