<template>
	<view :class="[themeStore.theme === 'dark' && 'darkBg']">
		<u-tabbar :border="false" :value="current ? current : 0" @change="changeTab" :fixed="true" :placeholder="true"
			:safeAreaInsetBottom="true" :inactiveColor="themeStore.tabBarColor" :activeColor="themeStore.tabBarSelectedColor">
			<u-tabbar-item v-for="(item, index) in tabBarStore.tabBarList" :key="index" :text="item.text"
				:name="item.name">
				<template #active-icon>
					<image class="icon-style" :src="item.selectedIconPath"> </image>
				</template>
				<template #inactive-icon>
					<image class="icon-style" :src="item.iconPath"></image>
				</template>
			</u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script setup>
	import {
    useTabBarStore
	} from '@/store/tabBar'
	import {ref} from 'vue'
  import { useThemeStore } from '@/store/theme.js'
  const themeStore = useThemeStore()
	const props = defineProps(['current'])
	const tabBarStore = useTabBarStore()
	function changeTab(e) {
		uni.switchTab({
			url: tabBarStore.tabBarList[e].pagePath,
		})
	}
</script>
<style lang="scss" scoped>

.darkBg {
  &::v-deep .u-tabbar__content {
    background: #000 !important;
  }
}
	.icon-style {
		width: 34rpx;
		height: 34rpx;
	}

	.custom_style {
		color: #fff;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		background-size: cover;
		width: 144rpx;
		height: 142rpx;
		margin-top: -15rpx;

		&_icon {
			font-family: YouSheBiaoTiHei;
			// background: linear-gradient(153deg, #83B2FB 0%, #3E8BF8 96%, #3C88F8 100%);
			font-size: 36rpx;
			width: 120rpx;
			height: 120rpx;
			border-radius: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			// margin-top: -40rpx;
			z-index: 150;
		}
	}

	.border_box {
		// pointer-events: none; 事件穿透解决z-index层级问题
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		left: 0px;
		bottom: 80rpx;
		z-index: 100;
		pointer-events: none;

		.tabBar_miden_border {
			width: 140rpx;
			height: 60rpx;
			border-top: 2rpx solid #dadbde;
			border-radius: 90rpx 90rpx 0 0;
			/* 左上、右上、右下、左下 */
			background: #fff;
		}
	}
</style>