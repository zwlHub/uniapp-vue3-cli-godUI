<template>
	<view class="container">
		<easy-scroll class="easy-scroll" v-if="navList.length > 0" :list="navList" itemKey="id"
			navKey="label" :topDistance="20">
			<view class="list" v-for="(item, listIndex) in navList" :key="listIndex" :id="'scroll-item-' + listIndex">
				<view class="title"><text>{{ item.label }}</text></view>
				<view class="item-container">
					<view class="item" v-for="(item, index) in item.itemList" @click="clickItem(item.id)" :key="index">
						<image class="image" src="@/static/logo.png" mode=""></image>
						<view class="name">{{ item.name }}</view>
					</view>
				</view>
			</view>
		</easy-scroll>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import {
		navList
	} from '@/mock/list/leftNav.js'

	const clickItem = (id) => {
		uni.showToast({
			title: id
		})
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	
	.easy-scroll {
		height: calc(100% - var(--status-bar-height));

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

				.image {
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
</style>
<style>
	uni-page-body,
	page {
		height: 100%;
		width: 100%;
		background: #fff;
	}
</style>