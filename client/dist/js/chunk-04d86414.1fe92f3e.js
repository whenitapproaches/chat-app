(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-04d86414"],{2429:function(e,t,a){},"24f0":function(e,t,a){},"26f3":function(e,t,a){"use strict";a("2c40")},"293a":function(e,t,a){"use strict";a.r(t);var c=a("7a23"),r={class:"chat main"},n={key:0,class:"columns is-gapless is-fullheight"},s={class:"column is-3"},i={class:"column"},o={key:1,class:"is-fullheight"};function u(e,t,a,u,b,l){var d=Object(c["z"])("TheChatList"),O=Object(c["z"])("TheChatBox"),j=Object(c["z"])("base-trans"),v=Object(c["z"])("TheUnauthorisedAlert");return Object(c["r"])(),Object(c["e"])("div",r,[u.isLoggedIn?(Object(c["r"])(),Object(c["e"])("div",n,[Object(c["g"])("div",s,[Object(c["g"])(d)]),Object(c["g"])("div",i,[Object(c["g"])(j,{appear:"",appearClass:"fadeInRight",enterClass:"fadeInRight",extraClass:"animate__faster"},{default:Object(c["K"])((function(){return[Object(c["L"])(Object(c["g"])(O,null,null,512),[[c["G"],u.currentPartnerUsername]])]})),_:1})])])):(Object(c["r"])(),Object(c["e"])("div",o,[Object(c["g"])(v)]))])}var b=Object(c["N"])("data-v-62f87b6b");Object(c["u"])("data-v-62f87b6b");var l={class:"chat-list"};Object(c["s"])();var d=b((function(e,t,a,r,n,s){var i=Object(c["z"])("TheChatListItem");return Object(c["r"])(),Object(c["e"])("ul",l,[(Object(c["r"])(!0),Object(c["e"])(c["a"],null,Object(c["x"])(r.recentContacts,(function(e){var t,a,r;return Object(c["r"])(),Object(c["e"])(i,{key:e._id,username:null===(t=e.partner)||void 0===t?void 0:t.username,displayName:null===(a=e.partner)||void 0===a?void 0:a.profile.displayName,recentMessageContent:e.content,createdAt:e.createdAt,userId:null===(r=e.partner)||void 0===r?void 0:r._id},null,8,["username","displayName","recentMessageContent","createdAt","userId"])})),128))])})),O=Object(c["N"])("data-v-e5490742");Object(c["u"])("data-v-e5490742");var j={class:"chat-list-item"},v={class:"columns is-gapless is-vcentered is-fullwidth"},g={class:"column is-narrow mr-4"},f={class:"column"},p={class:"chat-username"},h=Object(c["g"])("div",{class:"online"},null,-1),m={class:"chat-last-message"},w={class:"column is-narrow"},C={class:"chat-time"},y=Object(c["g"])("div",{class:"badge"},"5",-1);Object(c["s"])();var I=O((function(e,t,a,r,n,s){var i=Object(c["z"])("BaseAvatar"),o=Object(c["z"])("router-link");return Object(c["r"])(),Object(c["e"])("li",j,[Object(c["g"])(o,{to:{name:"Chat",params:{partnerUsername:a.username}},"exact-active-class":"is-active"},{default:O((function(){return[Object(c["g"])("div",v,[Object(c["g"])("div",g,[Object(c["g"])(i,{class:"is-large"})]),Object(c["g"])("div",f,[Object(c["g"])("div",p,[h,Object(c["f"])(" "+Object(c["B"])(a.displayName||a.username),1)]),Object(c["g"])("div",m,Object(c["B"])(a.recentMessageContent),1)]),Object(c["g"])("div",w,[Object(c["g"])("div",C,Object(c["B"])(r.timeFromNow),1),y])])]})),_:1},8,["to"])])})),M=a("4360"),_=a("c1df"),P=a.n(_),U=a("954b"),T={name:"TheChatListItem",props:{recentMessageContent:{type:String},username:{type:String,required:!0},displayName:{type:String,default:""},createdAt:{type:String},userId:{type:String}},setup:function(e){var t=Object(c["C"])(e),a=t.createdAt,r=Object(c["w"])(""),n=Object(M["b"])("Clock");Object(c["J"])((function(){var e=n.nowEveryMinute.value;r.value=P.a.utc(a.value).from(e)}));Object(U["c"])(),Object(M["b"])("Chat");return{timeFromNow:r}}};a("886c");T.render=I,T.__scopeId="data-v-e5490742";var N=T,k={components:{TheChatListItem:N},setup:function(){var e=Object(M["b"])("Chat"),t=e.fetchRecentContacts,a=e.recentContacts;return t({offset:0}),{recentContacts:a}}};a("f4fb");k.render=d,k.__scopeId="data-v-62f87b6b";var x=k,z=Object(c["N"])("data-v-30a3a4fd");Object(c["u"])("data-v-30a3a4fd");var A={class:"chat-box",ref:"root"},B={class:"chat-box-content"};Object(c["s"])();var S=z((function(e,t,a,r,n,s){var i=Object(c["z"])("TheChatBoxHeadbar"),o=Object(c["z"])("TheChatMessages"),u=Object(c["z"])("TheChatInput");return Object(c["r"])(),Object(c["e"])("div",A,[Object(c["g"])(i,{ref:"headbar"},null,512),Object(c["g"])("div",B,[Object(c["g"])(o,{style:{height:"".concat(r.messagesHeight,"px")}},null,8,["style"]),Object(c["g"])(u,{ref:"input"},null,512)])],512)})),D=Object(c["N"])("data-v-bd1a40b6");Object(c["u"])("data-v-bd1a40b6");var L={class:"chat-box-headbar"},H={class:"columns is-gapless"},F={class:"column is-narrow"},R={class:"partner"},E={class:"columns is-vcentered"},q={class:"column is-narrow"},J={class:"column"},Y={class:"partner-username"},$=Object(c["g"])("div",{class:"partner-status"},"Online",-1),K={class:"column is-narrow is-offset-auto"};Object(c["s"])();var G=D((function(e,t,a,r,n,s){var i=Object(c["z"])("BaseAvatar"),o=Object(c["z"])("TheChatBoxHeadbarToolbar");return Object(c["r"])(),Object(c["e"])("div",L,[Object(c["g"])("div",H,[Object(c["g"])("div",F,[Object(c["g"])("div",R,[Object(c["g"])("div",E,[Object(c["g"])("div",q,[Object(c["g"])(i,{class:"is-extra-large"})]),Object(c["g"])("div",J,[Object(c["g"])("div",Y,Object(c["B"])(r.currentPartnerUsername),1),$])])])]),Object(c["g"])("div",K,[Object(c["g"])(o)])])])})),V=Object(c["N"])("data-v-6b5db984");Object(c["u"])("data-v-6b5db984");var W={class:"toolbar"},Q={class:"call tool"},X={href:"#"},Z={class:"video-call tool"},ee={href:"#"},te={class:"info tool"},ae={href:"",class:"info-dropdown-toggler"},ce={class:"more tool"},re={href:"#"},ne=Object(c["g"])("p",{class:"ml-3"},"Remove conversation",-1);Object(c["s"])();var se=V((function(e,t,a,r,n,s){var i=Object(c["z"])("BaseIcon");return Object(c["r"])(),Object(c["e"])("div",W,[Object(c["g"])("div",Q,[Object(c["g"])("a",X,[Object(c["g"])(i,{class:"is-large",icon:"las la-phone"})])]),Object(c["g"])("div",Z,[Object(c["g"])("a",ee,[Object(c["g"])(i,{class:"is-large",icon:"las la-video"})])]),Object(c["g"])("div",te,[Object(c["g"])("a",ae,[Object(c["g"])(i,{class:"is-large",icon:"las la-info-circle"})])]),Object(c["g"])("div",ce,[Object(c["g"])("a",{href:"#",class:"more-dropdown-toggler",onClick:t[1]||(t[1]=Object(c["M"])((function(){return r.toggleMoreDropdown.apply(r,arguments)}),["prevent"]))},[Object(c["g"])(i,{class:"is-large",icon:"las la-ellipsis-v"})]),Object(c["g"])("ul",{class:["dropdown box",{"is-active":r.isMoreDropdownActive}]},[Object(c["g"])("li",null,[Object(c["g"])("a",re,[Object(c["g"])(i,{icon:"las la-trash"}),ne])])],2)])])})),ie={setup:function(){var e=Object(c["w"])(!1),t=function(){e.value=!e.value};return{isMoreDropdownActive:e,toggleMoreDropdown:t}}};a("ef31");ie.render=se,ie.__scopeId="data-v-6b5db984";var oe=ie,ue={components:{TheChatBoxHeadbarToolbar:oe},setup:function(){var e=Object(M["b"])("Chat"),t=e.currentPartnerUsername;return{currentPartnerUsername:t}}};a("4e97");ue.render=G,ue.__scopeId="data-v-bd1a40b6";var be=ue,le=Object(c["N"])("data-v-afe730a0");Object(c["u"])("data-v-afe730a0");var de={ref:"root",class:"chat-messages"};Object(c["s"])();var Oe=le((function(e,t,a,r,n,s){var i=Object(c["z"])("TheChatMessage"),o=Object(c["z"])("TheChatMessageSeparator"),u=Object(c["z"])("TheChatMessagesLoading");return Object(c["r"])(),Object(c["e"])("div",de,[(Object(c["r"])(!0),Object(c["e"])(c["a"],null,Object(c["x"])(r.messages,(function(e){return Object(c["r"])(),Object(c["e"])(i,{key:e._id,sender:e.senderId===r.currentUserId?"owner":"",content:e.content,createdAt:e.createdAt,isPending:e.isPending},null,8,["sender","content","createdAt","isPending"])})),128)),Object(c["g"])(o,{date:"Today"}),Object(c["g"])(u,{ref:"loadingElement"},null,512)],512)})),je=Object(c["N"])("data-v-8566abe2");Object(c["u"])("data-v-8566abe2");var ve={class:"content"};Object(c["s"])();var ge=je((function(e,t,a,r,n,s){return Object(c["r"])(),Object(c["e"])("div",{class:["chat-message",[a.sender,{"is-pending":a.isPending}]],title:r.formattedDate},[Object(c["g"])("p",ve,Object(c["B"])(a.content),1)],10,["title"])})),fe={props:{sender:{type:String,required:!0},content:{type:String,required:!0},createdAt:{type:String},isPending:{type:Boolean}},setup:function(e){var t=Object(c["C"])(e),a=t.createdAt,r=P.a.utc(a.value).local().format("HH:mm:ss DD/MM/YYYY");return{formattedDate:r}}};a("cc29");fe.render=ge,fe.__scopeId="data-v-8566abe2";var pe=fe,he=Object(c["N"])("data-v-4dee22ce");Object(c["u"])("data-v-4dee22ce");var me={class:"separator"};Object(c["s"])();var we=he((function(e,t,a,r,n,s){return Object(c["r"])(),Object(c["e"])("div",me,Object(c["B"])(a.date),1)})),Ce={props:{date:{type:String,required:!0}},setup:function(e){}};a("86dd");Ce.render=we,Ce.__scopeId="data-v-4dee22ce";var ye=Ce,Ie=Object(c["N"])("data-v-ab11af3c"),Me=Ie((function(e,t,a,r,n,s){var i=Object(c["z"])("BaseIcon");return Object(c["r"])(),Object(c["e"])("div",{class:["chat-messages-loader",{"is-active":r.isFetchingNewMessages}]},[Object(c["g"])(i,{class:"loading-icon",icon:"las la-spinner"})],2)})),_e={setup:function(){var e=Object(M["b"])("Chat"),t=e.currentPartnerUsername,a=e.conversations,r=Object(c["c"])((function(){var e=a[t.value];if(e)return e.isFetchingNewMessages}));return{isFetchingNewMessages:r}}};a("a457");_e.render=Me,_e.__scopeId="data-v-ab11af3c";var Pe=_e;a("a4d3"),a("4de4"),a("4160"),a("e439"),a("dbb4"),a("b64b"),a("159b");function Ue(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function Te(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);t&&(c=c.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,c)}return a}function Ne(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?Te(Object(a),!0).forEach((function(t){Ue(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):Te(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var ke=a("09c5");function xe(){var e=Object(M["b"])("Chat"),t=Object(M["b"])("User");ke["a"].getSocket().off("sent-message"),ke["a"].getSocket().on("sent-message",(function(t){var a=t.partnerUserId,c=t.createdAt,r=t.messageClientId,n=t._id;e.updateMessage({messageClientId:r,_id:n,partnerUserId:a,createdAt:c})})),ke["a"].getSocket().on("received-message",(function(a){var c=Object.assign({},a),r=t.currentUser._id;e.createMessage(Ne(Ne({},c),{},{isPending:!1,currentUserId:r}))}))}a("96cf");var ze=a("1da1"),Ae=function(e,t){var a={root:e.value,rootMargin:"0px",threshold:0},c=Object(M["b"])("Chat"),r=function(e,t){e.forEach(function(){var e=Object(ze["a"])(regeneratorRuntime.mark((function e(t){var a,r,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.isIntersecting){e.next=11;break}if(a=c.currentPartnerUsername,r=c.conversations,n=r[a.value],n){e.next=5;break}return e.abrupt("return");case 5:if(!n.isFetchingNewMessages&&!n.isFullLoaded){e.next=7;break}return e.abrupt("return");case 7:return n.isFetchingNewMessages=!0,e.next=10,c.fetchNewMessages(a.value);case 10:n.isFetchingNewMessages=!1;case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},n=new IntersectionObserver(r,a);n.observe(t.value.$el)},Be={components:{TheChatMessage:pe,TheChatMessageSeparator:ye,TheChatMessagesLoading:Pe},setup:function(){var e=Object(M["b"])("Chat"),t=e.currentPartnerUsername,a=e.conversations,r=Object(M["b"])("User"),n=r.currentUser._id;xe();var s=Object(c["w"])(null),i=Object(c["w"])(null);Object(c["o"])((function(){Ae(s,i)}));var o=Object(c["c"])((function(){if(a[t.value])return a[t.value].messages}));return{currentUserId:n,currentPartnerUsername:t,root:s,loadingElement:i,messages:o}}};a("26f3");Be.render=Oe,Be.__scopeId="data-v-afe730a0";var Se=Be,De={class:"chat-input"},Le={class:"columns is-vcentered is-fullwidth is-gapless"},He={class:"column is-narrow"},Fe={class:"toolbar"},Re={class:"photo-video tool"},Ee={class:"file tool"},qe={class:"column"},Je={class:"input-wrapper"},Ye={class:"column is-narrow"},$e={class:"toolbar pr-4"},Ke={href:"#",class:"emoji tool"},Ge={class:"column is-narrow"};function Ve(e,t,a,r,n,s){var i=Object(c["z"])("BaseIcon");return Object(c["r"])(),Object(c["e"])("div",De,[Object(c["g"])("div",Le,[Object(c["g"])("div",He,[Object(c["g"])("div",Fe,[Object(c["g"])("a",Re,[Object(c["g"])(i,{class:"is-medium",icon:"las la-photo-video"})]),Object(c["g"])("a",Ee,[Object(c["g"])(i,{class:"is-medium",icon:"las la-paperclip"})])])]),Object(c["g"])("div",qe,[Object(c["g"])("div",Je,[Object(c["g"])("form",{onSubmit:t[2]||(t[2]=Object(c["M"])((function(){return r.sendMessage.apply(r,arguments)}),["prevent"]))},[Object(c["L"])(Object(c["g"])("input",{"onUpdate:modelValue":t[1]||(t[1]=function(e){return r.messageContent=e}),class:"message-input input",type:"text",placeholder:"Write your message here..."},null,512),[[c["F"],r.messageContent]])],32)])]),Object(c["g"])("div",Ye,[Object(c["g"])("div",$e,[Object(c["g"])("a",Ke,[Object(c["g"])(i,{class:"is-medium",icon:"las la-smile-beam"})])])]),Object(c["g"])("div",Ge,[Object(c["g"])("a",{onClick:t[3]||(t[3]=Object(c["M"])((function(){return r.sendMessage.apply(r,arguments)}),["prevent"])),class:"is-circle send-button"},[Object(c["g"])(i,{icon:"las la-paper-plane"})])])])])}var We=a("2ef0"),Qe={setup:function(){var e=Object(c["w"])(""),t=Object(M["b"])("Chat"),a=t.conversations,r=t.createNewMessage,n=Object(M["b"])("User"),s=function(){var c=t.currentPartnerUsername,s=n.currentUser.token.value,i=c,o=Object(We["find"])(a,{username:i})._id,u=n.currentUser._id.value,b={content:e.value,senderId:u,receiverId:o,createdAt:P()().format()};r(Ne(Ne({},b),{},{currentUserId:u}));ke["a"].sendMessage({token:s,to:o,content:e.value,messageClientId:messageClientId}),e.value=""};return{sendMessage:s,messageContent:e}}};a("59ed");Qe.render=Ve;var Xe=Qe;function Ze(e,t,a){if(e.value){var c=e.value.clientHeight,r=t.value.$el.clientHeight,n=a.value.$el.clientHeight,s=c-r-n;return s}}var et={components:{TheChatBoxHeadbar:be,TheChatMessages:Se,TheChatInput:Xe},setup:function(){var e=Object(c["w"])(null),t=Object(c["w"])(null),a=Object(c["w"])(null),r=Object(c["w"])(0);function n(){r.value=Ze(e,t,a)}return window.addEventListener("resize",n),Object(c["o"])(n),Object(c["q"])(n),{headbar:t,input:a,root:e,messagesHeight:r}}};a("8b04");et.render=S,et.__scopeId="data-v-30a3a4fd";var tt=et,at=a("866e"),ct={components:{TheChatList:x,TheChatBox:tt,TheUnauthorisedAlert:at["a"]},setup:function(){var e=Object(M["b"])("User"),t=e.isLoggedIn,a=Object(U["c"])(),r=Object(M["b"])("Chat"),n=r.updateCurrentPartnerByRoute,s=r.currentPartnerUsername;return Object(c["J"])((function(){var e=a.currentRoute.value.params.partnerUsername;e&&n(e)})),{isLoggedIn:t,currentPartnerUsername:s}}};a("aecd");ct.render=u;t["default"]=ct},"2c40":function(e,t,a){},"3a8f":function(e,t,a){},"3d92":function(e,t,a){},"4de4":function(e,t,a){"use strict";var c=a("23e7"),r=a("b727").filter,n=a("1dde"),s=a("ae40"),i=n("filter"),o=s("filter");c({target:"Array",proto:!0,forced:!i||!o},{filter:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}})},"4e97":function(e,t,a){"use strict";a("24f0")},"59ed":function(e,t,a){"use strict";a("bd3c")},"5e9e":function(e,t,a){},8392:function(e,t,a){},"866e":function(e,t,a){"use strict";var c=a("7a23"),r=Object(c["f"])("Please "),n=Object(c["f"])("login"),s=Object(c["f"])(" to continue");function i(e,t,a,i,o,u){var b=Object(c["z"])("router-link");return Object(c["r"])(),Object(c["e"])("p",null,[r,Object(c["g"])(b,{to:{name:"Home"}},{default:Object(c["K"])((function(){return[n]})),_:1}),s])}var o={};a("f050");o.render=i;t["a"]=o},"86dd":function(e,t,a){"use strict";a("2429")},"886c":function(e,t,a){"use strict";a("3d92")},"8b04":function(e,t,a){"use strict";a("8392")},a457:function(e,t,a){"use strict";a("c170")},aecd:function(e,t,a){"use strict";a("be1c")},b64b:function(e,t,a){var c=a("23e7"),r=a("7b0b"),n=a("df75"),s=a("d039"),i=s((function(){n(1)}));c({target:"Object",stat:!0,forced:i},{keys:function(e){return n(r(e))}})},bd3c:function(e,t,a){},be1c:function(e,t,a){},c170:function(e,t,a){},cc29:function(e,t,a){"use strict";a("5e9e")},cc70:function(e,t,a){},dbb4:function(e,t,a){var c=a("23e7"),r=a("83ab"),n=a("56ef"),s=a("fc6a"),i=a("06cf"),o=a("8418");c({target:"Object",stat:!0,sham:!r},{getOwnPropertyDescriptors:function(e){var t,a,c=s(e),r=i.f,u=n(c),b={},l=0;while(u.length>l)a=r(c,t=u[l++]),void 0!==a&&o(b,t,a);return b}})},e439:function(e,t,a){var c=a("23e7"),r=a("d039"),n=a("fc6a"),s=a("06cf").f,i=a("83ab"),o=r((function(){s(1)})),u=!i||o;c({target:"Object",stat:!0,forced:u,sham:!i},{getOwnPropertyDescriptor:function(e,t){return s(n(e),t)}})},ef31:function(e,t,a){"use strict";a("3a8f")},f050:function(e,t,a){"use strict";a("f54b")},f4fb:function(e,t,a){"use strict";a("cc70")},f54b:function(e,t,a){}}]);
//# sourceMappingURL=chunk-04d86414.1fe92f3e.js.map