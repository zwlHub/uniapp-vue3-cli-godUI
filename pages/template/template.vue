<template>
  <view>
    模板
  </view>
  <yuni-tabbar :current="2"></yuni-tabbar>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'
onLoad(() => {
  uni.hideTabBar()
})
</script>


<style scoped lang="scss">

</style>
