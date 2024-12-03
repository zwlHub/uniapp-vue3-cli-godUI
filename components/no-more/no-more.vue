<template>
  <view class="empty-status" :class="{ center: fixedCenter }">
    <view class="empty-icon">
      <u-image
        src="@/static/image/no-more.png"
        shape="circle"
        mode="aspectFit"	
        width="300rpx"
        height="150rpx"
      ></u-image>
      <view class="no-more">
        <span class="txt">{{ noText }} </span>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  // 请求完成后的标识符
  loaded: {
    type: Boolean,
    default: false,
  },
  // 没有数据的描述语
  noText: {
    type: String,
    default: "暂无数据",
  },
  // 是否垂直居中对齐
  fixedCenter: {
    type: Boolean,
    default: true,
  },
});
</script>

<style lang="scss" scoped>
.empty-status {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // margin-top: 150rpx;

  .empty-icon {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .no-more {
      margin-top: 20rpx;
      display: flex;
      justify-content: center;
      margin-top: 10rpx;

      .txt {
        text-align: center;
        height: 37rpx;
        font-size: 26rpx;
        font-family: PingFang-SC-Regular, PingFang-SC;
        font-weight: 400;
        color: #333333;
        line-height: 37rpx;
      }
    }
  }
}

.center {
  position: fixed;
  /* 子元素设置绝对定位 */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* 使用 transform 使元素中心点对齐 */
}
</style>