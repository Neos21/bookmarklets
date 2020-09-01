/**
 * Random Check Inputs
 * 
 * <p>ラジオボタン <code>input[type=&quot;radio&quot;]</code>・チェックボックス <code>input[type=&quot;checkbox&quot;]</code> を <code>name</code> 属性ごとに1つランダムにクリックする。</p>
 */
((doc, all, elems) => {
  // name 属性を持つモノだけに絞り込む
  doc[all]('[type=radio][name],[type=checkbox][name]').forEach((elem) => {
    if(elems[elem.name] === undefined) {
      elems[elem.name] = [];
    }
    elems[elem.name].push(elem);
  });
  
  // name 属性ごとに1つだけクリックする
  Object.keys(elems).forEach((name) => {
    elems[name][Math.floor(Math.random() * elems[name].length)].click();
  });
  
  // 何らかのラベルをクリックした時だけボタンを押す
  doc[all]('#finishButton,[value*="次へ"],[value*="送"]').forEach((btn) => { btn.click(); });
})(document, 'querySelectorAll', {});
