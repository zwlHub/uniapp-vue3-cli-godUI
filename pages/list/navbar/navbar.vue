<template>
  <view
    class="navbar-container"
    :class="[scrollTop > 80 && isGradual && 'jb-bg']"
  >
    <scroll-view class="scroll-style" scroll-y="true" @scroll="onScroll">
      <u-navbar
        title="标题导航"
        :bgColor="navbarBg"
        leftIconColor="#FFFFFF"
        @leftClick="leftClick"
        :placeholder="false"
      >
        <template v-slot:left
          ><text class="iconfont icon-fanhui" style="color: #FFF;font-size: 38rpx;"></text>
        </template>
        <template v-slot:center>
          <view
            class="nav-center"
            :style="{ opacity: 1 - scrollTop / 120, color: titleColor }"
            v-if="scrollTop <= 80"
          >
            标题导航
          </view>
          <view
            class="nav-center-searcn"
            v-else
            :style="{ width: centerWidth + 'rpx', opacity: scrollTop / 170 }"
          >
            <up-search
              placeholder="请输入..."
              :showAction="false"
              v-model="keyword"
            ></up-search>
          </view>
        </template>
      </u-navbar>
      <image
        src="@/static/image/navbar/yijing.jpg"
        style="width: 100%"
        mode="scaleToFill"
      ></image>
      <view style="padding: 30rpx">
        <view class="operation">
          <p class="title">滚动本页面，查看导航效果</p>
          <p class="tip">可静态和悬浮时出现不同的渐变背景</p>
          <button type="primary" class="nav-btn" @click="isGradual = true">
            切换渐变导航
          </button>
          <p class="tip">可静态和悬浮时出现不同的纯色背景</p>
          <button type="primary" class="nav-btn" @click="isGradual = false">
            纯色背景
          </button>
          <p class="tip">可静态时不透明</p>
          <button type="primary" class="nav-btn" @click="staticColor()">
            纯色背景
          </button>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { onReady } from "@dcloudio/uni-app";
import { height } from "unocss-preset-weapp/theme";

onReady(() => {
  uni.setNavigationBarColor({
    frontColor: "#ffffff",
    backgroundColor: "#000000",
  });
});

const show = ref(false);
// 页面滚动时距离顶部的距离
const scrollTop = ref(0);
const onScroll = (e) => {
  scrollTop.value = e.detail.scrollTop;
};
// 导航栏中间元素宽度
const centerWidth = computed(() => {
  // #ifdef MP-WEIXIN
  if (scrollTop.value >= 110) {
    return 330;
  } else {
    return scrollTop.value * 3;
  }
  // #endif
  // #ifndef MP-WEIXIN
  if (scrollTop.value >= 170) {
    return 510;
  } else {
    return scrollTop.value * 3;
  }
  // #endif
});
const keyword = ref("");

const navbarBg = computed(() => {
  if (scrollTop.value <= 80 && transparentStatus.value) {
    return "rgba(0,0,0,0)";
  } else if (scrollTop.value > 80 && isGradual.value == false) {
    return "#4d43ff";
  } else {
    return "#2979ff";
  }
});

const leftIconColor = ref("#FFFFFF");
const titleColor = ref("#FFF");
const btnText = ref("静态不透明");
// 是否显示渐变色背景
const isGradual = ref(true);
const transparentStatus = ref(true);
// 切换透明或不透明
const staticColor = () => {
  transparentStatus.value = !transparentStatus.value;
  btnText.value = btnText.value === "静态不透明" ? "静态透明" : "静态不透明";
  navbarBg.value =
    navbarBg.value === "rgba(0,0,0,0)" ? "#2979ff" : "rgba(0,0,0,0)";
};

const leftClick = () => {
  uni.navigateBack({
    delta: 1,
  });
};
</script>


<style scoped lang="scss">
.navbar-container {
  height: 100vh;
  background-size: 100% 375rpx;
  background-repeat: no-repeat;
}

.nav-center {
  text-align: center;
}

.navbar ::v-deep .u-navbar__content {
  transition: all 0.2s ease;
}
.navbar ::v-deep .u-status-bar {
  transition: all 0.2s ease;
}

.jb-bg ::v-deep .u-navbar__content {
  background-image: linear-gradient(to right, #6e45e2 0%, #88d3ce 100%);
}
.jb-bg ::v-deep .u-status-bar {
  background-image: linear-gradient(to right, #6e45e2 0%, #88d3ce 100%);
}

.scroll-style {
  height: 100%;
}

.operation {
  background: #ffffff;
  border-radius: 20rpx;
  padding: 30rpx 20rpx;
  height: 1500rpx;

  .title {
    font-size: 28rpx;
    font-weight: 500;
    letter-spacing: 0.1em;
  }

  .tip {
    margin: 20rpx 0;
    font-size: 24rpx;
    color: #333333;
    letter-spacing: 0.1em;
  }

  .nav-btn {
    border-radius: 15rpx;
    width: 100%;
    height: 80rpx;
    line-height: 80rpx;
    background: #3c9cff;
    font-size: 26rpx;
  }
}
</style>

<style lang="scss">
page {
  background-color: $uni-bg-color-grey;
}
</style>
