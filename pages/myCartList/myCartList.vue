<template>
	<view class="content">
		<view class="xiding">
			<view class="searchBox">
				<u-search placeholder="日照香炉生紫烟" @search="search" @custom="search" :action-style="actionStyle" v-model="keyword"></u-search>
			</view>
			<view class="myDropdown">
				<view class="item" @click="checkSortPrice">
					单价
					<u-icon v-if="sortPrice == ''" class="itemIcon" name="zhankaishangxia" custom-prefix="custom-icon" size="30" color="#666"></u-icon>
					<u-icon v-else-if="sortPrice == 'down'" class="itemIcon" name="xiajiantou" custom-prefix="custom-icon" color="#165AF7" size="30"></u-icon>
					<u-icon v-else-if="sortPrice == 'up'" class="itemIcon" name="shangjiantou2" custom-prefix="custom-icon" color="#165AF7" size="30"></u-icon>
				</view>
				<view class="item sortFactory" @click="checkSortFactory">
					厂商
					<u-icon v-if="sortFactory == ''" class="itemIcon" name="zhankaishangxia" custom-prefix="custom-icon" size="30" color="#666"></u-icon>
					<u-icon v-else-if="sortFactory == 'down'" class="itemIcon" name="xiajiantou" color="#165AF7" custom-prefix="custom-icon" size="30"></u-icon>
					<u-icon v-else-if="sortFactory == 'up'" class="itemIcon" name="shangjiantou2" custom-prefix="custom-icon" color="#165AF7" size="30"></u-icon>
				</view>
				<view class="item sortDate" @click="checkSortDate">
					时间
					<u-icon v-if="sortDate == ''" class="itemIcon" name="zhankaishangxia" custom-prefix="custom-icon" size="30" color="#666"></u-icon>
					<u-icon v-else-if="sortDate == 'down'" class="itemIcon" name="xiajiantou" custom-prefix="custom-icon" color="#165AF7" size="30"></u-icon>
					<u-icon v-else-if="sortDate == 'up'" class="itemIcon" name="shangjiantou2" custom-prefix="custom-icon" color="#165AF7" size="30"></u-icon>
				</view>
			</view>
		</view>
		<view class="listItemsWrap">
			
			<u-swipe-action :show="item.show" :index="index" :btn-width="btnWidth"
						v-for="(item, index) in list" :key="item.id" 
						@click="swipeClick" @open="open"
						:options="options"
					>
					<u-checkbox-group @change="checkboxGroupChange(item)">
					<view class="mySwipeItemBox u-border-bottom">
						<view class="mySwipeItem">
							<view class="leftImgBox">
								<view class="leftImgWrap">
									<u-image @click="openImage(item.imgUrlList)" width="220rpx" height="220rpx" :src="item.img"></u-image>
									<view class="newIcon" v-if="item.isNew"></view>
								</view>
								<view class="iconList">
									<view class="vip iconItem" v-if="item.isVip"></view>
									<view class="present iconItem" v-if="item.isSpotGoods"></view>
									<view class="card iconItem" v-if="item.certificateNo"></view>
								</view>
							</view>
							<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
							<view class="rigthContextBox">
								<view class="nameBox">
									<view class="name">
										{{ item.name }}
									</view>
									<view class="selectWrap" v-if="list.length">
										<u-checkbox :key="index" size="40" v-model="item.isSelect" shape="circle"></u-checkbox>
									</view>
								</view>
								<view class="infoBox">
									<view class="infoItem">
										出厂货号：<text>{{ item.fa_no }}</text>
									</view>
									<view class="infoItem">
										包装：<text>{{ item.ch_pa }}</text>
									</view>
									<view class="infoItem">
										装箱量：<text>{{ item.in_en + "/" + item.ou_lo }}(PCS)</text>
									</view>
									<view class="infoItem">
										样品规格：<text>{{ item.pr_le + "×" + item.pr_wi + "×" + item.pr_hi }}(CM)</text>
									</view>
									<view class="infoItem">
										包装规格：<text>{{ item.in_le + "×" + item.in_wi + "×" + item.in_hi }}(CM)</text>
									</view>
									<view class="infoItem">
										外箱规格：<text>{{ item.ou_le + "×" + item.ou_wi + "×" + item.ou_hi }}(CM)</text>
									</view>
									<view class="infoItem">
										体积/材积：<text>{{ item.bulk_stere + "/" + item.bulk_feet }}</text>
									</view>
									<view class="infoItem">
										毛重/净重：<text>{{ item.ne_we + '/' + item.gr_we }}(kg)</text>
									</view>
									<view class="infoItem">
										参考单价：
										<text class="price" v-if="item.isIntegral">{{ item.cu_de }}{{ item.price }}</text>
										<text class="price" v-else>积分查看</text>
									</view>
									<!-- <view class="infoItem">
										厂商<text class="price">{{ item.cu_de }}{{ item.supplierName }}</text>
									</view> -->
								</view>
							</view>
						</view>
						<view class="dateBox">
							<view class="dateTitle">
								加购时间：<text class="date">{{ item.shoppingTime }}</text>
							</view>
							<view class="iconCart">
								<!-- <view class="cartIcon" v-if="!item.isSelect"></view> -->
								<view class="yesCartIcon"></view>
							</view>
						</view>
						<!-- 来源 -->
						<view class="sourceBox">
							<view class="sourceTitle">
								来源：<text class="date">{{ item.isIntegral ? item.supplierName : item.exhibitionName }}</text>
							</view>
							<view class="iconBoxs">
								<view class="itemIcon voiceIcon"></view>
								<view class="itemIcon infoIcon"></view>
								<view class="itemIcon phoneIcon"></view>
							</view>
						</view>
					</view>
			</u-checkbox-group>
				</u-swipe-action>
		</view>
		<view class="submitWrap">
			<view class="submitBox">
				<view class="left">
					<view class="selectBox" @click="checkAllSelect">
						<block v-if="!isAllSelect">
							<view class="select"></view>全选
						</block>
						<block v-else>
							<view class="activeSelect"></view>全不选
						</block>
					</view>
				</view>
				<view class="right">
					<u-button shape="circle" @click="deleteMyCart" :hair-line="false" :custom-style="deleteStyle">删除</u-button>
					<u-button shape="circle" :ripple="true" ripple-bg-color="#8299e6" type="primary">提交({{selectCount}})</u-button>
				</view>
			</view>
		</view>
		<u-modal v-model="isDelete" @confirm="confirmDelete" :show-cancel-button="true" content="确定删除选中产品吗？"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isDelete: false,
				selectCount: 0,
				list: [],
				checked: '',
				deleteStyle: {
					border: 'none',
					color: '#F51E12'
				},
				btnWidth: 200,
				options: [
					{
						text: '删除',
						style: {
							backgroundColor: '#CF0004',
							"border-radius": '10rpx'
						}
					}
				],
				sortPrice: '',
				sortFactory: '',
				sortDate: '',
				keyword: '',
				actionStyle: {
					"width": "140rpx",
					"height": "68rpx",
					"border-radius": "34rpx",
					"color": "#fff",
					"display": "flex",
					"align-items": "center",
					"justify-content": "center",
					"background-color": "#165AF7"
				}
			};
		},
		watch:{
			vuexAppValue: {
				deep: true,
				immediate: true,
				handler(newVal) {
					// #ifndef APP-PLUS
					if(window.webkit) window.webkit.messageHandlers.JScallOCClick.postMessage(JSON.stringify(newVal));
					// #endif
				}
			}
		},
		computed: {
			isAllSelect() {
				let flag = true
				for (let i = 0; i < this.list.length; i++) {
					if(this.list[i].isSelect === false) flag = false
				}
				return flag
			}
		},
		onShow() {
			this.list = this.$u.deepClone(this.vuexAppValue)
			console.log(this.list);
		},
		onLoad() {
			this.list = this.$u.deepClone(this.vuexAppValue)
			this.list.forEach((val, i)=> {
				if(val.isSelect) this.selectCount++
			})
		},
		methods:{
			// 确认删除我选中的购物车
			confirmDelete() {
				const arr = []
				for (let i = 0; i < this.list.length; i++) {
					if(!this.list[i].isSelect) {
						arr.push(this.list[i])
					}
				}
				this.$store.commit('resetCart', arr)
				this.list = arr
				const count = 0
				for (let i = 0; i < arr.length; i++) {
					if(arr[i].isSelect) {
						count++
					}
				}
				this.selectCount = count
			},
			// 是否删除我选中的购物车
			deleteMyCart() {
				console.log(this.selectCount);
				if(this.selectCount === 0){
					uni.showToast({
						image: '../../static/images/error.png',
						title: '请选择产品',
						duration: 1000
					})
					return false
				}
				this.isDelete = true
			},
			// 查看大图
			openImage(img) {
				uni.previewImage({
				  urls: img
				});
			},
			// 任意选项发生变化时促发
			checkboxGroupChange(item) {
				this.selectCount = 0
				this.$store.commit('resetCart', this.list)
				this.list.forEach((val, i)=> {
					if(val.isSelect) this.selectCount++
				})
			},
			// 点击全选或全不选
			checkAllSelect() {
				if(this.isAllSelect) {
					this.list.map(val => {
						val.isSelect = false;
					})
					this.selectCount = 0
				} else {
					this.list.map(val => {
						val.isSelect = true;
					})
					this.selectCount = this.list.length
				}
			},
			// 单个删除购物车中的产品
			swipeClick(index) {
				this.list.splice(index, 1);
				this.list.forEach(val => {
					val.show = false;
				})
				this.$u.toast(`删除购物车产品成功`);
				this.$u.vuex('vuexAppValue', this.list)
				this.selectCount = this.list.length
				console.log(this.vuexAppValue);
			},
			// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
			open(index) {
				console.log(index);
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				this.list[index].show = true;
				this.list.map((val, idx) => {
					if(index != idx) this.list[idx].show = false;
				})
			},
			// 搜索
			search() {
				let arr = []
				for (var i = 0; i < this.vuexAppValue.length; i++) {
					if(this.vuexAppValue[i].name.includes(this.keyword)) {
						arr.push(this.vuexAppValue[i])
					}
				}
				this.list = arr
			},
			// 价格排序
			checkSortPrice() {
				this.sortFactory = ''
				this.sortDate = ''
				this.sortPrice = this.sortPrice === '' ? 'down': this.sortPrice === 'down' ? 'up' : ''
				if(this.sortPrice === 'down') {
					this.list.sort((a, b) => {
					 return (a.price - b.price)
					});
				} else if(this.sortPrice === 'up') {
					this.list.sort((a, b) => {
					 return (b.price - a.price)
					});
				} else {
					this.list = this.$u.deepClone(this.vuexAppValue)
				}
			},
			// 厂商排序
			checkSortFactory() {
				this.sortPrice = ''
				this.sortDate = ''
				this.sortFactory = this.sortFactory === '' ? 'down': this.sortFactory === 'down' ? 'up' : ''
				if(this.sortFactory === 'down') {
					this.list.sort((a, b) => {
					 return (a.supplierName.localeCompare(b.supplierName))
					});
				} else if(this.sortFactory === 'up') {
					this.list.sort((a, b) => {
					 return (b.supplierName.localeCompare(a.supplierName))
					});
				} else {
					this.list = this.$u.deepClone(this.vuexAppValue)
				}
			},
			// 时间排序
			checkSortDate() {
				this.sortFactory = ''
				this.sortPrice = ''
				this.sortDate = this.sortDate === '' ? 'down': this.sortDate === 'down' ? 'up' : ''
				if(this.sortDate === 'down') {
					this.list.sort((a, b) => {
					 return Date.parse(a.shoppingTime) - Date.parse(b.shoppingTime)
					});
				} else if(this.sortDate === 'up') {
					this.list.sort((a, b) => {
					 return Date.parse(b.shoppingTime) - Date.parse(a.shoppingTime)
					});
				} else {
					this.list = this.$u.deepClone(this.vuexAppValue)
				}
			}
		}
	}
