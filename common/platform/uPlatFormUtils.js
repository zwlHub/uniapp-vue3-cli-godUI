//平台相关工具类。

//判断是否微信浏览器
function isWeiXinBrowser() {
  var ua = window.navigator.userAgent.toLowerCase()
  console.log(ua) //mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko)version/9.0 mobile/13b143 safari/601.1
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true // 微信中打开
  } else {
    return false // 普通浏览器中打开
  }
}
function getBrow() {
  var u = navigator.userAgent
  var ua = navigator.userAgent.toLocaleLowerCase()
  var app = navigator.appVersion
  return {
    trident: u.indexOf('Trident') > -1 /*IE内核*/,
    presto: u.indexOf('Presto') > -1 /*opera内核*/,
    webKit: u.indexOf('AppleWebKit') > -1 /*苹果、谷歌内核*/,
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1 /*火狐内核*/,
    mobile: !!u.match(/AppleWebKit.*Mobile.*/) /*是否为移动终端*/,
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) /*ios终端*/,
    android:
      u.indexOf('Android') > -1 ||
      u.indexOf('Linux') > -1 /*android终端或者uc浏览器*/,
    iPhone: u.indexOf('iPhone') > -1 /*是否为iPhone或者QQHD浏览器*/,
    iPad: u.indexOf('iPad') > -1 /*是否iPad*/,
    webApp: u.indexOf('Safari') == -1 /*是否web应该程序，没有头部与底部*/,
    souyue: u.indexOf('souyue') > -1,
    superapp: u.indexOf('superapp') > -1,
    weixin: u.toLowerCase().indexOf('micromessenger') > -1,
    qq: ua.match(/QQ/i) == 'qq', // QQ
    weiBo: ua.match(/WeiBo/i) == 'weibo', // 微博
    Safari: u.indexOf('Safari') > -1,
    QQbrw: u.indexOf('MQQBrowser') > -1, // QQ浏览器
    webview:
      !(u.match(/Chrome\/([\d.]+)/) || u.match(/CriOS\/([\d.]+)/)) &&
      u.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
    ucweb: (function () {
      try {
        return (
          parseFloat(
            u
              .match(/ucweb\d+\.\d+/gi)
              .toString()
              .match(/\d+\.\d+/)
              .toString()
          ) >= 8.2
        )
      } catch (e) {
        if (u.indexOf('UC') > -1) {
          return true
        }
        return false
      }
    })(),

    Symbian: u.indexOf('Symbian') > -1,
    ucSB: u.indexOf('Firofox/1.') > -1,
  }
}

function getBrowsers() {
  this.getBrow()
  var u = navigator.userAgent.toLocaleLowerCase()
  var uc = u.split('ucbrowser/').length
  var qq = u.split('mqqbrowser/').length
  var version = ''
  if (qq == 2) {
    this.calls()
    version = 'QQ浏览器'
    return false
  }
  return version
}

module.exports = {
  isWeiXinBrowser: isWeiXinBrowser,
}
