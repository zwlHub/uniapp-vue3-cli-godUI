<template>
  <view class="container">
    <view class="card">
      <p class="title">粘性布局 Sticky</p>
      <p class="content">当滚动到元素时自动吸附在顶部</p>
      <p class="content">
        您应该避免被嵌套的内容不能含有fixed,absolute布局的元素，会影响对齐和裁剪。
      </p>
    </view>
    <up-sticky id="sticky1">
      <view class="card sticky-view1">滚动页面我会被自动吸顶</view>
    </up-sticky>
    <view class="occupancy" v-for="(item,index) in 3" :key="index"></view>
    <up-sticky :offset-top="50">
      <view class="card sticky-view2"
        >我会被吸附在上面元素的后面，这对布局非常有用</view
      >
    </up-sticky>
    <view class="occupancy" v-for="(item,index) in 10" :key="index"></view>
  </view>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted } from "vue";
</script>

<style lang="scss" scoped>
.container {
  padding: 20rpx;
}

.card {
  padding: 20rpx 15rpx;
  border-radius: 20rpx;
  background: #fff;
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
    color: rgba($color: #000, $alpha: 0.4);
    line-height: 37rpx;
  }
}

.occupancy {
  margin-top: 30rpx;
  height: 100rpx;
  border-radius: 20rpx;
  background: #fff;
}

.sticky-view1 {
  background: #6495ed;
  color: #fff;
  font-size: 26rpx;
}

.sticky-view2 {
  margin-top: 30rpx;
  background: #43cd80;
  color: #fff;
  font-size: 26rpx;
}
</style>
<style>
uni-page-body,
page {
  height: 100%;
  width: 100%;
  background-color: #f8f8f8;
}
</style>