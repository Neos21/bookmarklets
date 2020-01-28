/**
 * 現在見ているはてなブログの「読者になる」ページを開く
 * 
 * 対象ページがはてなブログ製かどうかはチェックしていない
 */
(() => {
  location.href = 'http://blog.hatena.ne.jp/hatenasupport/' + location.host + '/subscribe';
})();
