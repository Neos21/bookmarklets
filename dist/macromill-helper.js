((e,l,c,o,i,r)=>{(i=e.querySelector("#overlay-close"))&&i.click(),(r=e.querySelector(".matrix-item"))&&r.click(),e[c]("label[for]").forEach(e=>{/((い|え|が|し|て|に|は|も|ら)ない)|いいえ|正社員|IT|東京|賃貸|既婚/u.test(e.innerText)?(console.log("クリック",e.innerText),e.click(),o=!0):console.log("マッチせず",e.innerText)}),o?e[c]('#finishButton, [value*="次へ"], [value*="送"]').forEach(e=>{e.click()}):(e[c]('[value*="回答をやめる"]').length&&e[c]('[value*="次へ"]').forEach(e=>{e.click()}),e[c]("a").forEach(e=>{e.innerText.includes("myページへ戻る")&&e.click()}),e[c]("label").length||e[c]('#finishButton, [value*="次へ"]').forEach(e=>{e.click()}),e[c]('[value*="閉じる"]').forEach(e=>{e.click()}))})(document,0,"querySelectorAll",!1);