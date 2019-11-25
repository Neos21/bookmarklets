/**
 * 範囲選択ブックマークレット (タッチデバイス用)
 * 
 * タップとドラッグで選択した範囲にある要素をクリックする。チェックボックスなどを一括チェックする時に。
 * 以下のようなブックマークレットで読み込んで使う。
 * 
 * ```javascript
 * javascript:((d,s)=>{s=d.createElement('script');s.src='https://neos21.github.io/bookmarklets/dist/select-range-touch.js';d.body.appendChild(s)})(document);
 * ```
 * 
 * TODO : 2本指になったらこれらのイベントを切ったり戻したりしたい
 */
((win, doc, addEvent, getRect, sty, px, isTouching, isDragging, defaultStyle, createElement, rangeElem, pointElem, beginX, beginY, beginScrollX, beginScrollY, endX, endY) => {
  // 要素を生成して返す関数を作る
  createElement = (elem) => {
    elem = doc.createElement('i');
    doc.body.appendChild(elem);
    return elem;
  };
  
  // 選択範囲を示す要素
  rangeElem = createElement();
  // ポインタ要素
  pointElem = createElement();
  
  // タッチ開始時
  doc[addEvent]('touchstart', (event) => {
    // タッチ中
    isTouching = true;
    // 選択範囲を消すため初期値を再指定する
    rangeElem[sty].cssText = defaultStyle + 'border:1px solid rgba(0,0,255,.2);background:rgba(99,255,255,.2)';
    pointElem[sty].cssText = defaultStyle;
    // 選択開始位置を控えておく
    beginX = event.touches[0].pageX;
    beginY = event.touches[0].pageY;
    // 選択開始時のスクロール位置を控えておく
    beginScrollX = win.scrollX;
    beginScrollY = win.scrollY;
  });
  
  // タッチ移動中
  doc[addEvent]('touchmove', (event, x, y) => {
    // タッチ中の移動なら処理する TODO : この判定要らないかも
    if(isTouching) {
      // ドラッグ中
      isDragging = true;
      // touchend では値が取得できなくなるので常に終了位置となりうる値を控えておく
      endX = event.touches[0].pageX;
      endY = event.touches[0].pageY;
      // 始点より左に移動する場合を考慮して left を制御する
      x = endX - beginX;
      rangeElem[sty].left = (x < 0 ? beginX + x : beginX) + px;
      // 始点より上に移動する場合を考慮して top を制御する
      y = endY - beginY;
      rangeElem[sty].top = (y < 0 ? beginY + y : beginY) + px;
      // 始点と現在の位置の差を絶対値にして幅・高さとして設定する
      rangeElem[sty].width  = Math.abs(x) + px;
      rangeElem[sty].height = Math.abs(y) + px;
    }
  });
  
  // タッチ終了時
  doc[addEvent]('touchend', (event, clickedElems, x, y, position, elem) => {
    // マウスボタンを離した
    isTouching = false;
    // ドラッグ中なら処理する
    if(isDragging) {
      // ドラッグ終了
      isDragging = false;
      // クリックした要素を入れておく配列
      clickedElems = [];
      // 左上から 9px ずつズラす (圧縮時に1桁の数値で済ませたいので…)
      // elementFrompoint はスクロールして画面上に要素が見えていないと null になってしまうので、スクロールして対象要素が画面内に表示されている状態にしている
      for(  y = Math.min(beginY, endY); y < Math.max(beginY, endY); y += 9) {
        // 開始位置にスクロールし直す
        win.scrollTo(beginScrollX, beginScrollY);
        for(x = Math.min(beginX, endX); x < Math.max(beginX, endX); x += 9) {
          pointElem[sty].top  = y + px;
          pointElem[sty].left = x + px;
          // 絶対配置したポインタ要素の位置にスクロールする
          position = pointElem[getRect]();
          win.scrollTo(position.left, position.top);
          // ポインタ要素の座標を再度拾い、その位置にある要素を取得する
          position = pointElem[getRect]();
          elem = doc.elementFromPoint(position.left, position.top);
          // クリック済の要素は無視してクリックする
          if(elem && !clickedElems.includes(elem)) {
            elem.click();
            clickedElems.push(elem);
          }
        }
      }
    }
  });
})(
  window,                   // win
  document,                 // doc
  'addEventListener',       // addEvent
  'getBoundingClientRect',  // getRect
  'style',                  // sty
  'px',                     // px
  false,                    // isTouching
  false,                    // isDragging
  'position:absolute;top:0;left:0;width:1px;height:1px;pointer-events:none;'  // defaultStyle
  // createElem
  // rangeElem
  // pointElem
  // beginX
  // beginY
  // beginScrollX
  // beginScrollY
  // endX
  // endY
);
