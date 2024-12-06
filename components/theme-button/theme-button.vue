<template>
<!--  封装button，实现动态按钮主题 -->
    <view>
      <up-button v-bind="$attrs" :style="{background: useTheme.btnBgColor || '#3c9cff',color: useTheme.btnTextColor || '#FFF'}" class="button" ref="buttonRef"></up-button>
    </view>
</template>

<script setup>
import { ref,onMounted,defineExpose } from 'vue'
import { useThemeStore } from '@/store/theme.js'
const useTheme = useThemeStore()
const buttonRef = ref(null)
const expose = {}
onMounted(() => {
  const entries = Object.entries(buttonRef.value);
  for (const [method, fn] of entries) {
    expose[method] = fn;
  }
})
// 暴露方法，父组件中通过ref的方式调用
defineExpose(expose)

</script>
<style scoped lang="scss">

.button {
  font-size: 28rpx;
  font-weight: 500;
}
</style>