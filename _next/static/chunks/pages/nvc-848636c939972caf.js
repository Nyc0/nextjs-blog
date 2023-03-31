(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[875],{5446:function(e,t,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/nvc",function(){return i(6724)}])},8769:function(e,t,i){"use strict";i.d(t,{Z:function(){return _},y:function(){return x}});var r=i(5893),n=i(9008),s=i.n(n),a=i(5675),l=i.n(a),c=i(2717),o=i.n(c),d=i(7839),h=i.n(d),u=i(1664),m=i.n(u);let g="Nicolas Grymonprez",x="Nicolas Grymonprez Next.js website";function _(e){let{children:t,home:i,cv:n}=e;return(0,r.jsxs)("div",{className:o().container,children:[(0,r.jsxs)(s(),{children:[(0,r.jsx)("link",{rel:"icon",href:"/favicon.ico"}),(0,r.jsx)("meta",{name:"description",content:"Learn how to build a personal website using Next.js"}),(0,r.jsx)("meta",{property:"og:image",content:"https://og-image.vercel.app/".concat(encodeURI(x),".png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg")}),(0,r.jsx)("meta",{name:"og:title",content:x}),(0,r.jsx)("meta",{name:"twitter:card",content:"summary_large_image"})]}),(0,r.jsx)("header",{className:n?o().headercv:o().header,children:i?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(l(),{priority:!0,src:"/images/profile.jpg",className:h().borderCircle,height:144,width:144,quality:75,alt:""}),(0,r.jsx)("h1",{className:h().heading2Xl,children:g})]}):n?(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("table",{children:(0,r.jsx)("tbody",{children:(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)(m(),{href:"/",children:(0,r.jsx)(l(),{priority:!0,src:"/images/profile.jpg",className:h().borderCircle,height:108,width:108,quality:75,alt:""})})}),(0,r.jsx)("td",{children:(0,r.jsxs)("div",{className:h().cvTitle,children:[g,(0,r.jsx)("br",{}),"\uD83D\uDCCD Currently relocating to the USA",(0,r.jsx)("br",{}),"\uD83D\uDCDE: +61 447 561 994",(0,r.jsx)("br",{}),"\uD83D\uDCE7: ",(0,r.jsx)("a",{href:"mailto:nicolas.grymonprez@gmail.com",children:"nicolas.grymonprez@gmail.com"}),(0,r.jsx)("br",{}),"\uD83C\uDF10: French, British",(0,r.jsx)("br",{})]})})]})})})}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(m(),{href:"/",children:(0,r.jsx)(l(),{priority:!0,src:"/images/profile.jpg",className:h().borderCircle,height:108,width:108,quality:75,alt:""})}),(0,r.jsx)("h2",{className:h().headingLg,children:(0,r.jsx)(m(),{href:"/",className:h().colorInherit,children:g})})]})}),(0,r.jsx)("main",{children:t}),!i&&(0,r.jsx)("div",{className:o().backToHome,children:(0,r.jsx)(m(),{href:"/",children:"← Back to home"})})]})}},9886:function(e,t,i){"use strict";function r(e){let{src:t,width:i,quality:r}=e,n=new URL("https://nicolasgrymonprezblog.imgix.net".concat(t)),s=n.searchParams;return s.set("auto",s.getAll("auto").join(",")||"format"),s.set("fit",s.get("fit")||"max"),s.set("w",s.get("w")||(""+i).toString()),s.set("q",(""+r).toString()||"50"),n.href}i.r(t),i.d(t,{default:function(){return r}})},6724:function(e,t,i){"use strict";i.r(t),i.d(t,{__N_SSG:function(){return h},default:function(){return u}});var r=i(5893),n=i(8769),s=i(9008),a=i.n(s);i(5675);var l=i(7839),c=i.n(l),o=i(7294),d=i(3148);d.kL.register(d.ST,d.jn,d.od,d.uw,d.f$,d.Dx,d.De,d.u);var h=!0;function u(e){let t=e.creation,i=e.review,s=e.inquiry,l=[],h=[],u=[],m=[];for(var g in t)l.push(g),h.push(t[g]);for(var g in i)u.push(i[g]);for(var g in s)m.push(s[g]);let x={labels:l,datasets:[{data:h,label:"Case creation",borderColor:"#3e95cd",backgroundColor:"#7bb6dd",fill:!1},{data:u,label:"Case review",borderColor:"#3cba9f",backgroundColor:"#71d1bd",fill:!1},{data:m,label:"Inquiries",borderColor:"#ffa500",backgroundColor:"#ffc04d",fill:!1}]},_={responsive:!0,plugins:{title:{display:!0,text:"NVC waiting time"}},interaction:{intersect:!1},scales:{x:{display:!0,title:{display:!0,text:"Dates"}},y:{display:!0,title:{display:!0,text:"Days"}}}};return(0,o.useEffect)(()=>{var e=document.getElementById("nvcChart").getContext("2d");new d.kL(e,{type:"line",data:x,options:_})},[]),(0,r.jsxs)(n.Z,{children:[(0,r.jsx)(a(),{children:(0,r.jsx)("title",{children:"NVC Tracker"})}),(0,r.jsxs)("article",{children:[(0,r.jsx)("h1",{className:c().headingXl,children:"NVC Tracker"}),(0,r.jsxs)("div",{className:c().lightText,children:[(0,r.jsx)("p",{children:"The NVC tracker will be updated next Monday (). The data should be made available by the end of the day US time."}),(0,r.jsxs)("p",{children:["The data is extracted from ",(0,r.jsx)("a",{src:"https://travel.state.gov/content/travel/en/us-visas/immigrate/nvc-timeframes.html",children:"nvc-timeframe"})," website."]}),(0,r.jsx)("canvas",{id:"nvcChart"}),(0,r.jsxs)("p",{children:["My work was inspired by ",(0,r.jsx)("a",{src:"https://visawhen.com/nvc",children:"visawhen.com/nvc"}),"!"]})]})]})]})}},2717:function(e){e.exports={container:"layout_container__fbLkO",header:"layout_header__kY0Lt",headercv:"layout_headercv__rEQet",backToHome:"layout_backToHome__9sjx_"}},7839:function(e){e.exports={heading2Xl:"utils_heading2Xl___9fFP",headingXl:"utils_headingXl__u25Y2",headingLg:"utils_headingLg__5535D",headingMd:"utils_headingMd__gD1Ok",borderCircle:"utils_borderCircle__s2nTm",colorInherit:"utils_colorInherit__mSH_x",padding1px:"utils_padding1px__PWQKR",list:"utils_list__4Mu4l",listItem:"utils_listItem__s2m6i",lightText:"utils_lightText__eUzGY",cvTitle:"utils_cvTitle__YHKTS"}}},function(e){e.O(0,[196,247,676,774,888,179],function(){return e(e.s=5446)}),_N_E=e.O()}]);