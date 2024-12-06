<template>
  <view :class="[`theme-${themeStore.theme}-page`,'container']" :style="{ backgroundImage: 'url(' + bgUrl + ')' }">
    <u-navbar title="产品详情" :autoBack="true" :bgColor="themeStore.navBarBgColor" :placeholder="true"
              :titleStyle="{color: themeStore.navBarTextColor}"
              :leftIconColor="themeStore.navBarTextColor">
      <template #left>
        <view></view>
      </template>
    </u-navbar>
    <view class="scroll-style">
      <scroll-view style="height: 100%" scroll-y="true">
        <view class="card theme-card">
          <p class="title">基础主题配置（暗黑/明亮）</p>
          <p class="content"></p>
          <theme-button text="白天主题" @click="changeTheme('light')"></theme-button>
          <theme-button style="margin-top: 20rpx" text="夜间主题" @click="changeTheme('dark')"></theme-button>
        </view>
        <view class="card theme-card">
          <p class="title">其他主题配置（自定义颜色）</p>
          <p class="content"></p>
          <theme-button text="蓝色主题" @click="changeTheme('blue')"></theme-button>
          <theme-button style="margin-top: 20rpx" text="红色主题" @click="changeTheme('red')"></theme-button>
        </view>
        <view class="card theme-card">
          <p class="title">图片切换</p>
          <p class="content">只有蓝色和红色主题设置了图片背景</p>
          <view class="mod-item">
            <view class="mode-title theme-card-title" :style="{ backgroundImage: 'url(' + modItemBg + ')' }">标题1XXX</view>
          </view>
          <view class="mod-item">
            <view class="mode-title theme-card-title" :style="{ backgroundImage: 'url(' + modItemBg + ')' }">标题2XXX</view>
          </view>
        </view>
        <view class="card theme-card">
          <p class="title">按钮展示</p>
          <p class="content">动态按钮（按钮跟随主题改变）</p>
          <theme-button style="width: 200rpx" text="动态按钮"></theme-button>
          <p class="content">静态按钮（按钮不随主题改变）</p>
          <view style="width: 200rpx"><u-button style="background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);" text="静态按钮"></u-button></view>
        </view>
        <view class="card theme-card">
          <p class="title">文本展示</p>
          <p class="title theme-text-color" style="background: #C2C2C2">主题色文本</p>
        </view>
      </scroll-view>
    </view>
  </view>
  <yuni-tabbar :current="3"></yuni-tabbar>
</template>

<script setup>
import {ref, computed, watch} from "vue";
import {onReady, onLoad} from "@dcloudio/uni-app";
import {useThemeStore} from '@/store/theme.js'
import {useTabBarStore} from '@/store/tabBar.js'
const themeStore = useThemeStore()
const tabBarStore = useTabBarStore()
const bgUrl = computed(() => {
  if (themeStore.theme === 'light' || themeStore.theme === 'dark') {
    return ''
  }
  return `/static/image/theme/theme-${themeStore.theme}-bg.png`
})

const modItemBg = computed(() => {
  return `/static/image/theme/theme-title-${themeStore.theme}-bg.png`
})

onReady(() => {
  // 原生导航使用这种方式
  // themeStore.setNavigationBarColorHandler()
})
onLoad(() => {
  uni.hideTabBar()
})
const changeTheme = (theme) => {
  themeStore.setTheme(theme)
  // 原生导航使用这种方式
  // themeStore.setNavigationBarColorHandler()
  if(theme === 'red') {
    tabBarStore.setTab('tab2')
  } else {
    tabBarStore.setTab('tab1')
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 20rpx;
  //自定义tabbar的占位元素为50px
  height: calc(100% - 50px);
  background-size: 100% 663rpx;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.scroll-style {
  flex: 1;
  overflow-y: auto;
}

.card {
  padding: 20rpx 15rpx;
  border-radius: 20rpx;
  box-sizing: border-box;

  &:not(:last-child) {
    margin-bottom: 30rpx;
  }

  .title {
    font-size: 28rpx;
    font-weight: 500;
    margin-bottom: 10rpx;
  }

  .content {
    font-size: 24rpx;
    opacity: .4;
    line-height: 37rpx;
  }
}

.nav-btn {
  border-radius: 15rpx;
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
  background: #3c9cff;
  font-size: 26rpx;
}

.mod-item {
  margin-top: 20rpx;

  .mode-title {
    box-sizing: border-box;
    width: 319rpx;
    height: 51rpx;
    background-size: 100% 100%;
    line-height: 51rpx;
    padding-left: 23rpx;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 28rpx;
    margin-bottom: 20rpx;
  }
}

</style>
<style>
uni-page-body,
page {
  height: 100%;
  background-color: #f8f8f8;
}
</style>