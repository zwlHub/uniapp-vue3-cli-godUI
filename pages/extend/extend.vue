<template>
  <view class="container">
    扩展
  </view>
  <yuni-tabbar :current="1"></yuni-tabbar>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'
onLoad(() => {
  uni.hideTabBar()
})
</script>


<style scoped lang="scss">
.container {
  height: calc(100% - 50px);
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