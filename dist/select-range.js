((e,t,o,n,a,l,i,p,s,d,g,r,c,h,m,u)=>{g=(d=(e=>(e=t.createElement("i"),t.body.appendChild(e),e)))(),r=d(),t[o]("mousedown",t=>{i=!0,g[a].cssText=s+"border:1px solid rgba(0,0,255,.2);background:rgba(99,255,255,.2)",r[a].cssText=s,c=t.pageX,h=t.pageY,m=e.scrollX,u=e.scrollY}),t[o]("mousemove",(e,t,o)=>{i&&(p=!0,t=e.pageX-c,g[a].left=(t<0?c+t:c)+l,o=e.pageY-h,g[a].top=(o<0?h+o:h)+l,g[a].width=Math.abs(t)+l,g[a].height=Math.abs(o)+l)}),t[o]("mouseup",(o,n,s,d,g,b,f,x)=>{if(i=!1,p)for(p=!1,n=o.pageX,s=o.pageY,d=[],b=Math.min(h,s);b<Math.max(h,s);b+=9)for(e.scrollTo(m,u),g=Math.min(c,n);g<Math.max(c,n);g+=9)r[a].top=b+l,r[a].left=g+l,f=r.getBoundingClientRect(),e.scrollTo(f.left,f.top),f=r.getBoundingClientRect(),(x=t.elementFromPoint(f.left,f.top))&&!d.includes(x)&&(x.click(),d.push(x))})})(window,document,"addEventListener",0,"style","px",!1,!1,"position:absolute;top:0;left:0;width:1px;height:1px;pointer-events:none;");