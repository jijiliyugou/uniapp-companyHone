<template>
	<view class="wrapBox">
		<view class="bannerImgBox">
			<u-swiper :list="swiperList" width="760" :border-radius="0" bg-color="#E2343A" height="547" mode="none"></u-swiper>
		</view>
		<view class="videoBox">
			<view class="videoBgBox">
				<view class="videoBg">
					<video id="myVideo" :src="bannerVideo" poster="" controlsList="nodownload" webkit-playsinline="true" x5-video-orientation="portraint" preload="auto" x-webkit-airplay="true" x5-video-player-fullscreen="true" x5-video-player-type="h5-page" object-fit="contain" controls
					@error="videoErrorCallback">
					</video>
				</view>
			</view>
		</view>
		<view class="floorWrap" v-if="newProductList[0]">
			<view class="titleBox">
				<view class="line"></view>
				<view class="title">{{ newProductList[0].name }}</view>
				<view class="line"></view>
			</view>
			<view class="floorItems">
				<view class="itemBox" v-for="(item, i) in newProductList[0].items" :key="i">
					<view class="leftImg">
						<u-image width="284rpx" height="189rpx" :src="item.img || '@/static/images/cheche.png'"></u-image>
					</view>
					<view class="contextRingth">
						<view class="textBox">
							<view class="textItem name">
								{{ item.name }}
							</view>
							<view class="textItem priceBox">
								参考单价：<view class="price">{{ item.cu_de }}{{ item.price.toFixed(2) }}</view>
							</view>
							<view class="textItem numberBox">
								出厂货号：<view class="number">{{ item.fa_no }}</view>
							</view>
							<view class="textItem specsBox">
								产品规格：<view class="specs">{{item.pr_le}}X{{item.pr_wi}}X{{item.pr_hi}}(CM)</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="floorWrap" v-if="newProductList[1]">
			<view class="titleBox">
				<view class="line"></view>
				<view class="title">{{ newProductList[1].name }}</view>
				<view class="line"></view>
			</view>
			<view class="floorItemsTwo">
				<view class="itemBox" v-for="(item, i) in newProductList[1].items" :key="i">
					<view class="imgBox">
						<u-image width="270rpx" height="187rpx" :src="item.img || '@/static/images/cheche.png'"></u-image>
					</view>
					<view class="conTextBox">
						<view class="textItem name">
							{{ item.name }}
						</view>
						<view class="textItem priceBox">
							参考单价：<view class="price">{{ item.cu_de }} {{ item.price.toFixed(2) }}</view>
						</view>
						<view class="textItem numberBox">
							出厂货号：<view class="number">{{ item.fa_no }}</view>
						</view>
						<view class="textItem specsBox">
							产品规格：<view class="specs">{{item.pr_le}}X{{item.pr_wi}}X{{item.pr_hi}}(CM)</view>
						</view>
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
				bannerVideo: '',
				swiperList: [],
				newProductList: []
			};
		},
		onLoad() {
			// await this.getToken()
			const str = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJMaXR0bGVCZWFyIiwianRpIjoiNGJiNmE5Y2QtNTdiOC00ZWI0LWJhOWMtN2NiNWI3NmExMTBjIiwiaWF0IjoxNjExMTE1Mjg5LCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTM2ODAzOTg0NzgiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zeXN0ZW0iOiJpT1MiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIxYzdjYzY5Ni04YjA5LTQwNTEtODU2MS02ZGRiZjBiOTgzZWMiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zcG4iOiIyNWUyMGNlMy1lNzMzLTRkYTAtODc3NS02ZThlZDJiZjE2MDUiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9hbm9ueW1vdXMiOiJIUzAwMjEzNDYiLCJuYmYiOjE2MTExMTUyODksImV4cCI6MTYxMTIwMTY4OSwiaXNzIjoiTGl0dGxlQmVhciIsImF1ZCI6IkxpdHRsZUJlYXIifQ.iuteHWV5uXVgiHeIzao2tYGecEUBfPjkhazHINGrQZE'
			this.$u.vuex('Utoken',str)
			this.getNewProductList()
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
				console.log(appValue);
				this.$u.vuex('vuexAppValue', appValue)
				uni.showModal({
					title: '收到App传递过来的参数',
					content: option
				});
			},
			// 视频加载错误
			videoErrorCallback() {
				console.log('出错了');
			},
			async getToken() {
				const res = await this.$u.api.getToken({
				  companyNum: 'LittleBearWeb',
				  platForm: 'PC'
				})
				this.$u.vuex('Utoken', res.result.item)
			},
			async getNewProductList() {
				const res = await this.$u.api.getNewProductList({})
				if (res.result.code === 200) {
					this.newProductList = res.result.item.newRegionItem
					this.swiperList = res.result.item.images
					this.bannerVideo = res.result.item.videos[0]
					console.log(res);
				}
			}
		},
		mounted() {
		}
	}
