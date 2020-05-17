/**
 * Random Check Inputs
 * 
 * <p>ラジオボタン <code>input[type=&quot;radio&quot;]</code>・チェックボックス <code>input[type=&quot;checkbox&quot;]</code> を <code>name</code> 属性ごとに1つランダムにクリックする。</p>
 */
((elems) => {
  [].forEach.call(document.querySelectorAll('[type=radio],[type=checkbox]'), (elem) => {
    if(!elem.name) {
      return;
    }
    
    if(elems[elem.name] === undefined) {
      elems[elem.name] = [];
    }
    
    elems[elem.name].push(elem);
  });
  
  Object.keys(elems).forEach((name) => {
    elems[name][Math.floor(Math.random() * elems[name].length)].click();
  });
})({});
