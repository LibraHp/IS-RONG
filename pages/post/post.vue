<template>
	<uni-section :title=title type="line">
		<uni-card :cover="cover" @click="onClick">
			<text class="uni-body">{{text}}</text>
			<view slot="actions" class="card-actions">
				<view class="card-actions-item" @click="actionsClick('未设置微信openid')">
					<uni-icons type="redo" size="18" color="#999"></uni-icons>
					<text class="card-actions-item-text">分享</text>
				</view>
				<view class="card-actions-item" @click="actionsClick('点赞成功')">
					<uni-icons type="heart" size="18" color="#999"></uni-icons>
					<text class="card-actions-item-text">点赞</text>
				</view>
				<view class="card-actions-item" @click="actionsClick('暂无此功能')">
					<uni-icons type="chatbubble" size="18" color="#999"></uni-icons>
					<text class="card-actions-item-text">评论</text>
				</view>
			</view>
		</uni-card>
		<uni-card title="评论" margin="5px 20px" spacing="5px 10px 20px 10px">
			<uni-card v-for="(item,index) in commentsList" :key="index" v-if="commentsFlag" :title="item.author" :isFull="true" :sub-title="timestampToDate(item.created)" :thumbnail="getAvatar(item.mail)" :border="false">
				<text class="uni-body">{{item.text}}</text>
			</uni-card>
			<text v-else>暂时没有评论喔!</text>
		</uni-card>
		<p style="text-align: center;color: darkgrey;">已经到底啦！</p>
	</uni-section>
</template>

<script>
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	export default {
		components: {},
		data() {
			return {
				cover: '/static/null.svg',
				text: "",
				title: "",
				cid: "",
				commentsList: [],
				commentsFlag: true
			}
		},
		onPullDownRefresh() {
			console.log("触发了下拉刷新"),
			setTimeout(()=>{
			uni.stopPullDownRefresh();
			},2000)
		},
		methods: {
			onClick(e) {
				console.log(e)
			},
/* 			sharePost(cid,title,text,cover){
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 0,
					href: "https://ehre.top/Small-incidents/"+cid+".html",
					title: "是小荣吖！"+title,
					summary: text,
					imageUrl: cover,
					success: function (res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function (err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			}, */
			actionsClick(text) {
				uni.showToast({
					title: text,
					icon: 'none'
				})
			},
			getCommentsList(cid){
				uni.request({
					url:'https://ehre.top/api/getComments',
					method:'get',
					dataType:'json',
					data:{cid:cid},
					success: (res) => {
						if(res.data.data!=0){
							this.commentsList=res.data.data;
						}else{
							this.commentsFlag=false;
						}
					}
				})
			},
			timestampToDate(timestamp) {
			  var date = new Date(timestamp * 1000);
			  var year = date.getFullYear();
			  var month = ("0" + (date.getMonth() + 1)).slice(-2);
			  var day = ("0" + date.getDate()).slice(-2);
			  var hours = ("0" + date.getHours()).slice(-2);
			  var minutes = ("0" + date.getMinutes()).slice(-2);
			  var seconds = ("0" + date.getSeconds()).slice(-2);
			  var formattedDate = year + "年" + month + "月" + day + "日";
			  var formattedTime = hours + ":" + minutes + ":" + seconds;
			  return formattedDate + " " + formattedTime;
			},
			getAvatar(email){
				var atIndex = email.indexOf("@");
				var qq =  email.substring(0, atIndex);
				var avatar = "http://q1.qlogo.cn/g?b=qq&nk=" + qq + "&s=100";
				return avatar;
			}
		},
		onLoad: function (option) {
			console.log(option);
			this.title = option.title;
			var main = option.text;
			this.getCommentsList(option.cid);
			var mainList = main.split(';');
			this.text=mainList[1];
			this.cover=mainList[2];
			if(mainList[2]==null){
				this.cover="/static/null.svg";
				this.text=mainList[0];
			}
		}
	}
</script>

<style>
	.card-actions {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		height: 45px;
		border-top: 1px #eee solid;
	}
	
	.card-actions-item {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	
	.card-actions-item-text {
		font-size: 12px;
		color: #666;
		margin-left: 5px;
	}
	
	.no-border {
		border-width: 0;
	}
</style>