$(function(){function t(){function t(t,n,e){for(var r,a,o,u=([{x:0,y:0},{x:h[0],y:h[1]}],n.x),i=n.y,l=Math.sqrt(h[0]*h[0]+h[1]*h[1]),c=b(h),y=Math.random()<.5?1:-1,x=-y;(r=c(x+=y))&&(a=~~r[0],o=~~r[1],!(Math.min(a,o)>l));)if(n.x=u+a,n.y=i+o,!(n.x+n.x0<0||n.y+n.y0<0||n.x+n.x1>h[0]||n.y+n.y1>h[1]||e&&f(n,t,h[0])||e&&!s(n,e))){for(var d,g=n.sprite,m=n.width>>5,v=h[0]>>5,p=n.x-(m<<4),M=127&p,w=32-M,z=n.y1-n.y0,I=(n.y+n.y0)*v+(p>>5),k=0;z>k;k++){d=0;for(var T=0;m>=T;T++)t[I+T]|=d<<w|(m>T?(d=g[k*m+T])>>>M:0);I+=v}return delete n.sprite,!0}return!1}var h=[256,256],x=n,d=e,g=a,m=r,v=r,p=o,w=u,b=c,z=[],I=1/0,k=d3.dispatch("word","end"),T=null,q={};return q.start=function(){function n(){for(var n,s=+new Date;+new Date-s<I&&++o<a&&T;)n=f[o],n.x=h[0]*(Math.random()+.5)>>1,n.y=h[1]*(Math.random()+.5)>>1,i(n,f,o),n.hasText&&t(e,n,r)&&(u.push(n),k.word(n),r?l(r,n):r=[{x:n.x+n.x0,y:n.y+n.y0},{x:n.x+n.x1,y:n.y+n.y1}],n.x-=h[0]>>1,n.y-=h[1]>>1);o>=a&&(q.stop(),k.end(u,r))}var e=y((h[0]>>5)*h[1]),r=null,a=z.length,o=-1,u=[],f=z.map(function(t,n){return t.text=x.call(this,t,n),t.font=d.call(this,t,n),t.style=m.call(this,t,n),t.weight=v.call(this,t,n),t.rotate=p.call(this,t,n),t.size=~~g.call(this,t,n),t.padding=w.call(this,t,n),t}).sort(function(t,n){return n.size-t.size});return T&&clearInterval(T),T=setInterval(n,0),n(),q},q.stop=function(){return T&&(clearInterval(T),T=null),q},q.timeInterval=function(t){return arguments.length?(I=null==t?1/0:t,q):I},q.words=function(t){return arguments.length?(z=t,q):z},q.size=function(t){return arguments.length?(h=[+t[0],+t[1]],q):h},q.font=function(t){return arguments.length?(d=d3.functor(t),q):d},q.fontStyle=function(t){return arguments.length?(m=d3.functor(t),q):m},q.fontWeight=function(t){return arguments.length?(v=d3.functor(t),q):v},q.rotate=function(t){return arguments.length?(p=d3.functor(t),q):p},q.text=function(t){return arguments.length?(x=d3.functor(t),q):x},q.spiral=function(t){return arguments.length?(b=M[t+""]||t,q):b},q.fontSize=function(t){return arguments.length?(g=d3.functor(t),q):g},q.padding=function(t){return arguments.length?(w=d3.functor(t),q):w},d3.rebind(q,k,"on")}function n(t){return t.text}function e(){return"serif"}function r(){return"normal"}function a(t){return Math.sqrt(t.value)}function o(){return 30*(~~(6*Math.random())-3)}function u(){return 1}function i(t,n,e){if(!t.sprite){p.clearRect(0,0,(g<<5)/v,m/v);var r=0,a=0,o=0,u=n.length;for(--e;++e<u;){t=n[e],p.save(),p.font=t.style+" "+t.weight+" "+~~((t.size+1)/v)+"px "+t.font;var i=p.measureText(t.text+"m").width*v,f=t.size<<1;if(t.rotate){var l=Math.sin(t.rotate*d),s=Math.cos(t.rotate*d),c=i*s,h=i*l,y=f*s,x=f*l;i=Math.max(Math.abs(c+x),Math.abs(c-x))+31>>5<<5,f=~~Math.max(Math.abs(h+y),Math.abs(h-y))}else i=i+31>>5<<5;if(f>o&&(o=f),r+i>=g<<5&&(r=0,a+=o,o=0),a+f>=m)break;p.translate((r+(i>>1))/v,(a+(f>>1))/v),t.rotate&&p.rotate(t.rotate*d),p.fillText(t.text,0,0),t.padding&&(p.lineWidth=2*t.padding,p.strokeText(t.text,0,0)),p.restore(),t.width=i,t.height=f,t.xoff=r,t.yoff=a,t.x1=i>>1,t.y1=f>>1,t.x0=-t.x1,t.y0=-t.y1,t.hasText=!0,r+=i}for(var M=p.getImageData(0,0,(g<<5)/v,m/v).data,w=[];--e>=0;)if(t=n[e],t.hasText){for(var i=t.width,b=i>>5,f=t.y1-t.y0,z=0;f*b>z;z++)w[z]=0;if(r=t.xoff,null==r)return;a=t.yoff;for(var I=0,k=-1,T=0;f>T;T++){for(var z=0;i>z;z++){var q=b*T+(z>>5),D=M[(a+T)*(g<<5)+(r+z)<<2]?1<<31-z%32:0;w[q]|=D,I|=D}I?k=T:(t.y0++,f--,T--,a++)}t.y1=t.y0+k,t.sprite=w.slice(0,(t.y1-t.y0)*b)}}}function f(t,n,e){e>>=5;for(var r,a=t.sprite,o=t.width>>5,u=t.x-(o<<4),i=127&u,f=32-i,l=t.y1-t.y0,s=(t.y+t.y0)*e+(u>>5),c=0;l>c;c++){r=0;for(var h=0;o>=h;h++)if((r<<f|(o>h?(r=a[c*o+h])>>>i:0))&n[s+h])return!0;s+=e}return!1}function l(t,n){var e=t[0],r=t[1];n.x+n.x0<e.x&&(e.x=n.x+n.x0),n.y+n.y0<e.y&&(e.y=n.y+n.y0),n.x+n.x1>r.x&&(r.x=n.x+n.x1),n.y+n.y1>r.y&&(r.y=n.y+n.y1)}function s(t,n){return t.x+t.x1>n[0].x&&t.x+t.x0<n[1].x&&t.y+t.y1>n[0].y&&t.y+t.y0<n[1].y}function c(t){var n=t[0]/t[1];return function(t){return[n*(t*=.1)*Math.cos(t),t*Math.sin(t)]}}function h(t){var n=4,e=n*t[0]/t[1],r=0,a=0;return function(t){var o=0>t?-1:1;switch(Math.sqrt(1+4*o*t)-o&3){case 0:r+=e;break;case 1:a+=n;break;case 2:r-=e;break;default:a-=n}return[r,a]}}function y(t){for(var n=[],e=-1;++e<t;)n[e]=0;return n}var x,d=Math.PI/180,g=64,m=2048,v=1;"undefined"!=typeof document?(x=document.createElement("canvas"),x.width=1,x.height=1,v=Math.sqrt(x.getContext("2d").getImageData(0,0,1,1).data.length>>2),x.width=(g<<5)/v,x.height=m/v):x=new Canvas(g<<5,m);var p=x.getContext("2d"),M={archimedean:c,rectangular:h};p.fillStyle=p.strokeStyle="red",p.textAlign="center","object"==typeof module&&module.exports?module.exports=t:(d3.layout||(d3.layout={})).cloud=t})();