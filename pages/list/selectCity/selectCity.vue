<template>
  <view>
    <city-select
      placeholder="请输入城市名称"
      @cityClick="cityClick"
      :formatName="formatName"
      :obtainCitys="city"
      :hotCity="hotCity"
      :isSearch="true"
    ></city-select>
  </view>
</template>

<script setup>
import { city } from '@/mock/list/city.js'
import { ref } from "vue";
const formatName = ref("title");

// 热门城市
const hotCity = ref([
  {
    id: 1,
    title: "北京",
  },
  {
    id: 2,
    title: "上海",
  },
  {
    id: 3,
    title: "广州",
  },
  {
    id: 4,
    title: "重庆",
  },
  {
    id: 5,
    title: "南京",
  },
]);

function cityClick(item) {
  uni.showToast({
    title: JSON.stringify(item),
    icon: "none",
  });
}
</script>

<style lang="scss" scoped>
</style>