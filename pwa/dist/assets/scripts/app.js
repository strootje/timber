!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(1);r.render(r.h("p",null,"Hello, World"),document.body)},function(e,t,n){"use strict";n.r(t),n.d(t,"h",function(){return a}),n.d(t,"createElement",function(){return a}),n.d(t,"cloneElement",function(){return p}),n.d(t,"createRef",function(){return A}),n.d(t,"Component",function(){return D}),n.d(t,"render",function(){return V}),n.d(t,"rerender",function(){return m}),n.d(t,"options",function(){return o});var r=function(){},o={},i=[],l=[];function a(e,t){var n,a,u,s,c=l;for(s=arguments.length;s-- >2;)i.push(arguments[s]);for(t&&null!=t.children&&(i.length||i.push(t.children),delete t.children);i.length;)if((a=i.pop())&&void 0!==a.pop)for(s=a.length;s--;)i.push(a[s]);else"boolean"==typeof a&&(a=null),(u="function"!=typeof e)&&(null==a?a="":"number"==typeof a?a=String(a):"string"!=typeof a&&(u=!1)),u&&n?c[c.length-1]+=a:c===l?c=[a]:c.push(a),n=u;var p=new r;return p.nodeName=e,p.children=c,p.attributes=null==t?void 0:t,p.key=null==t?void 0:t.key,void 0!==o.vnode&&o.vnode(p),p}function u(e,t){for(var n in t)e[n]=t[n];return e}function s(e,t){null!=e&&("function"==typeof e?e(t):e.current=t)}var c="function"==typeof Promise?Promise.resolve().then.bind(Promise.resolve()):setTimeout;function p(e,t){return a(e.nodeName,u(u({},e.attributes),t),arguments.length>2?[].slice.call(arguments,2):e.children)}var f=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,d=[];function v(e){!e._dirty&&(e._dirty=!0)&&1==d.push(e)&&(o.debounceRendering||c)(m)}function m(){for(var e;e=d.pop();)e._dirty&&O(e)}function _(e,t,n){return"string"==typeof t||"number"==typeof t?void 0!==e.splitText:"string"==typeof t.nodeName?!e._componentConstructor&&h(e,t.nodeName):n||e._componentConstructor===t.nodeName}function h(e,t){return e.normalizedNodeName===t||e.nodeName.toLowerCase()===t.toLowerCase()}function y(e){var t=u({},e.attributes);t.children=e.children;var n=e.nodeName.defaultProps;if(void 0!==n)for(var r in n)void 0===t[r]&&(t[r]=n[r]);return t}function b(e){var t=e.parentNode;t&&t.removeChild(e)}function g(e,t,n,r,o){if("className"===t&&(t="class"),"key"===t);else if("ref"===t)s(n,null),s(r,e);else if("class"!==t||o)if("style"===t){if(r&&"string"!=typeof r&&"string"!=typeof n||(e.style.cssText=r||""),r&&"object"==typeof r){if("string"!=typeof n)for(var i in n)i in r||(e.style[i]="");for(var i in r)e.style[i]="number"==typeof r[i]&&!1===f.test(i)?r[i]+"px":r[i]}}else if("dangerouslySetInnerHTML"===t)r&&(e.innerHTML=r.__html||"");else if("o"==t[0]&&"n"==t[1]){var l=t!==(t=t.replace(/Capture$/,""));t=t.toLowerCase().substring(2),r?n||e.addEventListener(t,C,l):e.removeEventListener(t,C,l),(e._listeners||(e._listeners={}))[t]=r}else if("list"!==t&&"type"!==t&&!o&&t in e){try{e[t]=null==r?"":r}catch(e){}null!=r&&!1!==r||"spellcheck"==t||e.removeAttribute(t)}else{var a=o&&t!==(t=t.replace(/^xlink:?/,""));null==r||!1===r?a?e.removeAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase()):e.removeAttribute(t):"function"!=typeof r&&(a?e.setAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase(),r):e.setAttribute(t,r))}else e.className=r||""}function C(e){return this._listeners[e.type](o.event&&o.event(e)||e)}var x=[],N=0,S=!1,w=!1;function k(){for(var e;e=x.shift();)o.afterMount&&o.afterMount(e),e.componentDidMount&&e.componentDidMount()}function P(e,t,n,r,o,i){N++||(S=null!=o&&void 0!==o.ownerSVGElement,w=null!=e&&!("__preactattr_"in e));var l=U(e,t,n,r,i);return o&&l.parentNode!==o&&o.appendChild(l),--N||(w=!1,i||k()),l}function U(e,t,n,r,o){var i=e,l=S;if(null!=t&&"boolean"!=typeof t||(t=""),"string"==typeof t||"number"==typeof t)return e&&void 0!==e.splitText&&e.parentNode&&(!e._component||o)?e.nodeValue!=t&&(e.nodeValue=t):(i=document.createTextNode(t),e&&(e.parentNode&&e.parentNode.replaceChild(i,e),M(e,!0))),i.__preactattr_=!0,i;var a,u,s=t.nodeName;if("function"==typeof s)return function(e,t,n,r){var o=e&&e._component,i=o,l=e,a=o&&e._componentConstructor===t.nodeName,u=a,s=y(t);for(;o&&!u&&(o=o._parentComponent);)u=o.constructor===t.nodeName;o&&u&&(!r||o._component)?(E(o,s,3,n,r),e=o.base):(i&&!a&&(W(i),e=l=null),o=L(t.nodeName,s,n),e&&!o.nextBase&&(o.nextBase=e,l=null),E(o,s,1,n,r),e=o.base,l&&e!==l&&(l._component=null,M(l,!1)));return e}(e,t,n,r);if(S="svg"===s||"foreignObject"!==s&&S,s=String(s),(!e||!h(e,s))&&(a=s,(u=S?document.createElementNS("http://www.w3.org/2000/svg",a):document.createElement(a)).normalizedNodeName=a,i=u,e)){for(;e.firstChild;)i.appendChild(e.firstChild);e.parentNode&&e.parentNode.replaceChild(i,e),M(e,!0)}var c=i.firstChild,p=i.__preactattr_,f=t.children;if(null==p){p=i.__preactattr_={};for(var d=i.attributes,v=d.length;v--;)p[d[v].name]=d[v].value}return!w&&f&&1===f.length&&"string"==typeof f[0]&&null!=c&&void 0!==c.splitText&&null==c.nextSibling?c.nodeValue!=f[0]&&(c.nodeValue=f[0]):(f&&f.length||null!=c)&&function(e,t,n,r,o){var i,l,a,u,s,c=e.childNodes,p=[],f={},d=0,v=0,m=c.length,h=0,y=t?t.length:0;if(0!==m)for(var g=0;g<m;g++){var C=c[g],x=C.__preactattr_,N=y&&x?C._component?C._component.__key:x.key:null;null!=N?(d++,f[N]=C):(x||(void 0!==C.splitText?!o||C.nodeValue.trim():o))&&(p[h++]=C)}if(0!==y)for(var g=0;g<y;g++){u=t[g],s=null;var N=u.key;if(null!=N)d&&void 0!==f[N]&&(s=f[N],f[N]=void 0,d--);else if(v<h)for(i=v;i<h;i++)if(void 0!==p[i]&&_(l=p[i],u,o)){s=l,p[i]=void 0,i===h-1&&h--,i===v&&v++;break}s=U(s,u,n,r),a=c[g],s&&s!==e&&s!==a&&(null==a?e.appendChild(s):s===a.nextSibling?b(a):e.insertBefore(s,a))}if(d)for(var g in f)void 0!==f[g]&&M(f[g],!1);for(;v<=h;)void 0!==(s=p[h--])&&M(s,!1)}(i,f,n,r,w||null!=p.dangerouslySetInnerHTML),function(e,t,n){var r;for(r in n)t&&null!=t[r]||null==n[r]||g(e,r,n[r],n[r]=void 0,S);for(r in t)"children"===r||"innerHTML"===r||r in n&&t[r]===("value"===r||"checked"===r?e[r]:n[r])||g(e,r,n[r],n[r]=t[r],S)}(i,t.attributes,p),S=l,i}function M(e,t){var n=e._component;n?W(n):(null!=e.__preactattr_&&s(e.__preactattr_.ref,null),!1!==t&&null!=e.__preactattr_||b(e),T(e))}function T(e){for(e=e.lastChild;e;){var t=e.previousSibling;M(e,!0),e=t}}var B=[];function L(e,t,n){var r,o=B.length;for(e.prototype&&e.prototype.render?(r=new e(t,n),D.call(r,t,n)):((r=new D(t,n)).constructor=e,r.render=j);o--;)if(B[o].constructor===e)return r.nextBase=B[o].nextBase,B.splice(o,1),r;return r}function j(e,t,n){return this.constructor(e,n)}function E(e,t,n,r,i){e._disable||(e._disable=!0,e.__ref=t.ref,e.__key=t.key,delete t.ref,delete t.key,void 0===e.constructor.getDerivedStateFromProps&&(!e.base||i?e.componentWillMount&&e.componentWillMount():e.componentWillReceiveProps&&e.componentWillReceiveProps(t,r)),r&&r!==e.context&&(e.prevContext||(e.prevContext=e.context),e.context=r),e.prevProps||(e.prevProps=e.props),e.props=t,e._disable=!1,0!==n&&(1!==n&&!1===o.syncComponentUpdates&&e.base?v(e):O(e,1,i)),s(e.__ref,e))}function O(e,t,n,r){if(!e._disable){var i,l,a,s=e.props,c=e.state,p=e.context,f=e.prevProps||s,d=e.prevState||c,v=e.prevContext||p,m=e.base,_=e.nextBase,h=m||_,b=e._component,g=!1,C=v;if(e.constructor.getDerivedStateFromProps&&(c=u(u({},c),e.constructor.getDerivedStateFromProps(s,c)),e.state=c),m&&(e.props=f,e.state=d,e.context=v,2!==t&&e.shouldComponentUpdate&&!1===e.shouldComponentUpdate(s,c,p)?g=!0:e.componentWillUpdate&&e.componentWillUpdate(s,c,p),e.props=s,e.state=c,e.context=p),e.prevProps=e.prevState=e.prevContext=e.nextBase=null,e._dirty=!1,!g){i=e.render(s,c,p),e.getChildContext&&(p=u(u({},p),e.getChildContext())),m&&e.getSnapshotBeforeUpdate&&(C=e.getSnapshotBeforeUpdate(f,d));var S,w,U=i&&i.nodeName;if("function"==typeof U){var T=y(i);(l=b)&&l.constructor===U&&T.key==l.__key?E(l,T,1,p,!1):(S=l,e._component=l=L(U,T,p),l.nextBase=l.nextBase||_,l._parentComponent=e,E(l,T,0,p,!1),O(l,1,n,!0)),w=l.base}else a=h,(S=b)&&(a=e._component=null),(h||1===t)&&(a&&(a._component=null),w=P(a,i,p,n||!m,h&&h.parentNode,!0));if(h&&w!==h&&l!==b){var B=h.parentNode;B&&w!==B&&(B.replaceChild(w,h),S||(h._component=null,M(h,!1)))}if(S&&W(S),e.base=w,w&&!r){for(var j=e,D=e;D=D._parentComponent;)(j=D).base=w;w._component=j,w._componentConstructor=j.constructor}}for(!m||n?x.push(e):g||(e.componentDidUpdate&&e.componentDidUpdate(f,d,C),o.afterUpdate&&o.afterUpdate(e));e._renderCallbacks.length;)e._renderCallbacks.pop().call(e);N||r||k()}}function W(e){o.beforeUnmount&&o.beforeUnmount(e);var t=e.base;e._disable=!0,e.componentWillUnmount&&e.componentWillUnmount(),e.base=null;var n=e._component;n?W(n):t&&(null!=t.__preactattr_&&s(t.__preactattr_.ref,null),e.nextBase=t,b(t),B.push(e),T(t)),s(e.__ref,null)}function D(e,t){this._dirty=!0,this.context=t,this.props=e,this.state=this.state||{},this._renderCallbacks=[]}function V(e,t,n){return P(n,e,{},!1,t,!1)}function A(){return{}}u(D.prototype,{setState:function(e,t){this.prevState||(this.prevState=this.state),this.state=u(u({},this.state),"function"==typeof e?e(this.state,this.props):e),t&&this._renderCallbacks.push(t),v(this)},forceUpdate:function(e){e&&this._renderCallbacks.push(e),O(this,2)},render:function(){}});var H={h:a,createElement:a,cloneElement:p,createRef:A,Component:D,render:V,rerender:m,options:o};t.default=H}]);
//# sourceMappingURL=app.js.map