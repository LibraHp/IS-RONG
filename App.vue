<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@font-face {
	  font-family: "Alimama_DongFangDaKai_Regular";
	  font-weight: 400;
	  src: url("/static/font/Alimama_DongFangDaKai_Regular.woff") format("woff2"),
	  url("/static/font/Alimama_DongFangDaKai_Regular.woff2") format("woff");
	  font-display: swap;
	}
	.mainFont{
		font-family: Alimama_DongFangDaKai_Regular;
	}
</style>
