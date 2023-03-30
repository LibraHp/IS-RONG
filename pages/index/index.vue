<template>
	<view class="uni-margin-wrap">
		<swiper class="swiper" circular :indicator-dots="true" :autoplay="true" :interval="4000" :duration="800">
			<swiper-item class="bginfo" v-for="item in background" >
				<!-- <image :src="item" mode="aspectFit" ></image> -->
				<uni-card :cover="item"></uni-card>
			</swiper-item>
		</swiper>
	</view>
	<Weather/>
	<musicPlayer/>
    <view class="uni-padding-wrap">
		<uni-list  v-for="(item,index) in postList" :key="index">
			<uni-card :title="item.title" :sub-title="`${item.year}-${item.month}-${item.day}`" :extra="item.category" thumbnail="/static/love.svg" @click="onClick(item.title,item.text)">
				<text class="mainFont">{{getPostText(item.text)}}</text>
			</uni-card>
		</uni-list>
    </view>
</template>
<script>
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import Weather from "@/components/weather/weather.vue"
	import musicPlayer from "@/components/music/music.vue"
	const mainApi = "https://ehre.top/api/"
    export default {
        components: {uniList,uniListItem,Weather,musicPlayer},
        data() {
            return {
                postList: [],
				background: [],
				postText: '',
            };
        },
        onLoad() {
            this.getList();
			this.getMain();
        },
		onPullDownRefresh() {
			console.log("触发了下拉刷新"),
			setTimeout(()=>{
			this.getList();
			uni.stopPullDownRefresh();
			},2000)
		},
        methods: {
            async getList() {
				let data = {
					page: 1,
					pageSize: 100,
				}
                uni.request({
                    url: mainApi+"posts", 
                    method: 'get',
                    dataType: 'json',
					data: data,
                    success: (res) => {
                        console.log(res.data.data);
                        this.postList = res.data.data;
                    },
                });
				uni.showLoading({
					title: '加载中'
				});
				
				setTimeout(function () {
					uni.hideLoading();
				}, 2000);
            },
			onClick(title,text){
				uni.navigateTo({
				    url: '/pages/post/post?title='+title+'&text='+text
				});
			},
			async getMain() {
				uni.request({
					url: mainApi+"post?cid=170",
					method: 'get',
					dataType: 'json',
					success: (res) => {
						var main = res.data.data.text;
						var mainList = main.split(',');
						var flag = parseInt(mainList[0]);
						var musicUrl = mainList[1];
						this.background[0]=mainList[2];
						this.background[1]=mainList[3];
						this.background[2]=mainList[4];
						var tips = mainList[5];
						let version = parseInt(mainList[6]);
						this.putInfo(flag,tips,version);
						//this.playVoice(musicUrl);
					},
				})
			},
			getPostText(text){
				let main = text.split(';');
				let postText = "";
				if(main[1]==null){
					if(!main[0]){
						postText = "暂时没有简介了啦(●'◡'●)";
					}else{
						postText = main[0];
					}
				}else{
					postText = main[1];
				}
				return postText;
			},
			putInfo(flag,tips,version){
				switch(flag){
					case 1:
						uni.showModal({
							title: 'Tips',
							content: tips,
							showCancel: false,
							confirmText: 'OK！'
						})
						break;
					case 2:
						if((plus.runtime.version).split('.').join('')<version){
							uni.showModal({
								title: '有更新啦！',
								content: tips,
								showCancel: '取消',
								confirmText: '前往更新',
								success: function(res){
									if (res.confirm) {
										plus.runtime.openURL('https://github.com/LibraHp/IS-RONG/releases');
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							})
						}
						break;
				}
			},
		}
	}
</script>
<style>
	.uni-margin-wrap {
		width:690rpx;
		width: 100%;
	}
	.swiper {
		height: 550rpx;
	}
	.swiper-item {
		display: block;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
	}
	
	.swiper-list {
		margin-top: 40rpx;
		margin-bottom: 0;
	}
	
	.uni-common-mt{
		margin-top:60rpx;
		position:relative;
	}
	
	.info {
		position: absolute;
		right:20rpx;
	}
	
	.uni-padding-wrap {
	    width:100%;
	}
</style>