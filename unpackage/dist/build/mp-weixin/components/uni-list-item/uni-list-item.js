"use strict";const t=require("../../common/vendor.js"),e={name:"UniListItem",emits:["click","switchChange"],props:{direction:{type:String,default:"row"},title:{type:String,default:""},note:{type:String,default:""},ellipsis:{type:[Number,String],default:0},disabled:{type:[Boolean,String],default:!1},clickable:{type:Boolean,default:!1},showArrow:{type:[Boolean,String],default:!1},link:{type:[Boolean,String],default:!1},to:{type:String,default:""},showBadge:{type:[Boolean,String],default:!1},showSwitch:{type:[Boolean,String],default:!1},switchChecked:{type:[Boolean,String],default:!1},badgeText:{type:String,default:""},badgeType:{type:String,default:"success"},badgeStyle:{type:Object,default:()=>({})},rightText:{type:String,default:""},thumb:{type:String,default:""},thumbSize:{type:String,default:"base"},showExtraIcon:{type:[Boolean,String],default:!1},extraIcon:{type:Object,default:()=>({type:"",color:"#000000",size:20,customPrefix:""})},border:{type:Boolean,default:!0},customStyle:{type:Object,default:()=>({padding:"",backgroundColor:"#FFFFFF"})},keepScrollPosition:{type:Boolean,default:!1}},watch:{"customStyle.padding":{handler(t){"number"==typeof t&&(t+="");let e=t.split(" ");1===e.length?this.padding={top:t,right:t,bottom:t,left:t}:2===e.length?this.padding={top:t[0],right:t[1],bottom:t[0],left:t[1]}:4===e.length&&(this.padding={top:t[0],right:t[1],bottom:t[2],left:t[3]})},immediate:!0}},data:()=>({isFirstChild:!1,padding:{top:"",right:"",bottom:"",left:""}}),mounted(){this.list=this.getForm(),this.list&&(this.list.firstChildAppend||(this.list.firstChildAppend=!0,this.isFirstChild=!0))},methods:{getForm(t="uniList"){let e=this.$parent,i=e.$options.name;for(;i!==t;){if(e=e.$parent,!e)return!1;i=e.$options.name}return e},onClick(){""===this.to?(this.clickable||this.link)&&this.$emit("click",{data:{}}):this.openPage()},onSwitchChange(t){this.$emit("switchChange",t.detail)},openPage(){-1!==["navigateTo","redirectTo","reLaunch","switchTab"].indexOf(this.link)?this.pageApi(this.link):this.pageApi("navigateTo")},pageApi(e){let i={url:this.to,success:t=>{this.$emit("click",{data:t})},fail:t=>{this.$emit("click",{data:t})}};switch(e){case"navigateTo":default:t.index.navigateTo(i);break;case"redirectTo":t.index.redirectTo(i);break;case"reLaunch":t.index.reLaunch(i);break;case"switchTab":t.index.switchTab(i)}}}};if(!Array){(t.resolveComponent("uni-icons")+t.resolveComponent("uni-badge"))()}Math||((()=>"../uni-icons/uni-icons.js")+(()=>"../uni-badge/uni-badge.js"))();const i=t._export_sfc(e,[["render",function(e,i,o,n,a,s){return t.e({a:!a.isFirstChild},a.isFirstChild?{}:{b:o.border?1:""},{c:o.thumb},o.thumb?{d:o.thumb,e:t.n("uni-list--"+o.thumbSize)}:o.showExtraIcon?{g:t.p({customPrefix:o.extraIcon.customPrefix,color:o.extraIcon.color,size:o.extraIcon.size,type:o.extraIcon.type})}:{},{f:o.showExtraIcon,h:o.title},o.title?{i:t.t(o.title),j:t.n(0!==o.ellipsis&&o.ellipsis<=2?"uni-ellipsis-"+o.ellipsis:"")}:{},{k:o.note},o.note?{l:t.t(o.note)}:{},{m:o.thumb||o.showExtraIcon||o.showBadge||o.showSwitch?1:"",n:o.rightText||o.showBadge||o.showSwitch},o.rightText||o.showBadge||o.showSwitch?t.e({o:o.rightText},o.rightText?{p:t.t(o.rightText)}:{},{q:o.showBadge},o.showBadge?{r:t.p({type:o.badgeType,text:o.badgeText,"custom-style":o.badgeStyle})}:{},{s:o.showSwitch},o.showSwitch?{t:o.disabled,v:o.switchChecked,w:t.o(((...t)=>s.onSwitchChange&&s.onSwitchChange(...t)))}:{},{x:"column"===o.direction?1:""}):{},{y:o.showArrow||o.link?1:"",z:"column"===o.direction?1:"",A:a.padding.top,B:a.padding.left,C:a.padding.right,D:a.padding.bottom,E:o.showArrow||o.link},o.showArrow||o.link?{F:t.p({size:16,color:"#bbb",type:"arrowright"})}:{},{G:o.disabled?1:"",H:o.customStyle.backgroundColor,I:!o.clickable&&!o.link||o.disabled||o.showSwitch?"":"uni-list-item--hover",J:t.o(((...t)=>s.onClick&&s.onClick(...t)))})}]]);wx.createComponent(i);