</script>

<style lang="scss">
.content {
	min-height: 100vh;
	padding: 180rpx 30rpx 0 30rpx;
	position: relative;
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
		.myDropdown{
			height: 80rpx;
			display: flex;
			color: #666666;
			align-items: center;
			.item {
				margin-right: 30rpx;
				.itemIcon{
					margin-left: 10rpx;
				}
			}
		}
	}
	.submitWrap{
		width: 100%;
		height: 100rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #fff;
		.submitBox{
			width: 100%;
			height: 100%;
			padding: 0 30rpx 0 10rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.left{
				.selectBox{
					display: flex;
					align-items: center;
					.activeSelect{
						width: 80rpx;
						height: 80rpx;
						background: url("~@/static/images/activeSelect.png") no-repeat center;
						background-size: 100% 100%;
					}
					.select{
						width: 80rpx;
						height: 80rpx;
						background: url("~@/static/images/select.png") no-repeat center;
						background-size: 100% 100%;
					}
				}
			}
			.right{
				width: 350rpx;
				height: 100%;
				display: flex;
				align-items: center;
			}
		}
	}
}

.listItemsWrap{
	width: 100%;
	padding-bottom: 100rpx;
}
.u-swipe-content{
	padding: 20rpx;
	.mySwipeItemBox {
		.mySwipeItem {
			display: flex;
			box-sizing: border-box;
			border: 1px solid #EEEEEE;
			.leftImgBox{
				width: 240rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-wrap: wrap;
				.leftImgWrap{
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
				}
				.iconList{
					padding: 36rpx 0;
					width: 100%;
					padding: 0 10rpx;
					box-sizing: border-box;
					display: flex;
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
			}
			.rigthContextBox{
				flex: 1;
				.nameBox{
					height: 85rpx;
					display: flex;
					align-items: center;
					.name{
						width: 370rpx;
						overflow: hidden;/*超出部分隐藏*/
						white-space: nowrap;/*不换行*/
						text-overflow:ellipsis;/*超出部分文字以...显示*/
					}
					.selectWrap{
						width: 80rpx;
						height: 80rpx;
						display: flex;
						align-items: center;
						justify-content: flex-end;
						.u-checkbox{
							width: 50rpx;
						}
					}
				}
				.infoBox{
					color: #999999;
					.infoItem{
						line-height: 46rpx;
						text{
							color: #333333;
							&.price {
								color: #f00;
							}
						}
					}
				}
			}
		}
		.dateBox{
			border: 1px solid #EEEEEE;
			border-top: none;
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 10rpx;
			box-sizing: border-box;
			.dateTitle{
				color: #999999;
				font-size: 22rpx;
			}
			.iconCart{
				.cartIcon {
					width: 80rpx;
					height: 80rpx;
					background: url("~@/static/images/cart.png") no-repeat center;
					background-size: 100% 100%;
				}
				.yesCartIcon {
					width: 80rpx;
					height: 80rpx;
					background: url("~@/static/images/yesCart.png") no-repeat center;
					background-size: 100% 100%;
				}
			}
		}
		.sourceBox{
			border: 1px solid #EEEEEE;
			border-top: none;
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 10rpx;
			box-sizing: border-box;
			.sourceTitle{
				width: 400rpx;
				color: #57B568;
				font-size: 28rpx;
				overflow: hidden;/*超出部分隐藏*/
				white-space: nowrap;/*不换行*/
				text-overflow:ellipsis;/*超出部分文字以...显示*/
			}
			.iconBoxs{
				display: flex;
				.itemIcon {
					width: 80rpx;
					height: 80rpx;
					&.voiceIcon {
						background: url("~@/static/images/voiceIcon.png") no-repeat center;
						background-size: 100% 100%;
					}
					&.infoIcon {
						background: url("~@/static/images/infoIcon.png") no-repeat center;
						background-size: 100% 100%;
					}
					&.phoneIcon {
						background: url("~@/static/images/phoneIcon.png") no-repeat center;
						background-size: 100% 100%;
					}
				}
			}
		}
	}
}
</style>
