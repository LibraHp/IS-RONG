<template>
	<uni-section :title=title type="line">
		<uni-card :cover="cover" @click="onClick">
			<!-- <image slot='cover' style="width: 100%;" :src="cover"></image> -->
			<text class="uni-body">{{text}}</text>
			<view slot="actions" class="card-actions">
				<view class="card-actions-item" @click="actionsClick('暂无此功能')">
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
	</uni-section>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				cover: '/static/null.svg',
				text: "",
				title: ""
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
			actionsClick(text) {
				uni.showToast({
					title: text,
					icon: 'none'
				})
			}
		},
		onLoad: function (option) {
			console.log(option);
			this.title=option.title;
			var main = option.text;
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