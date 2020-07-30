/**
 * Macromill Helper
 * 
 * <p>マクロミル形式のアンケートサイトに自動回答する。</p>
 */
((doc, query, all, isChanged, overlayClose, matrixItem) => {
  // 「すべての項目で同じ答えとなっています。」オーバーレイが出ている時
  overlayClose = doc[query]('#overlay-close');
  if(overlayClose) { overlayClose.click(); }
  
  // 新デザインの展開式選択肢がある場合はクリックして展開してから回答しないと「次へ」ボタンを押しても上手くいかない
  matrixItem = doc.querySelector('.matrix-item');
  if(matrixItem) { matrixItem.click(); }
  
  // ラベル内の文言を見てクリックする
  doc[all]('label[for]').forEach((labelElem) => {
    // 否定的な選択肢・それっぽい業種や状況などの選択肢をクリックする
    if((/((い|え|が|し|て|に|は|も|ら)ない)|いいえ|正社員|IT|東京|賃貸|既婚/u).test(labelElem.innerText)) {
      console.log('クリック', labelElem.innerText);
      labelElem.click();
      isChanged = true;
    }
    else {
      console.log('マッチせず', labelElem.innerText);
    }
  });
  
  if(isChanged) {
    // 何らかのラベルをクリックした時だけボタンを押す
    doc[all]('#finishButton, [value*="次へ"], [value*="送"]').forEach((btn) => { btn.click(); });
  }
  else {
    // 何のラベルもクリックしなかった場合
    
    // 「回答をやめる」ボタンがある場合は旧デザインの最初の画面。「次へ」ボタンがあるはずなので押す
    if(doc[all]('[value*="回答をやめる"]').length) {
      doc[all]('[value*="次へ"]').forEach((btn) => { btn.click(); });
    }
    
    // 旧デザインの最後のページ
    doc[all]('a').forEach((linkElem) => {
      if(linkElem.innerText.includes('myページへ戻る')) {
        linkElem.click();
      }
    });
    
    // ラベル要素がなければ、新デザインで「～についておうかがいします。」だけのページとみなす
    if(!doc[all]('label').length) {
      doc[all]('#finishButton, [value*="次へ"]').forEach((btn) => { btn.click(); });
    }
    
    // 新デザインの最後のページ
    doc[all]('[value*="閉じる"]').forEach((btn) => { btn.click(); });
  }
})(document, 'querySelector', 'querySelectorAll', false);
