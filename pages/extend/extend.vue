<template>
  <view>
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

</style>
