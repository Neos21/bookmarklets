((e,t)=>{(t=e.createElement("textarea")).textContent=`<a href="${e.URL.replace(/&/gu,"&amp;")}">${e.title.replace(/(\[|\]|<|>)/gu," ").replace(/ +/gu," ").trim()}</a>`,e.body.appendChild(t),t.select(),e.execCommand("copy"),e.body.removeChild(t)})(document);