</script>

<style lang="scss" scoped>
.wrapBox{
	min-height: 100vh;
	position: relative;
	background-color: #E2343A;
	.bannerImgBox{
		width: 100%;
		height: 547rpx;
	}
	.videoBox{
		width: 100%;
		height: 381rpx;
		box-sizing: border-box;
		padding: 0 30rpx;
		margin-top: 30rpx;
		.videoBgBox{
			height: 100%;
			width: 690rpx;
			border-radius: 10rpx;
			overflow: hidden;
			.videoBg{
				height: 100%;
				width: 690rpx;
				background: #F5F6F7;
				border: 15rpx solid;
				border-image: linear-gradient(50deg, #FFB88D, #FFFFFF, #FFD8BE) 15 15;
				border-radius: 10rpx;
				#myVideo{
					height: 352rpx;
					width: 662rpx;
				}
			}
		}
	}
	.floorWrap{
		padding: 0 28rpx;
		&:last-of-type{
			padding-bottom: 28rpx;
		}
		.titleBox {
			height: 120rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			.line{
				width: 107rpx;
				height: 24rpx;
				background: url(@/static/images/titleLine.png) no-repeat center;
				background-size: 100% 100%;
			}
			.title{
				font-size: 42rpx;
				color: #fff;
				margin: 0 24rpx;
			}
		}
		.floorItems{
			.itemBox{
				width: 694rpx;
				height: 292rpx;
				background: #FFFFFF;
				border: 15rpx solid #FC8D91;
				border-radius: 10rpx;
				margin-top: 28rpx;
				&:first-of-type{
					margin: 0;
				}
				display: flex;
				.leftImg, .contextRingth{
					width: 50%;
					height: 100%;
				}
				.leftImg{
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.contextRingth{
					display: flex;
					align-items: center;
					justify-content: center;
					.textBox{
						width: 100%;
						color: #999999;
						.textItem{
							font-size: 24rpx;
							display: flex;
							line-height: 40rpx;
							&.name, &.priceBox{
								color: #333333;
								font-weight: 500;
								.price{
									font-size: 30rpx;
									color: #E2343A;
								}
							}
							&.name{
								font-size: 30rpx;
								color: #333333;
							}
						}
					}
				}
			}
		}
		// 第二种楼层布局
		.floorItemsTwo{
			width: 100%;
			border: 15rpx solid #FC8D91;
			border-radius: 10rpx;
			background: #FC8D91;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			.itemBox{
				background-color: #fff;
				width: 326rpx;
				height: 450rpx;
				margin-bottom: 15rpx;
				&:nth-last-child(1) {
					margin: 0;
				}
				&:nth-last-child(2) {
					margin: 0;
				}
				.imgBox{
					width: 100%;
					height: 247rpx;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.conTextBox{
					width: 100%;
					color: #999999;
					padding: 0 20rpx;
					.textItem{
						font-size: 24rpx;
						line-height: 40rpx;
						display: flex;
						&.name, &.priceBox{
							color: #333333;
							font-weight: 500;
							.price{
								font-size: 30rpx;
								color: #E2343A;
							}
						}
						&.name{
							font-size: 30rpx;
							color: #333333;
						}
					}
				}
			}
		}
	}
}
</style>
