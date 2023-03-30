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
				<img src="/static/music/last.svg" width="20" height="20" >
			</view>
			<view class="card-actions-item" @click="togglePlay()">
				<img :src="pause" width="20" height="20" >
			</view>
			<view class="card-actions-item" @click="nextTrack()">
				<img src="/static/music/next.svg" width="20" height="20" >
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
					  title: "粉色星球",
					  artist: "youngior",
					  source: "https://music.163.com/song/media/outer/url?id=1445556953.mp3",
					  cover: "https://p3.music.126.net/NwZ--QgLDbipDwMVYxDYeQ==/109951164960533856.jpg?param=300x300"
					},
					{
					  title: "你一笑便闪烁我整个宇宙",
					  artist: "陈亦云",
					  source: "https://music.163.com/song/media/outer/url?id=1832672806.mp3",
					  cover: "https://p3.music.126.net/psfmPdFQQGauEuJqfZIpTw==/109951165835964504.jpg?param=300x300"
					},
					{
						title: "哪里都是你",
						artist: "队长",
						cover: "https://p3.music.126.net/lnOnBbP_H-052Hv5ls-QjA==/109951162964628408.jpg?param=300x300",
						source: "https://music.163.com/song/media/outer/url?id=488249475.mp3",
					},
					{
						title: "爱丫爱丫",
						artist: "许66",
						cover: "https://p4.music.126.net/Zrf65912ZxBNKU4px83SRg==/109951167166626780.jpg?param=300x300",
						source: "https://music.163.com/song/media/outer/url?id=1928857203.mp3",
					},
					{
						title: "起风了",
						artist: "买辣椒也用券",
						cover: "https://p3.music.126.net/diGAyEmpymX8G7JcnElncQ==/109951163699673355.jpg?param=300x300",
						source: "https://music.163.com/song/media/outer/url?id=1330348068.mp3",
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
			innerAudioContext.onEnded(() => {
				setTimeout(()=>{
					this.nextTrack();
				},500)
			});
		},
		methods: {
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
/* 播放器样式 */
	.music-player {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 1000;
		padding: 10px;
		background-color: #fff;
		border-top: 1px solid #ccc;
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
	
	.no-border {
		border-width: 0;
	}
</style>