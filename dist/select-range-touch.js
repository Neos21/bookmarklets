((h,n,t,c,i,p,r,d,e,o,s,u,g,m,b,f,x,M)=>{s=(o=t=>(t=n.createElement("i"),n.body.appendChild(t),t))(),u=o(),n[t]("touchstart",t=>{r=!0,s[i].cssText=e+"border:1px solid rgba(0,0,255,.2);background:rgba(99,255,255,.2)",u[i].cssText=e,g=t.touches[0].pageX,m=t.touches[0].pageY,b=h.scrollX,f=h.scrollY}),n[t]("touchmove",(t,e,o)=>{r&&(d=!0,x=t.touches[0].pageX,M=t.touches[0].pageY,e=x-g,s[i].left=(e<0?g+e:g)+p,o=M-m,s[i].top=(o<0?m+o:m)+p,s[i].width=Math.abs(e)+p,s[i].height=Math.abs(o)+p)}),n[t]("touchend",(t,e,o,s,a,l)=>{if(r=!1,d)for(d=!1,e=[],s=Math.min(m,M);s<Math.max(m,M);s+=9)for(h.scrollTo(b,f),o=Math.min(g,x);o<Math.max(g,x);o+=9)u[i].top=s+p,u[i].left=o+p,a=u[c](),h.scrollTo(a.left,a.top),a=u[c](),(l=n.elementFromPoint(a.left,a.top))&&!e.includes(l)&&(l.click(),e.push(l))})})(window,document,"addEventListener","getBoundingClientRect","style","px",!1,!1,"position:absolute;top:0;left:0;width:1px;height:1px;pointer-events:none;");