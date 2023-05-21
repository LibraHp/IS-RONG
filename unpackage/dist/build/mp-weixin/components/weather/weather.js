"use strict";const a=require("../../common/vendor.js"),t="b28167004b73b3f2904a8f33d26fc324",e={data:()=>({city:"",temp:"",weather:"",avatar:"",hitokoto:"",NewCity:""}),mounted(){this.getCity(),this.getHitokoto()},methods:{getHitokoto(){a.index.request({url:"https://v1.hitokoto.cn",method:"GET",dataType:"json",data:{c:"h",c:"f",encode:"json"},success:a=>{console.log(a.data),this.hitokoto=a.data.hitokoto}})},async getCity(){a.index.request({url:"https://restapi.amap.com/v3/ip",method:"GET",dataType:"json",data:{key:t},success:a=>{let t=a.data.adcode;console.log(a.data),this.getWeather(t)}})},async getWeather(e){a.index.request({url:"https://restapi.amap.com/v3/weather/weatherInfo",method:"GET",dataType:"json",data:{key:t,city:e},success:a=>{console.log(a);let t=a.data.lives[0];switch(this.city=t.city,this.temp=t.temperature_float,this.weather=t.weather,t.weather){case"晴":this.avatar="/static/weather/qing.svg";break;case"阴":this.avatar="/static/weather/ying.svg";break;case"小雨":this.avatar="/static/weather/xiaoyu.svg";break;case"小雪":this.avatar="/static/weather/xiaoxue.svg";break;case"大雨":this.avatar="/static/weather/dayu.svg";break;case"大雪":this.avatar="/static/weather/daxue.svg";break;case"暴雪":this.avatar="/static/weather/baoxue.svg";break;case"中雪":this.avatar="/static/weather/zhongxue.svg";break;case"中雨":this.avatar="/static/weather/zhongyu.svg";break;case"雨加雪":this.avatar="/static/weather/yujiaxue.svg";break;case"阵雨":this.avatar="/static/weather/zhenyu.svg";break;case"雾":this.avatar="/static/weather/wu.svg";break;case"暴雨":this.avatar="/static/weather/baoyu.svg";break;case"多云":this.avatar="/static/weather/duoyun.svg";break;case"大暴雨":this.avatar="/static/weather/dabaoyu.svg";break;case"冻雨":this.avatar="/static/weather/dongyu.svg";break;case"雷阵雨":this.avatar="/static/weather/leizhenyu.svg";break;case"特大暴雨":this.avatar="/static/weather/tedabaoyu.svg";break;case"霾":this.avatar="/static/weather/mai.svg";break;case"雷阵雨伴有冰雹":this.avatar="/static/weather/leizhenyubanyoubingbao.svg";break;default:this.avatar="/static/love.svg"}}})}}};if(!Array){a.resolveComponent("uni-card")()}Math;const s=a._export_sfc(e,[["render",function(t,e,s,r,i,h){return{a:a.t(i.hitokoto),b:a.o((a=>h.getHitokoto())),c:a.p({title:i.city,"sub-title":`${i.weather} ${i.temp}℃`,extra:"天气",thumbnail:i.avatar})}}]]);wx.createComponent(s);
