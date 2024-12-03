//拼接路由参数
// usedKey:params中的key值由usedkey确认使用哪些key，默认使用所有参数
export function joinUrlParams(url, params, usedKey = []) {
  if (url.indexOf('?') != -1) {
    return url
  }
  if (
    params === null ||
    typeof params === 'undefined' ||
    typeof params !== 'object'
  ) {
    return url
  }
  let param = ''
  for (var key in params) {
    if (
      params[key] !== '' &&
      typeof params[key] !== 'undefined' &&
      params[key] !== null
    ) {
      if (usedKey.length > 0) {
        for (var i = 0; i < usedKey.length; i++) {
          if (key == usedKey[i]) {
            if (param != '') {
              param += '&'
            }
            param += key + '=' + params[key]
            break
          }
        }
      } else {
        if (param != '') {
          param += '&'
        }
        param += key + '=' + params[key]
      }
    }
  }
  if (param != '') {
    return url + '?' + param
  }
  return url
}
export function isNull (val) {
  if (typeof(val) == "undefined" || !val) {
    return true;
  }
  switch (typeof(val)) {
  case "string":
    return val.trim() === "";
  case "number":
    return false;
  case "object":
    return val.length === 0;
  default:
    return false;
  }
}
/* 截取url参数，variable：需要截取的参数名 */
export function getQueryVariable(variable, url) {
  var query = ''
  if (!isNull(url)) {
    if (url.split('?')[1]) {
      query = url.split('?')[1]
    } else {
      return false
    }
  } else {
    query = window.location.search.substring(1)
  }
  var vars = query.split('&')
  for (var i = 0; i < vars.length; i++) {
    if (vars[i] !== '') {
      var pair = vars[i].split('=')
      if (pair[0] === variable) {
        return pair[1]
      }
    }
  }
  return false
}
//判断是否定义
export function isDef(value) {
  return value !== undefined && value !== null
}
//判断是否为对象
export function isObj(x) {
  const type = typeof x
  return x !== null && (type === 'object' || type === 'function')
}
//判断对象是否为空
export function isObjNull(obj) {
  return 0 === Object.keys(obj).length
}
//判断字符是否为空的方法
export function isStrEmpty(obj) {
  var regu = '^[ ]+$'
  var re = new RegExp(regu)
  if (typeof obj == 'undefined' || obj == null || obj == '' || re.test(obj)) {
    return true
  } else {
    return false
  }
}
//判断是否为数字
export function isNumber(value) {
  return /^\d+(\.\d+)?$/.test(value)
}
export function range(num, min, max) {
  return Math.min(Math.max(num, min), max)
}
export function nextTick(fn) {
  setTimeout(() => {
    fn()
  }, 1000 / 30)
}
let systemInfo = null
export function getSystemInfoSync() {
  if (systemInfo == null) {
    systemInfo = wx.getSystemInfoSync()
  }
  return systemInfo
}
export function addUnit(value) {
  if (!isDef(value)) {
    return undefined
  }
  value = String(value)
  return isNumber(value) ? `${value}px` : value
}
