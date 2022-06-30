/**
 * YouTube Auto Click Not Interested Or Don't Recommend Channel
 * 
 * <p>YouTube トップ画面で動画のサムネイル右下に出る「…」アイコンをクリックすると自動的に「興味なし」か「チャンネルをおすすめに表示しない」をクリックする。</p>
 * <p>画面右上に登場するチェックボックスを付けると「チャンネルをおすすめに表示しない」を選択するようになる。</p>
 */
((d, q, c, p) => {
  p = d[q]('ytd-popup-container');
  d.body.insertAdjacentHTML('beforeend', '<input type=checkbox id=x style=position:absolute;top:0;right:0;z-index:9999>');
  new MutationObserver(_ => {
    p[q + 'All']('ytd-menu-service-item-renderer').length > 1 && setTimeout(_ =>
      p[q]('tp-yt-iron-dropdown[focused]')?.[q + 'All']('yt-formatted-string').forEach(f =>
        f.textContent != (d[q]('#x').checked ? 'チャンネルをおすすめに表示しない' : '興味なし') || c || (
          c = true,
          setTimeout(_ =>
            c && (f.parentNode.parentNode.click(), c = false)
          , 5)
        )
      )
    , 5)
  }).observe(p, {
    attributes: true,
    subtree: true
  })
})(document, 'querySelector', false);
