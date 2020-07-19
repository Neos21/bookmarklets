/**
 * Instagram Saved Bulk Remove
 * 
 * <p>Instagram の「保存済み」ページで1つ目の投稿を開いたら本ブックマークを起動する。すると「保存」を解除していく。中止する場合はページ更新などで対処する。</p>
 */
((doc, btn, link) => {
  setInterval(() => {
    btn = doc.querySelector('svg[aria-label="削除する"]');
    if(btn) btn.parentNode.click();
    setTimeout(() => {
      link = doc.querySelector('a.coreSpriteRightPaginationArrow');  // 次へ
      // a.coreSpriteLeftPaginationArrow : 前へ
      if(link) link.click();
    }, 250);
  }, 3000);
})(document);