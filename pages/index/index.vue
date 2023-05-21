<template>
	<view class="appBody">
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular :indicator-dots="true" :autoplay="true" :interval="4000" :duration="800">
				<swiper-item class="bginfo" v-for="item in background" >
					<uni-card :cover="item"></uni-card>
				</swiper-item>
			</swiper>
		</view>
		<Weather/>
		<musicPlayer/>
		<view class="uni-padding-wrap">
			<uni-list  v-for="(item,index) in postList" :key="index" :border="false">
				<uni-card :title="item.title" :sub-title="`${item.year}-${item.month}-${item.day}`" :extra="item.category" thumbnail="/static/love.svg" @click="cardOnClick(item.title,item.text,item.cid)" margin="5px 20px">
					<text class="mainFont">{{getPostText(item.text)}}</text>
				</uni-card>
			</uni-list>
		</view>
		<p style="text-align: center;color: darkgrey;font-size: 10px">{{status}}</p>
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
                postList: [],//文章列表
				background: [],//首页轮播图
				page: 1 ,//页数
				pageFlag: true,
				status: "加载中..."
            };
        },
        onLoad() {
            this.getList(this.page);
			this.getMain();
			this.getIndexPic();
        },
		onPullDownRefresh() {
			console.log("触发了下拉刷新"),
			setTimeout(()=>{
			this.getList(this.page);
			uni.stopPullDownRefresh();
			},2000)
		},
		onReachBottom() {
		    console.log('触发了上拉加载');
			if(this.pageFlag){
				this.page++;
				this.getList(this.page);
			}else{
				console.log("没有更多啦！");
			}
		},
        methods: {
			//获取文章，将文章内容存放到postList中返回
            async getList(page) {
				let data = {
					page: page,
					pageSize: 10,
				}
                uni.request({
                    url: mainApi+"posts", 
                    method: 'get',
                    dataType: 'json',
					data: data,
                    success: (res) => {
                        this.postList = this.postList.concat(res.data.data);
						if((res.data.data).length<10){
							this.pageFlag=false;
							this.status="已经到底啦！";
						}
                    },
                });
            },
			//卡片列表单击事件，传入title和text到post界面，节省资源
			cardOnClick(title,text,cid){
				uni.navigateTo({
				    url: '/pages/post/post?title='+title+'&text='+text+'&cid='+cid
				});
			},
			//获取公告标志，内容，版本号，判断是否需要弹出公告或者是否需要更新
			async getMain() {
				uni.request({
					url: mainApi+"post?cid=170",
					method: 'get',
					dataType: 'json',
					success: (res) => {
						var main = res.data.data.text;
						var mainList = main.split(',');
						var flag = parseInt(mainList[0]);
						var tips = mainList[1];
						let version = parseInt(mainList[2]);
						let url = mainList[3];
						this.putInfo(flag,tips,version,url);
					},
				})
			},
			//获取文章缩略内容
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
			//获取首页轮播图，存放到background中
			getIndexPic(){
				uni.request({
					url: mainApi + "getIndexPic",
					method: 'get',
					dataType: 'json',
					success: (res) => {
						let main =res.data.data;
						this.background = main.split(';');
					}
				})
			},
			//弹窗，提示界面
			putInfo(flag,tips,version,url){
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
										plus.runtime.openURL(url);
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
	
	.appBody{
		margin: 5px 3px;
	}
</style>