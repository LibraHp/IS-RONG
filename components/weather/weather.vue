<template>
	<uni-card :title="city" :sub-title="`${weather} ${temp}℃`" extra="天气" :thumbnail="avatar" @click="getHitokoto()">
		<text class="mainFont">{{hitokoto}}</text>
	</uni-card>
</template>

<script>
	const key = "b28167004b73b3f2904a8f33d26fc324";//高德api获取到的key
	export default{
		data(){
			return{
				city:'',
				temp:'',
				weather:'',
				avatar:'',
				hitokoto: '',
				NewCity: ''
			}
		},
		mounted() {
			this.getCity();
			this.getHitokoto();
		},
		methods:{
			//获取一言
			getHitokoto(){
				uni.request({
					url:"https://v1.hitokoto.cn",
					method:'GET',
					dataType:'json',
					data:{
						c: 'd',
						encode: 'json',
					},
					success: (res) => {
						console.log(res.data);
						this.hitokoto=res.data.hitokoto;
					}
				})
			},
			//调用高德api获取ip所在城市
			async getCity(){
				let API = "https://restapi.amap.com/v3/ip";
				uni.request({
					url:API,
					method:'GET',
					dataType:'json',
					data:{
						key:key,
					},
					success: (res) => {
						let city = res.data.adcode;
						console.log(res.data);
						this.getWeather(city);
					}
				})
			},
			//获取天气，并根据索引显示天气图标
			async getWeather(city){
				let API = "https://restapi.amap.com/v3/weather/weatherInfo";
				uni.request({
					url:API,
					method:'GET',
					dataType:'json',
					data:{
						key:key,
						city:city,
					},
					success: (res) => {
						console.log(res);
						let main = res.data.lives[0];
						this.city = main.city;
						this.temp = main.temperature_float;
						this.weather = main.weather;
						switch(main.weather){
							case "晴":this.avatar="/static/weather/qing.svg";break;
							case "阴":this.avatar="/static/weather/ying.svg";break;
							case "小雨":this.avatar="/static/weather/xiaoyu.svg";break;
							case "小雪":this.avatar="/static/weather/xiaoxue.svg";break;
							case "大雨":this.avatar="/static/weather/dayu.svg";break;
							case "大雪":this.avatar="/static/weather/daxue.svg";break;
							case "暴雪":this.avatar="/static/weather/baoxue.svg";break;
							case "中雪":this.avatar="/static/weather/zhongxue.svg";break;
							case "中雨":this.avatar="/static/weather/zhongyu.svg";break;
							case "雨加雪":this.avatar="/static/weather/yujiaxue.svg";break;
							case "阵雨":this.avatar="/static/weather/zhenyu.svg";break;
							case "雾":this.avatar="/static/weather/wu.svg";break;
							case "暴雨":this.avatar="/static/weather/baoyu.svg";break;
							case "多云":this.avatar="/static/weather/duoyun.svg";break;
							case "大暴雨":this.avatar="/static/weather/dabaoyu.svg";break;
							case "冻雨":this.avatar="/static/weather/dongyu.svg";break;
							case "雷阵雨":this.avatar="/static/weather/leizhenyu.svg";break;
							case "特大暴雨":this.avatar="/static/weather/tedabaoyu.svg";break;
							case "霾":this.avatar="/static/weather/mai.svg";break;
							case "雷阵雨伴有冰雹":this.avatar="/static/weather/leizhenyubanyoubingbao.svg";break;
							default :this.avatar="/static/love.svg";break;
						}
					}
				})
			}
		}
	}
</script>

<style>
</style>