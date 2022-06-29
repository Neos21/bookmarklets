/**
 * YouTube Auto Click Not Interested
 * 
 * <p>YouTube トップ画面で動画のサムネイル右下に出る「…」アイコンをクリックすると自動的に「興味なし」をクリックする。</p>
 */
(()=>{
  let c = false,
      p = document.querySelector('ytd-popup-container');
  new MutationObserver(_ => {
    if(p.querySelectorAll('ytd-menu-service-item-renderer').length > 1)
      setTimeout(_ =>
        p.querySelector('tp-yt-iron-dropdown[focused]')?.querySelectorAll('yt-formatted-string').forEach(f => {
          if(f.textContent == '興味なし' && !c) {
            c = true;
            setTimeout(_ => {
              if(c) {
                f.parentNode.parentNode.click();
                c = false;
              }
            }, 5)
          }
        })
      , 5)
  }).observe(p, {
    attributes: true,
    subtree: true
  })
})();
