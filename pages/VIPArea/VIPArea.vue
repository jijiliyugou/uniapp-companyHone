<template>
	<view class="wrapBox">
		<view class="swiperBox">
			<u-swiper :list="banners" height="346" border-radius="0" mode="none"></u-swiper>
		</view>
		<view class="floor" v-for="(floor, index) in floorList">
			<view class="title">{{ floor.name }}</view>
			<view class="floorItemsWrap">
				<view class="itemBox" v-for="(item, i) in floor.items" :key="i" @click="toArea({pCode: floor.code, code: item.code, name: item.name})">
					<view class="leftImg">
						<u-image width="70rpx" height="70rpx" :src="item.icon"></u-image>
					</view>
					<view class="rightName">
						{{ item.name }}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				banners: [],
				floorList: [
					{
						title: '地域专区',
						children: [
							{
								name: '中国区',
								img: require('@/static/images/zhongguoqu.png')
							},
							{
								name: '英国区',
								img: require('@/static/images/yingguoqu.png')
							},
							{
								name: '美国区',
								img: require('@/static/images/meiguoqu.png')
							},
							{
								name: '非洲区',
								img: require('@/static/images/feizhouqu.png')
							},
							{
								name: '北美区',
								img: require('@/static/images/beimeiqu.png')
							},
							{
								name: '南美区',
								img: require('@/static/images/nanmeiqu.png')
							}
						]
					},
					{
						title: '品牌专区',
						children: [
							{
								name: '澄海同益科技 有限公司',
								img: require('@/static/images/zhongguoqu.png')
							},
							{
								name: '澄海同益科技 有限公司',
								img: require('@/static/images/yingguoqu.png')
							},
							{
								name: '光禾玩具',
								img: require('@/static/images/meiguoqu.png')
							},
							{
								name: '海马云科技',
								img: require('@/static/images/feizhouqu.png')
							},
							{
								name: '澄宝玩具',
								img: require('@/static/images/beimeiqu.png')
							},
							{
								name: '同益科技',
								img: require('@/static/images/nanmeiqu.png')
							}
						]
					}
				],
				list: [{
						image: require('@/static/images/vipBanner.png'),
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],
			};
		},
		onLoad() {
			// await this.getToken()
			this.getVipRegions()
		},
		mounted() {
			// #ifndef APP-PLUS
			window.appEvent = this.appEvent;
			// #endif
		},
		methods: {
			// 初始化获取app的购物车信息
			appEvent (option) {
				const appValue = JSON.parse(option)
				this.num = appValue.length
				console.log(appValue);
				this.$u.vuex('vuexAppValue', appValue)
				uni.showModal({
					title: '收到App传递过来的参数',
					content: option
				});
			},
			// 点击了某专区
			toArea(item) {
				uni.navigateTo({
					url: '/pages/regionComponent/regionComponent' + this.$u.queryParams(item)
				})
			},
			// 获取token
			async getToken() {
				const res = await this.$u.api.getToken({
				  companyNum: 'LittleBearWeb',
				  platForm: 'PC'
				})
				this.$u.vuex('Utoken', res.result.item)
			},
			// 获取vip专区首页数据
			async getVipRegions() {
				const res = await this.$u.api.getVipRegions({})
				if(res.result.code === 200){
					this.banners = res.result.item.images
					this.floorList = res.result.item.vipRegionItem
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.wrapBox{
	min-height: 100vh;
	position: relative;
	background: #F5F5F5;
	.swiperBox {
		width: 100%;
		height: 346rpx;
	}
	.floor{
		padding: 0 30rpx;
		box-sizing: border-box;
		.title{
			color: #333333;
			font-weight: bold;
			padding: 24rpx 0 28rpx 0;
			font-size: 32rpx;
			position: relative;
			text-indent: 17rpx;
			&::before{
				content: '';
				display: block;
				position: absolute;
				width: 6rpx;
				height: 32rpx;
				top: 50%;
				background-color: #7801D2;
				transform: translate(-50%, -60%);
			}
		}
		.floorItemsWrap{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			.itemBox{
				width: 334rpx;
				height: 140rpx;
				background-color: #fff;
				margin-bottom: 20rpx;
				&:nth-last-child(1){
					margin-bottom: 0;
				}
				&:nth-last-child(2){
					margin-bottom: 0;
				}
				display: flex;
				.leftImg{
					width: 140rpx;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.rightName{
					display: flex;
					flex: 1;
					align-items: center;
				}
			}
		}
	}
}
</style>
