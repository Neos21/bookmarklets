/**
 * Open Hatena Blog Subscribe Page
 * 
 * <p>現在見ているはてなブログの「読者になる」ページを開く。対象ページがはてなブログ製かどうかはチェックしていない。</p>
 */
((l) => {
  l.href = 'http://blog.hatena.ne.jp/hatenasupport/' + l.host + '/subscribe';
})(location);
