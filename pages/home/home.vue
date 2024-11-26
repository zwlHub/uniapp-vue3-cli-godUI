<template>
  <view class="home-container">
    <scroll-view class="scroll-style" scroll-y="true">
      <view class="components">
        <view class="com-item" v-for="(item,index) in comData" :key="index">
          <up-sticky offsetTop="0" bgColor="#f9f9f9" customNavHeight="0" >
            <view class="title">{{ item.modTitle }}</view>
          </up-sticky>
          <view class="content">
            <view class="menu" v-for="(menuItem,index) in item.modData" :key="index" @click="toPage(menuItem.url)">
              <text :class="['iconfont', menuItem.comIcon]"></text>
              <text class="menu_text">{{ menuItem.comTitle }}</text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import { comData } from './data'


function toPage(url){
  uni.navigateTo({
    url
  })
}
</script>


<style scoped lang="scss">
.home-container {
  width: 100%;
  height: 100%;
  padding: 10rpx 20rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.scroll-style {
  box-sizing: border-box;
  flex: 1;
  overflow-y: auto;
}

.components {
  height: 100%;

  .com-item {
    &:not(:first-child) {
      margin-top: 30rpx;
    }

    .title {
      font-weight: 500;
      font-size: 28rpx;
      //background: #f9f9f9;
      padding: 10rpx 20rpx;
    }

    .content {
      display: grid;
      grid-template-columns: repeat(4, 25%);
      gap: 50rpx 0;
      background: #FFF;
      padding: 30rpx;
      border-radius: 0 0 10rpx 10rpx;
      box-shadow: 0 0 0 1rpx rgba(0, 0, 0, .05);

      .menu {
        justify-self: center;
        align-self: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;

        &_text {
          font-size: 23rpx;
          margin-top: 10rpx;
        }
      }
    }
  }
}
</style>
<style>
uni-page-body,
page {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
}
</style>
