(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[439],{6200:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/mdy",function(){return n(9313)}])},8769:function(e,t,n){"use strict";n.d(t,{Z:function(){return _},y:function(){return j}});var i=n(5893),r=n(9008),s=n.n(r),d=n(5675),l=n.n(d),a=n(2717),o=n.n(a),c=n(7839),h=n.n(c),m=n(7227),u=n.n(m),x=n(1664),g=n.n(x);let y="Nicolas Grymonprez",j="Nicolas Grymonprez Next.js website";function _(e){let{children:t,home:n,cv:r}=e;return(0,i.jsxs)("div",{className:o().container,children:[(0,i.jsxs)(s(),{children:[(0,i.jsx)("link",{rel:"icon",href:"/favicon.ico"}),(0,i.jsx)("meta",{name:"description",content:"Learn how to build a personal website using Next.js"}),(0,i.jsx)("meta",{property:"og:image",content:"https://og-image.vercel.app/".concat(encodeURI(j),".png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg")}),(0,i.jsx)("meta",{name:"og:title",content:j}),(0,i.jsx)("meta",{name:"twitter:card",content:"summary_large_image"})]}),(0,i.jsx)("header",{className:r?o().headercv:o().header,children:n?(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(l(),{priority:!0,src:"/images/profile.jpg",className:h().borderCircle,height:144,width:144,quality:75,alt:""}),(0,i.jsx)("h1",{className:h().heading2Xl,children:y})]}):r?(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("table",{children:(0,i.jsx)("tbody",{children:(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{children:(0,i.jsx)(g(),{href:"/",children:(0,i.jsx)(l(),{priority:!0,src:"/images/profile.jpg",className:h().borderCircle,height:108,width:108,quality:75,alt:""})})}),(0,i.jsx)("td",{children:(0,i.jsxs)("div",{className:u().cvTitle,children:[y,(0,i.jsx)("br",{}),"\uD83D\uDCCD United States",(0,i.jsx)("br",{}),"\uD83D\uDCDE: (816) 886-8893",(0,i.jsx)("br",{}),"\uD83D\uDCE7: ",(0,i.jsx)("a",{href:"mailto:nicolas.grymonprez@gmail.com",children:"nicolas.grymonprez@gmail.com"}),(0,i.jsx)("br",{}),"\uD83C\uDF10: French, British \uD83D\uDDE3:French, English",(0,i.jsx)("br",{})]})})]})})})}):(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(g(),{href:"/",children:(0,i.jsx)(l(),{priority:!0,src:"/images/profile.jpg",className:h().borderCircle,height:108,width:108,quality:75,alt:""})}),(0,i.jsx)("h2",{className:h().headingLg,children:(0,i.jsx)(g(),{href:"/",className:h().colorInherit,children:y})})]})}),(0,i.jsx)("main",{children:t}),!n&&(0,i.jsx)("div",{className:o().backToHome,children:(0,i.jsx)(g(),{href:"/",children:"← Back to home"})})]})}},9886:function(e,t,n){"use strict";function i(e){let{src:t,width:n,quality:i}=e,r=new URL("https://nicolasgrymonprezblog.imgix.net".concat(t)),s=r.searchParams;return s.set("auto",s.getAll("auto").join(",")||"format"),s.set("fit",s.get("fit")||"max"),s.set("w",s.get("w")||(""+n).toString()),s.set("q",(""+i).toString()||"50"),r.href}n.r(t),n.d(t,{default:function(){return i}})},9313:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return m},default:function(){return u}});var i=n(5893),r=n(8769),s=n(9008),d=n.n(s),l=n(7839),a=n.n(l),o=n(7294),c=n(3148);function h(e,t){return{responsive:!0,plugins:{title:{display:!0,text:t?"Price of the Model Y ("+e+") options":"Price of the Model Y trims"}},interaction:{intersect:!1},scales:{x:{display:!0,title:{display:!0,text:"Dates"}},y:{display:!0,title:{display:!0,text:"Price"}}}}}c.kL.register(c.ST,c.jn,c.od,c.uw,c.f$,c.Dx,c.De,c.u);var m=!0;function u(e){let t=[],n=[],s=[],l=[],m=[],u=["#3e95cd","#3cba9f","#ffa500","#6772d8","#d35260","#3ecdbf"],x=["#7bb6dd","#71d1bd","#ffc04d","#8f98e2","#e28f98","#8fe2da"],g={PAINT:"P-",WHEELS:"W-",INTERIOR:"I-",PREMIUM_PACKAGE:"I-",INTERIOR_PACKAGE:"I-"};var y,j,_=0,b=0,p=0;let f={labels:t,datasets:[]};for(var B in e)for(var v in e[B].code)!function(e,t){for(var n in e)if(e[n]==t)return!0;return!1}(t,v)&&t.push(v);for(let e in t)for(let n=e+1;n<t.length;n++)t[e]>t[n]&&(j=t[e],t[e]=t[n],t[n]=j);for(var B in e){for(let i in n[_]=[],s[_]=[],l[_]={labels:t,datasets:[]},t)(p=e[B].price[t[i]])>0?n[_].push(p):n[_].push("NaN");for(var I in f.datasets.push({data:n[_],label:B,borderColor:u[_%6],backgroundColor:x[_%6],fill:!1}),b=0,e[B].options){for(var T in s[_][I]=[],e[B].options[I]){for(let n in s[_][I][T]=[],t)(p=e[B].options[I][T][t[n]])>0?s[_][I][T].push(p):s[_][I][T].push("NaN");l[_].datasets.push({data:s[_][I][T],label:(g[y=I]?g[y]:"O-")+T,borderColor:u[b%6],backgroundColor:x[b%6],fill:!1})}b++}m[_]=h(B,!0),_++}let E=h("",!1);return(0,o.useEffect)(()=>{var e=document.getElementById("chart").getContext("2d"),t=[];t.push(new c.kL(e,{type:"line",data:f,options:E}));for(let n=0;n<l.length&&n<6;n++){var e=document.getElementById("chartTRIM"+n).getContext("2d");t.push(new c.kL(e,{type:"line",data:l[n],options:m[n]})),document.getElementById("myPaintBtn"+n).addEventListener("click",()=>{for(let e=0;e<t[n+1].data.datasets.length;e++)t[n+1].data.datasets[e].label.includes("P-")&&t[n+1].setDatasetVisibility(e,!t[n+1].isDatasetVisible(e));t[n+1].update(),"Hide paint"==document.getElementById("myPaintBtn"+n).innerText?document.getElementById("myPaintBtn"+n).innerText="Show paint":document.getElementById("myPaintBtn"+n).innerText="Hide paint"}),document.getElementById("myWheelBtn"+n).addEventListener("click",()=>{for(let e=0;e<t[n+1].data.datasets.length;e++)t[n+1].data.datasets[e].label.includes("W-")&&t[n+1].setDatasetVisibility(e,!t[n+1].isDatasetVisible(e));t[n+1].update(),"Hide wheel"==document.getElementById("myWheelBtn"+n).innerText?document.getElementById("myWheelBtn"+n).innerText="Show wheel":document.getElementById("myWheelBtn"+n).innerText="Hide wheel"}),document.getElementById("myInteriorBtn"+n).addEventListener("click",()=>{for(let e=0;e<t[n+1].data.datasets.length;e++)t[n+1].data.datasets[e].label.includes("I-")&&t[n+1].setDatasetVisibility(e,!t[n+1].isDatasetVisible(e));t[n+1].update(),"Hide interior"==document.getElementById("myInteriorBtn"+n).innerText?document.getElementById("myInteriorBtn"+n).innerText="Show interior":document.getElementById("myInteriorBtn"+n).innerText="Hide interior"}),document.getElementById("myOtherBtn"+n).addEventListener("click",()=>{for(let e=0;e<t[n+1].data.datasets.length;e++)t[n+1].data.datasets[e].label.includes("O-")&&t[n+1].setDatasetVisibility(e,!t[n+1].isDatasetVisible(e));t[n+1].update(),"Hide other"==document.getElementById("myOtherBtn"+n).innerText?document.getElementById("myOtherBtn"+n).innerText="Show other":document.getElementById("myOtherBtn"+n).innerText="Hide other"})}for(let e=t.length-1;e<6;e++)document.getElementById("chartTRIM"+e).remove(),document.getElementById("myPaintBtn"+e).remove(),document.getElementById("myWheelBtn"+e).remove(),document.getElementById("myInteriorBtn"+e).remove(),document.getElementById("myOtherBtn"+e).remove()},[]),(0,i.jsxs)(r.Z,{children:[(0,i.jsx)(d(),{children:(0,i.jsx)("title",{children:"Model Y Tracker"})}),(0,i.jsxs)("article",{children:[(0,i.jsx)("h1",{className:a().headingXl,children:"Model Y Tracker"}),(0,i.jsxs)("div",{className:a().lightText,children:[(0,i.jsx)("p",{children:"The Model Y tracker is updated every day. "}),(0,i.jsxs)("p",{children:["The data is extracted from ",(0,i.jsx)("a",{href:"https://www.tesla.com/modely/design#overview",children:"Tesla"})," website."]}),(0,i.jsx)("canvas",{id:"chart"})]}),(0,i.jsx)("h1",{className:a().headingXl,children:"Model Y - TRIM's options"}),(0,i.jsxs)("div",{className:a().lightText,children:[(0,i.jsx)("canvas",{id:"chartTRIM0"}),(0,i.jsxs)("div",{className:a().button,children:[(0,i.jsx)("button",{id:"myPaintBtn0",children:"Hide paint"}),(0,i.jsx)("button",{id:"myWheelBtn0",children:"Hide wheels"}),(0,i.jsx)("button",{id:"myInteriorBtn0",children:"Hide interior"}),(0,i.jsx)("button",{id:"myOtherBtn0",children:"Hide other"})]}),(0,i.jsx)("canvas",{id:"chartTRIM1"}),(0,i.jsxs)("div",{className:a().button,children:[(0,i.jsx)("button",{id:"myPaintBtn1",children:"Hide paint"}),(0,i.jsx)("button",{id:"myWheelBtn1",children:"Hide wheels"}),(0,i.jsx)("button",{id:"myInteriorBtn1",children:"Hide interior"}),(0,i.jsx)("button",{id:"myOtherBtn1",children:"Hide other"})]}),(0,i.jsx)("canvas",{id:"chartTRIM2"}),(0,i.jsxs)("div",{className:a().button,children:[(0,i.jsx)("button",{id:"myPaintBtn2",children:"Hide paint"}),(0,i.jsx)("button",{id:"myWheelBtn2",children:"Hide wheels"}),(0,i.jsx)("button",{id:"myInteriorBtn2",children:"Hide interior"}),(0,i.jsx)("button",{id:"myOtherBtn2",children:"Hide other"})]}),(0,i.jsx)("canvas",{id:"chartTRIM3"}),(0,i.jsxs)("div",{className:a().button,children:[(0,i.jsx)("button",{id:"myPaintBtn3",children:"Hide paint"}),(0,i.jsx)("button",{id:"myWheelBtn3",children:"Hide wheels"}),(0,i.jsx)("button",{id:"myInteriorBtn3",children:"Hide interior"}),(0,i.jsx)("button",{id:"myOtherBtn3",children:"Hide other"})]}),(0,i.jsx)("canvas",{id:"chartTRIM4"}),(0,i.jsxs)("div",{className:a().button,children:[(0,i.jsx)("button",{id:"myPaintBtn4",children:"Hide paint"}),(0,i.jsx)("button",{id:"myWheelBtn4",children:"Hide wheels"}),(0,i.jsx)("button",{id:"myInteriorBtn4",children:"Hide interior"}),(0,i.jsx)("button",{id:"myOtherBtn4",children:"Hide other"})]}),(0,i.jsx)("canvas",{id:"chartTRIM5"}),(0,i.jsxs)("div",{className:a().button,children:[(0,i.jsx)("button",{id:"myPaintBtn5",children:"Hide paint"}),(0,i.jsx)("button",{id:"myWheelBtn5",children:"Hide wheels"}),(0,i.jsx)("button",{id:"myInteriorBtn5",children:"Hide interior"}),(0,i.jsx)("button",{id:"myOtherBtn5",children:"Hide other"})]})]})]})]})}},2717:function(e){e.exports={container:"layout_container__fbLkO",header:"layout_header__kY0Lt",headercv:"layout_headercv__rEQet",backToHome:"layout_backToHome__9sjx_"}},7227:function(e){e.exports={cvTitle:"cv_cvTitle__lPg_t",sumText:"cv_sumText__kQPxf",sumExp:"cv_sumExp__4HvfX",jobTitle:"cv_jobTitle__ce0j5",jobDate:"cv_jobDate__RZRlY"}},7839:function(e){e.exports={heading2Xl:"utils_heading2Xl___9fFP",headingXl:"utils_headingXl__u25Y2",headingLg:"utils_headingLg__5535D",headingMd:"utils_headingMd__gD1Ok",borderCircle:"utils_borderCircle__s2nTm",colorInherit:"utils_colorInherit__mSH_x",padding1px:"utils_padding1px__PWQKR",list:"utils_list__4Mu4l",listItem:"utils_listItem__s2m6i",lightText:"utils_lightText__eUzGY",table:"utils_table__x_1fY",logo:"utils_logo__ecSSn",button:"utils_button__VZ2dT"}}},function(e){e.O(0,[196,247,676,774,888,179],function(){return e(e.s=6200)}),_N_E=e.O()}]);