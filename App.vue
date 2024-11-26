<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
}
</script>

<style lang="scss">
/*每个页面公共css */
@import "uview-plus/index.scss";
@import '~@/common/style/public.scss';
/* 主题 */
@import "~@/common/style/dark.scss";
@import "~@/common/style/light.scss";
</style>
