<template>
	<view class="easy-scorll">
		<scroll-view :scroll-y="true" class="nav-list" :scroll-into-view="'scroll-nav-' + contentIndex">
			<view class="nav-item" v-for="(item, index) in list" :id="'scroll-nav-' + index"
				:class="{ active: index == viewNavIndex }" @click="handleClickNav(index)" :key="index">
				{{ item[navKey] }}</view>
		</scroll-view>
		<view class="list-wrapper">
			<scroll-view class="list-container" id="list-container" @scroll="handleListScroll"
				@touchstart="handleTouchScrollView" :scroll-y="true"
				:scroll-into-view="'scroll-item-' + clickedNavIndex" :show-scrollbar="false"
				:scroll-with-animation="true">
				<slot />
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'easy-scroll',
		props: {
			// 触发导航变更时内容子项距离内容容器顶部的距离
			topDistance: {
				type: Number,
				default: 0,
			},
			list: {
				type: Array,
				default: [],
			},
			// 从其他页面跳转到此页面时，初始定位左侧标签位置
			curNavKey: {
				type: String,
				default: ''
			},
			// 中间项目的唯一标识
			itemKey: {
				type: String,
				default: 'id'
			},
			// 左侧navBar名称的key
			navKey: {
				type: String,
				default: 'label'
			}
		},
		data() {
			return {
				isTouchScrollView: false,
				clickedNavIndex: 0,
				viewNavIndex: 0, //左侧导航索引
				nodeInfoList: [],
				contentIndex: 0,
			}
		},
		methods: {
			init() {
				const query = uni.createSelectorQuery().in(this)
				query
					.selectAll('#list-container .list')
					.boundingClientRect((data) => {
						this.nodeInfoList = data
					})
					.exec()
				if (!this.curNavKey) return
				// 初始定位左侧高亮位置
				this.viewNavIndex = this.clickedNavIndex = this.list.findIndex(item => item[this.itemKey] === this
					.curNavKey)
				this.contentIndex = this.viewNavIndex - 10
			},
			handleClickNav(nav) {
				if (!this.isTouchScrollView && this.clickedNavIndex == nav) return
				// 锁定联动
				this.isTouchScrollView = false
				// 解决clickedNavIndex相同触发更新失败
				if (this.clickedNavIndex == nav) {
					this.clickedNavIndex = -1
				}
				this.$nextTick(function() {
					this.clickedNavIndex = nav
					this.viewNavIndex = nav
				})
			},
			handleListScroll(e) {
				if (!this.isTouchScrollView) return
				let scrollTop = (this.scrollTop = e.detail.scrollTop)
				// console.log("scrollTop: " + scrollTop);
				// 筛选已经滑过定位视口的元素集合，按照距离顶部的距离从大到小排序。
				let historyNodes = this.nodeInfoList
					.map((item, index) => ({
						index,
						...item
					}))
					.filter((item) => item.top <= scrollTop + this.topDistance)
					.sort((a, b) => b.top - a.top)
				// 最后一个经过定位视口的元素
				let currentNavIndex = historyNodes[0]?.index
				this.viewNavIndex = currentNavIndex || 0
				// 超出nav可视范围再定位
				this.contentIndex = historyNodes?.length - 10 || 0
			},
			handleTouchScrollView() {
				this.isTouchScrollView = true
			},
			clickItem(item) {
				this.$emit('clickItem', item.id)
			}
		},
		mounted() {
			this.$nextTick(function() {
				this.init()
			})
		}
	}
</script>

<style lang="scss" scoped>
	.easy-scorll {
		display: flex;
		height: 100%;

		.nav-list {
			height: 100%;
			width: 156rpx;
			overflow-y: auto;
			overflow-x: hidden;
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 34rpx;
			background: #f7f8fa;
			font-family: PingFangSC, PingFang SC;
			font-weight: 500;
			font-size: 26rpx;

			// &::-webkit-scrollbar {
			//   width: 0;
			//   height: 0;
			//   background: transparent;
			// }

			.nav-item {
				width: 100%;
				padding: 25rpx 0;
				text-align: center;
				transition: transform 0.1s linear;
				position: relative;

				&.active {
					font-family: PingFangSC, PingFang SC;
					font-weight: 500;
					font-size: 26rpx;
					color: #4480ff;
					background: #fff;

					&::before {
						content: '';
						height: 28rpx;
						width: 6rpx;
						background: #4480ff;
						position: absolute;
						top: 50%;
						left: 4rpx;
						transform: translateY(-50%);
					}
				}
			}
		}

		.list-wrapper {
			flex: 1;
			position: relative;

			.list-container {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				padding: 0 18rpx;
				box-sizing: border-box;
				padding-top: 20rpx;

				.title {
					margin-top: 20rpx;
					text-align: left;
					font-family: PingFangSC, PingFang SC;
					font-weight: 500;
					font-size: 28rpx;
					color: #333333;
				}

				.item-container {
					display: flex;
					flex-wrap: wrap;
					align-items: center;

					.item {
						width: 50%;
						text-align: center;
						padding-top: 24rpx;

						image {
							width: 263rpx;
							height: 166rpx;
							margin-bottom: 12rpx;
							border-radius: 4rpx;
						}

						.name {
							font-family: PingFang-SC, PingFang-SC;
							font-size: 24rpx;
							color: #303030;
						}
					}
				}
			}
		}
	}
</style>