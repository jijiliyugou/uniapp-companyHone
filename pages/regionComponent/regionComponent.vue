<template>
	<view class="content">
			<view class="xiding">
				<view class="searchBox">
					<u-search placeholder="日照香炉生紫烟" @search="search" @custom="search" :action-style="actionStyle" v-model="keyword"></u-search>
				</view>
			</view>
		<view class="scrollViewBox">
			<view class="swiperBox">
				<u-swiper :list="swiperList" height="250" mode="none"></u-swiper>
			</view>
			<view class="listItems">
				<view class="item" v-for="(item, i) in productList" :key="i">
					<view class="itemImg">
						<u-image width="100%" height="254rpx" :src="item.img"></u-image>
						<!-- 是不是新品 -->
						<view class="newIcon" v-if="item.isNew"></view>
						<view class="starIcon">
							<u-icon name="star"></u-icon>
						</view>
					</view>
					<view class="itemContext">
						<view class="context">
							<view class="productName">{{ item.name }}</view>
							<view class="textItem">出厂货号：<text>{{ item.fa_no }}</text></view>
							<view class="textItem">
								参考单价：
								<text class="price" v-if="item.isIntegral">{{ item.cu_de }}{{ item.price }}</text>
								<text class="price" v-else>积分查看</text>
							</view>
						</view>
						<view class="icons">
							<view class="left">
								<!-- 是不是VIP -->
								<view class="vip iconItem" v-if="item.isVip"></view>
								<!-- 是不是现货 -->
								<view class="present iconItem" v-if="item.isSpotGoods"></view>
								<!-- 有没有证书 -->
								<view class="card iconItem" v-if="item.certificateNo"></view>
							</view>
							<view v-if="item" :class="{ rightYesCart: item.isJoinShopping , right: !item.isJoinShopping }" @click="myAddCart({startNode: '.cart' + i, item: item})">
								<view :class="'cart' + i"></view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<movable-area>
			<movable-view :x="x" :y="y" @click="openCart" :out-of-bounds="false" direction="all" @change="changMovableView">
				<view class="myCart">
					<view class="cartIconBadge">
						<u-badge size="mini" :offset="[-30, -30]" type="error" :count="num">
							<text></text>
						</u-badge>
					</view>
					<view class="cartIcon"></view>
				</view>
			</movable-view>
		</movable-area>
		<u-back-top :scroll-top="scrollTop" @backToToplick="resetMovableView" top="600" :icon-style="backIconStyle" right="40"
		 bottom="50"></u-back-top>
		<jumpBall :start.sync="num" :speed="500" :element.sync="element" @msg="jbMsg" />
	</view>
</template>

