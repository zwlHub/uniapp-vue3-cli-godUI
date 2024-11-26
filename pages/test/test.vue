<template>
  <view class="content flex">
    <button class="btn type-1">按钮1</button>
    <button class="btn type-2">按钮2</button>
    <button class="btn type-3">按钮3</button>
    <button disabled class="btn type-4">按钮4</button>
    <button class="btn type-5">按钮5</button>
  </view>
</template>
  
  <script setup>
import { ref } from "vue";
const count = ref(0);
function onClick() {
  if (count.value == 1) {
    function abc() {}
    abc();
  }
}
onClick();
</script>
  
  <style>
@import url("/src/common/style/button.scss");
.content {
}
</style>
  