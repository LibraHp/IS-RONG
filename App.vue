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
		},
		methods: {
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