<script>
	import jumpBall from "@/components/hx-jump-ball/hx-jump-ball.vue"
	export default {
		components: {
			jumpBall
		},
		data() {
			return {
				isAddCart: false,
				webviewStyles: {
					progress: {
					  display: 'none'
					}
				},
				currentProduct: null,
				productList: [],
				totalCount: 0,
				skipCount: 1,
				maxResultCount: 20,
				num: 0,
				appValue: null,
				element: [],
				bgImg: '',
				currentWidth: 0,
				currentHeight: 0,
				x: 0,
				y: 0,
				old: {
					x: 310,
					y: 550
				},
				scrollTop: 0,
				backIconStyle: {
					fontSize: "44rpx",
					color: '#fff'
				},
				swiperList: [{
						image: require('@/static/images/banner1.png'),
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
				old: {
					scrollTop: 0
				},
				scrollTop: 0,
				actionStyle: {
					"width": "140rpx",
					"height": "68rpx",
					"border-radius": "34rpx",
					"color": "#fff",
					"display": "flex",
					"align-items": "center",
					"justify-content": "center",
					"background-color": "#165AF7"
				},
				keyword: '',
				parentCode: '',
				currentCode: ''
			}
		},
		onShow() {
			// const str = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJMaXR0bGVCZWFyIiwianRpIjoiZTliM2FmNjctNzY3Zi00MzFkLTgxMGItMTFjYjIxMDdlNDIyIiwiaWF0IjoxNjExMDI4NzM5LCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTM2ODAzOTg0NzgiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zeXN0ZW0iOiJpT1MiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIxYzdjYzY5Ni04YjA5LTQwNTEtODU2MS02ZGRiZjBiOTgzZWMiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zcG4iOiIyNWUyMGNlMy1lNzMzLTRkYTAtODc3NS02ZThlZDJiZjE2MDUiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9hbm9ueW1vdXMiOiJIUzAwMjEzNDYiLCJuYmYiOjE2MTEwMjg3MzksImV4cCI6MTYxMTExNTEzOSwiaXNzIjoiTGl0dGxlQmVhciIsImF1ZCI6IkxpdHRsZUJlYXIifQ.9-J4To9TnwVxMMqCHzS_sT0HJ0JrLTqWC-Jy57Zin_o'
			// this.$u.vuex('Utoken',str)
			this.currentProduct = null
			this.getProductList()
		},
		async onLoad(options) {
			this.parentCode = options.pCode
			this.currentCode = options.code
			uni.setNavigationBarTitle({
				title: options.name
			})
			uni.getSystemInfo({
				success: res => {
					this.old.x = this.currentWidth = res.windowWidth * 0.91;
					this.old.y = this.currentHeight = res.windowHeight * 0.87;
					this.x = this.currentWidth * 0.91;
					this.y = this.currentHeight * 0.87;
				}
			});
			// await this.getToken()
			const str = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJMaXR0bGVCZWFyIiwianRpIjoiNGJiNmE5Y2QtNTdiOC00ZWI0LWJhOWMtN2NiNWI3NmExMTBjIiwiaWF0IjoxNjExMTE1Mjg5LCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTM2ODAzOTg0NzgiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zeXN0ZW0iOiJpT1MiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIxYzdjYzY5Ni04YjA5LTQwNTEtODU2MS02ZGRiZjBiOTgzZWMiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zcG4iOiIyNWUyMGNlMy1lNzMzLTRkYTAtODc3NS02ZThlZDJiZjE2MDUiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9hbm9ueW1vdXMiOiJIUzAwMjEzNDYiLCJuYmYiOjE2MTExMTUyODksImV4cCI6MTYxMTIwMTY4OSwiaXNzIjoiTGl0dGxlQmVhciIsImF1ZCI6IkxpdHRsZUJlYXIifQ.iuteHWV5uXVgiHeIzao2tYGecEUBfPjkhazHINGrQZE'
			this.$u.vuex('Utoken',str)
			this.getProductList()
		},
		mounted() {
			Date.prototype.Format = function (fmt) { // author: meizz
			    var o = {
			        "M+": this.getMonth() + 1, // 月份
			        "d+": this.getDate(), // 日
			        "h+": this.getHours(), // 小时
			        "m+": this.getMinutes(), // 分
			        "s+": this.getSeconds(), // 秒
			        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
			        "S": this.getMilliseconds() // 毫秒
			    };
			    if (/(y+)/.test(fmt))
			        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
			    for (var k in o)
			        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			            return fmt;
			}
		},
		methods: {
			// 点击了打开购物车事件
			openCart () {
				uni.navigateTo({
					url: '/pages/myCartList/myCartList'
				})
			},
			// 传递给APP终端的事件 ios Android 交互
			JScallOCClick (productList) {
				const u = navigator.userAgent;
				// android终端
				const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; 
				// ios终端 
				const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
				if(isAndroid){ // 如果是Android终端
				  // #ifndef APP-PLUS
					window.JScallOCClick.postMessage(productList)
					// #endif
				}else { // 否则是IOS终端
				  // #ifndef APP-PLUS
					window.webkit.messageHandlers.JScallOCClick.postMessage(productList);
					// #endif
				}
			},
			toJSON() {},
			// 点击加购成功
			jbMsg(res) {
				//执行加入购物车的逻辑
				uni.showToast({
					icon: 'success',
					title: (this.currentProduct && this.currentProduct.isJoinShopping) ? '加入购物车成功' : '删除商品成功'
				})
				if (this.currentProduct && this.currentProduct.isJoinShopping) {
					this.$store.commit('addCart', this.currentProduct)
				} else {
					this.$store.commit('reduceCart', this.currentProduct)
				}
				this.isAddCart = false
				// 传送数据回去给App
				// this.JScallOCClick(JSON.stringify(this.vuexAppValue))
				this.$u.vuex('vuexAppValue', this.vuexAppValue)
				// console.log(this.vuexAppValue, this.currentProduct);
			},
			// 加购事件
			myAddCart(item) {
				if(!this.isAddCart) {
					console.log([item.startNode, '.cartIconBadge']);
					this.element = [item.startNode, '.cartIconBadge'];
					if (!item.item.isJoinShopping) {
						this.num++
						item.item.isJoinShopping = true
						item.item.isSelect = true
						item.item.shoppingTime = new Date().Format("yyyy-MM-dd hh:mm:ss")
						this.isCartText = '加入购物车成功'
					} else {
						this.num--
						item.item.isJoinShopping = false
						this.isCartText = '删除商品成功'
						this.$store.commit('reduceCart', item.item)
					}
					this.currentProduct = item.item
					this.isAddCart = true
				}
			},
			// 搜索
			search(value) {
				this.getProductList()
			},
			// 点击回到顶部按钮
			resetMovableView() {
				if (this.old.x !== (this.currentWidth * 0.91) || this.old.y !== (this.currentHeight * 0.87)) {
					this.x = this.old.x
					this.y = this.old.y
					this.$nextTick(() => {
						this.x = this.currentWidth * 0.91
						this.y = this.currentHeight * 0.87
					})
				}
			},
			// 获取token
			async getToken() {
				const res = await this.$u.api.getToken({
					companyNum: 'LittleBearWeb',
					platForm: 'PC'
				})
				this.$u.vuex('Utoken', res.result.item)
			},
			// 获取产品列表
			async getProductList() {
				this.isAddCart = false
				const res = await this.$u.api.getProductsWithVipRegionPage({
					keyword: this.keyword,
					parentCode: this.parentCode,
					code: this.currentCode,
					skipCount: this.skipCount,
					maxResultCount: this.maxResultCount,
				})
				if(res.result.code === 200) {
					this.productList = res.result.item.pagedResultDto.items
					this.swiperList = res.result.item.images
					if(this.vuexAppValue.length) {
						for (let g = 0; g < this.productList.length; g++) {
						  this.productList[g].isJoinShopping = false
						}
						for (let i = 0; i < this.vuexAppValue.length; i++) {
							for (let j = 0; j < this.productList.length; j++) {
								if(this.productList[j].productNumber === this.vuexAppValue[i].productNumber) this.productList[j].isJoinShopping = true
							}
						}
					} else {
						for (let j = 0; j < this.productList.length; j++) {
							this.productList[j].isJoinShopping = false
						}
					}
					console.log(this.vuexAppValue.length, this.vuexAppValue);
					this.num = this.vuexAppValue.length
					this.totalCount = res.result.item.pagedResultDto.totalCount
				}
			},
			// 拖动
			changMovableView(e) {
				this.old.x = e.detail.x
				this.old.y = e.detail.y
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		min-height: 100vh;
		padding: 100rpx 30rpx 0 30rpx;
		position: relative;

		movable-area {
			position: fixed;
			left: 0;
			top: 100rpx;
			right: 0;
			height: 100vh;
			width: 100%;
			box-sizing: border-box;
			pointer-events: none; // 重要 设置area元素不可点击，则事件便会下移至页面下层元素

			movable-view {
				pointer-events: auto; // 重要可以点击
				width: 90rpx;
				height: 90rpx;
					.myCart {
						width: 90rpx;
						height: 90rpx;
						background-color: #0082FF;
						border-radius: 45rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						position: relative;
						z-index: 999999;
					.cartIconBadge{
						position: absolute;
						right: 20rpx;
						top: 10rpx;
						.u-badge {
							font-size: 20rpx;
							padding: 10rpx;
							width: 50rpx;
							height: 50rpx;
						}
					}
					.cartIcon {
						width: 40rpx;
						height: 40rpx;
						background: url("~@/static/images/whiteCart.png") no-repeat center;
						background-size: 100% 100%;
					}
				}
			}
		}

		.xiding {
			position: fixed;
			left: 0;
			top: 0;
			padding: 15rpx 30rpx;
			width: 100%;
			background-color: #fff;
			z-index: 9999;
			.searchBox {
				width: 100%;
				height: 68rpx;
				background: #F5F5F5;
				border-radius: 34rpx;
			}
		}

		.scrollViewBox {
			height: 100%;
			overflow: hidden;

			.swiperBox {
				width: 100%;
				height: 250rpx;
			}

			.listItems {
				margin-top: 18rpx;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				padding: 0 1px;
				box-sizing: border-box;
				.item {
					width: 336rpx;
					border: 1px solid rgba(0, 0, 0, 0);
					box-shadow: 0px 0px 7rpx rgba(0, 0, 0, 0.14);
					border-radius: 10rpx;
					margin-bottom: 18rpx;
					overflow: hidden;

					.itemImg {
						height: 254rpx;
						background-color: #f00;
						position: relative;

						.newIcon {
							position: absolute;
							left: 0;
							top: 0;
							width: 75rpx;
							height: 75rpx;
							background: url("~@/static/images/new.png") no-repeat center;
							background-size: 100% 100%;
						}

						.starIcon {
							position: absolute;
							right: 15rpx;
							top: 15rpx;
							width: 44rpx;
							font-size: 32rpx;
							color: #999;
							height: 44rpx;
							border-radius: 22rpx;
							background-color: #fff;
							display: flex;
							align-items: center;
							justify-content: center;
							box-shadow: 0px 0px 7rpx rgba(0, 0, 0, 0.14);
						}
					}

					.itemContext {
						display: flex;
						flex-direction: column;
						.context {
							width: 100%;
							padding: 10rpx 20rpx;
							box-sizing: border-box;
							border-bottom: 1px solid #EEEEEE;
							.productName {
								font-size: 28rpx;
								font-weight: 500;
								color: #000000;
								padding-top: 17rpx;
							}

							.textItem {
								padding-top: 10rpx;
								font-size: 26rpx;
								font-family: PingFang SC;
								font-weight: 400;
								color: #1E1E1E;

								.price {
									color: #FF0032;
								}
							}
						}

						.icons {
							padding: 0 20rpx;
							box-sizing: border-box;
							height: 60rpx;
							width: 100%;
							display: flex;

							.left {
								flex: 1;
								display: flex;
								align-items: center;

								.iconItem {
									margin-right: 14rpx;
								}

								.vip {
									width: 60rpx;
									height: 30rpx;
									background: url("~@/static/images/vip.png") no-repeat center;
									background-size: 100% 100%;
								}

								.present {
									width: 50rpx;
									height: 30rpx;
									background: url("~@/static/images/present.png") no-repeat center;
									background-size: 100% 100%;
								}

								.card {
									width: 34.67rpx;
									height: 30rpx;
									margin: 0;
									background: url("~@/static/images/card.png") no-repeat center;
									background-size: 100% 100%;
								}
							}

							.right {
								width: 60rpx;
								height: 60rpx;
								background: url("~@/static/images/cart.png") no-repeat center;
								background-size: 100% 100%;
							}
							.rightYesCart {
								width: 60rpx;
								height: 60rpx;
								background: url("~@/static/images/yesCart.png") no-repeat center;
								background-size: 100% 100%;
							}
						}
					}
				}
			}
		}
	}

	.u-back-top {
		background-color: rgba(00, 00, 00, 0.6);
		color: #fff;
		width: 90rpx;
		height: 90rpx;
	}
</style>
