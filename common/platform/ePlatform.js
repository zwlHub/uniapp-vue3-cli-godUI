/**使用条件编译获取平台信息*/
function ifDefPlatform() {
  let platform = 'UNI_APP'

  //#ifdef APP-PLUS
  platform = 'APP-PLUS'
  //#endif

  //#ifdef APP-PLUS-NVUE
  platform = 'APP-PLUS-NVUE'
  //#endif

  //#ifdef H5
  platform = 'H5'
  //#endif

  //#ifdef MP-ALIPAY
  platform = 'MP-ALIPAY'
  //#endif

  //#ifdef MP-BAIDU
  platform = 'MP-BAIDU'
  //#endif

  //#ifdef MP-TOUTIAO
  platform = 'MP-TOUTIAO'
  //#endif

  //#ifdef MP-QQ
  platform = 'MP-QQ'
  //#endif

  //#ifdef MP-360
  platform = 'MP-360'
  //#endif

  //#ifdef MP
  platform = 'MP'
  //#endif

  //#ifdef MP-WEIXIN
  platform = 'MP-WEIXIN'
  //#endif

  //#ifdef quickapp-webview
  platform = 'quickapp-webview'
  //#endif

  //#ifdef quickapp-webview-union
  platform = 'quickapp-webview-union'
  //#endif

  //#ifdef quickapp-webview-huawei
  platform = 'quickapp-webview-huawei'
  //#endif

  return platform
}

/**平台类型*/
export const Platform = ifDefPlatform()
/**默认导出平台类型*/
export default Platform

export const isH5 = Platform === 'H5'
export const isAppPlus = Platform === 'AppPlus'
export const isMpWeixin = Platform === 'MpWeixin'
