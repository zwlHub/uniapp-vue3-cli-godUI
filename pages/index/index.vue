<template>
  <view class="tpf-page" :class="`theme-${theme}-page`">
    <text class="theme-color">订单</text>
    <view class="theme-block block flex items-center justify-center">
      <text class="color">板块里面的文本</text>
    </view>
    <view class="flex items-center">
      <button class="button" @click="changeTheme('light')">白天模式</button>
      <button class="button dark" @click="changeTheme('dark')">夜间模式</button>
	  
	  <button @click="debounce1">防抖1</button>
	  <button @click="debounce2">防抖2</button>
    </view>
	<view class="grid-box">
		<view class="grid-item">
			应用1
		</view>
		<view class="grid-item">
			应用2
		</view>
		<view class="grid-item">
			应用3
		</view>
		<view class="grid-item">
			应用4
		</view>
	</view>
  </view>
</template>

<script setup>
import { ref,computed } from "vue";
import { onReady } from "@dcloudio/uni-app";
import { useThemeStore } from '@/store/theme.js'
import debounce from '@/common/utils/debounce.js'
import throttle from '@/common/utils/throttle.js'
const themeStore = useThemeStore()
onReady(() => {
  // 设置导航条
  uni.setNavigationBarColor(themeStore.tabAndBarTheme.navBar);
  // 设置tabbar
  // uni.setTabBarStyle(themeStore.tabAndBarTheme.tabBar);
});

const theme = computed(() => {
  console.log("theme",themeStore.theme)
  return themeStore.theme
})
  
const changeTheme = (theme) => {
  themeStore.setTheme(theme)
  console.log("navBar",themeStore.tabAndBarTheme.navBar)
  uni.setNavigationBarColor(themeStore.tabAndBarTheme.navBar);
}

function debounce1() {
	debounce(()=> {
		console.log("防抖---1")
	},3000)
}
function debounce2() {
	debounce(()=> {
		console.log("防抖---2")
	},3000)
}

</script>

<style lang="scss">
	.grid-box {
		display: grid;
		grid-template-columns: repeat(4,25%);
	}
	
	.grid-item {
		// display: inline-block;
		text-align: center;
	}
</style>
