/**
 * ラジオボタン・チェックボックスをランダムにチェックするブックマークレット
 * 
 * name 属性ごとに1つの要素をランダムに抽出し、クリックする。
 * 以下のようなブックマークレットで読み込んで使う。
 * 
 * ```javascript
 * javascript:((d,s)=>{s=d.createElement('script');s.src='https://neos21.github.io/bookmarklets/dist/random-check-inputs.js';d.body.appendChild(s)})(document);
 * ```
 */
((x) => {
  const elems = {};
  
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
})();
