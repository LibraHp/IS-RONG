<template>
	<uni-card :title="playlist[currentTrackIndex].title" :sub-title="playlist[currentTrackIndex].artist" :thumbnail="playlist[currentTrackIndex].cover">
		<uni-collapse>
			<uni-collapse-item title="MUSICLIST" :show-animation="true" class="listImage">
				<uni-list v-for="(item,index) in playlist" :key="index">
					<uni-list-item :thumb="item.cover" :title="item.title" clickable @click="jumpTrack(index)"/>
				</uni-list>
			</uni-collapse-item>
		</uni-collapse>
		<view slot="actions" class="card-actions">
			<view class="card-actions-item" @click="prevTrack()">
				<image src="/static/music/last.svg" class="mainImage"></image>
			</view>
			<view class="card-actions-item" @click="togglePlay()">
				<image :src="pause" class="mainImage"></image>
			</view>
			<view class="card-actions-item" @click="nextTrack()">
				<image src="/static/music/next.svg" class="mainImage"></image>
			</view>
		</view>
	</uni-card>
</template>

<script>
	import uCollapseItem from "@/components/uni-collapse-item/uni-collapse-item.vue"
	import uCollapse from "@/components/uni-collapse/uni-collapse.vue"
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	const innerAudioContext = uni.createInnerAudioContext();
	innerAudioContext.autoplay = true;
	export default {
		components: {uCollapseItem,uCollapse,uniList,uniListItem},
		data() {
			return {
			// 播放列表
				playlist: [
					{
					      title: "起风了",
					      artist: "买辣椒也用券",
					      cover: "https://p3.music.126.net/diGAyEmpymX8G7JcnElncQ==/109951163699673355.jpg?param=300x300",
					      source: "https://music.163.com/song/media/outer/url?id=1330348068",
					     },
					     {
					      title: "Star",
					      artist: "XMASwu(吴骜)",
					      cover: "http://p1.music.126.net/6-F8k6AuCnsvMjDNKYHriw==/109951166677305699.jpg?param=130y130",
					      source: "https://music.163.com/song/media/outer/url?id=1899705498",
					}
				],
				// 当前歌曲的索引
				currentTrackIndex: 0,
				pause: '/static/music/pause.svg',
			};
		},
		mounted() {
			this.playCurrentTrack();
			this.getMusicList();
			innerAudioContext.onEnded(() => {
				setTimeout(()=>{
					this.nextTrack();
				},500)
			});
		},
		methods: {
			//获取音乐列表，存放倒playList中
			getMusicList(){
				uni.request({
					url:'https://ehre.top/api/getMusicList',
					method:'get',
					dataType:'json',
					success: (res) => {
						this.playlist=res.data.data;
						console.log(res.data);
					}
				})
			},
			//跳转到某一首歌曲
			jumpTrack(num){
				this.currentTrackIndex = num;
				this.playCurrentTrack();
			},
			// 切换到上一首歌曲
			prevTrack() {
				this.currentTrackIndex = (this.currentTrackIndex + this.playlist.length - 1) % this.playlist.length;
				this.playCurrentTrack();
			},
			// 切换到下一首歌曲
			nextTrack() {
				this.currentTrackIndex = (this.currentTrackIndex + 1) % this.playlist.length;
				this.playCurrentTrack();
			},
			// 播放或暂停当前歌曲
			togglePlay() {
				if (!innerAudioContext.paused) {
					innerAudioContext.pause();
				}else{
					innerAudioContext.play();
				}
			},
			// 播放当前歌曲
			playCurrentTrack() {
				innerAudioContext.src = this.playlist[this.currentTrackIndex].source;
				// innerAudioContext.load();
				innerAudioContext.play();
				innerAudioContext.onPause(() => {
					this.pause = '/static/music/pause.svg'
				});
				innerAudioContext.onPlay(() => {
					this.pause = '/static/music/play.svg'
				})
			},
		}
	};
</script>

<style>
	.mainImage{
		width: 25px;
		height: 25px;
	}
	
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
		flex-direction: column;
		align-items: center;
		margin: 8px;
	}
</style>