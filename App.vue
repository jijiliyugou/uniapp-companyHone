<script>
	export default {
		globalData: {
			Utoken: ''
		},
		// 这里需要注意的是，如果我们需要在App.vue中使用userName
		// 使用getApp().globalData.userName是不行，因为此时getApp()尚未生成
		// 1. 非V3模式，可以通过this.$scope.globalData获取
		// 2. V3模式，可以通过getApp({allowDefault: true}).globalData获取
		// 详见uni-app文档：https://uniapp.dcloud.io/collocation/frame/window?id=getapp
		onLaunch() {}
	}
</script>

<style lang="scss">
	@import "@/static/iconfont/iconfont.css";
	@import "uview-ui/index.scss";
	/*每个页面公共css */
</style>
