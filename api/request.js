import Platform from "@/common/platform/ePlatform.js";
import { isDef, isObj } from "@/common/uniUtils.js";
import { refreshToken } from "@/common/api.js";
import { isStrEmpty } from "@/common/uniUtils.js";
import { config } from "@/config/config.js"; //appCode,clientId,BASEURL
import { useTokenStore } from "@/store/token.js";
import { useMainStore } from "@/store/index.js";
import { useUserStore } from "@/store/user.js";
import { useTabBarStore } from "@/store/tabBer.js";
import kvStore from "@/common/store/uniKVStore";
import pinia from "@/store/store.js";
let server_url = config.BASEURL;
let token = "";
let tokenType = "";
export let imageUrl = server_url + "/auth/captcha";
let tokenStore = useTokenStore(pinia);
let mainStore = useMainStore(pinia);

export async function request(options = {}) {
  return new Promise((resolved, rejected) => {
    options.url = `${server_url}${options.url}`;
    if (
      isDef(options.params) &&
      isDef(options.params.uniContentType) &&
      options.params.uniContentType == "json"
    ) {
      options.header = {
        clientId: config.clientId,
        "Content-Type": "application/json;charset=UTF-8",
        scope: Platform,
        ...options.header,
      };
      delete options.params.uniContentType;
    } else {
      options.header = {
        clientId: config.clientId,
        "Content-Type": "application/x-www-form-urlencoded",
        scope: Platform,
        ...options.header,
      };
    }
    if (isDef(options.params)) {
      options.data = options.params;
    }
    if (mainStore.hasLogin) {
      tokenStore.value && (token = tokenStore.value);
      tokenStore.tokenType && (tokenType = tokenStore.tokenType);
      options.header["Authorization"] = `${tokenType} ${token}`;
    }
    if (!isStrEmpty(mainStore.jPushregisterId)) {
      options.header["jPushregisterId"] = mainStore.jPushregisterId;
    }
    options.sslVerify = false;

    options.success = async (res) => {
      if (
        isDef(res.data) &&
        isObj(res.data) &&
        res.data.hasOwnProperty("code")
      ) {
        let code = Number(res.data.code);
        switch (code) {
          case 1:
            resolved(res.data);
            break;
          case 0:
            resolved(res.data);
            break;
          case 402:
            rejected(res.data.message);
            break;
          case 401:
            rejected(res.data.message);
            break;
          default:
            rejected(res.data.message);
            break;
        }
      } else if (
        isDef(res.data) &&
        isObj(res.data) &&
        res.data.error == "invalid_token" &&
        !isRefreshToken(options)
      ) {
        // token失效，重新获取token
        const refreshResp = await refresh({
          grant_type: "refresh_token",
          client_id: config.clientId,
          client_secret: tokenStore.client_secret,
          refresh_token: tokenStore.refreshToken.value,
        });
        if (refreshResp && refreshResp.success) {
          // 更新token
          tokenStore.$patch({
            value: refreshResp.data.value,
            refreshToken: refreshResp.data.refreshToken,
            tokenType: refreshResp.data.tokenType,
          });
          // 重新请求
          options.url = options.url.replace(server_url, "");
          delete options.header;
          const resp = await request(options);
          // 返回结果
          resolved(resp);
        } else {
          // refreshToken过期，重新登录
          rejected("无权限");
          const tabBarStore = useTabBarStore();
          const userStore = useUserStore();
          uni.showToast({
            title: "登录信息已失效，请重新登录",
            icon: "none",
            success: () => {
              kvStore.clear(true);
              mainStore.logout();
              setTimeout(() => {
                uni.reLaunch({
                  url: "/pages/login/login",
                  success: () => {},
                });
              }, 2000);
            },
          });
        }
      } else if (!isDef(res.data)) {
        rejected("返回数据异常");
      } else if (isObj(res.data)) {
        console.log("其他情况", res);
        resolved(res.data);
      }
    };
    options.fail = (err) => {
      console.log("请求失败", err);
      rejected(err);
    };
    uni.request(options);
  });
}

let promise;
export async function refresh(options = {}) {
  if (promise) {
    // 防止重复请求token
    return promise;
  }
  promise = new Promise(async (resolve) => {
    options.__isRefresh = true;
    const resp = await refreshToken(options);
    resolve(resp);
  });
  promise.finally(() => {
    promise = null;
  });
  return promise;
}

function isRefreshToken(config) {
  return !!config.__isRefresh;
}

export async function uploadFile(options = {}) {
  return new Promise((resolved, rejected) => {
    options.url = `${server_url}${options.url}`;
    if (isDef(options.params)) {
      options.filePath = options.params.filePath;
      options.name = "multipartFile";
      options.formData = {
        appCode: config.appCode,
      };
    }
    options.header = {
      clientId: config.clientId,
      scope: Platform,
    };
    if (mainStore.hasLogin) {
      tokenStore.value && (token = tokenStore.value);
      tokenStore.tokenType && (tokenType = tokenStore.tokenType);
      options.header["Authorization"] = `${tokenType} ${token}`;
    }
    options.success = async (res) => {
      let result = JSON.parse(res.data);
      if (isDef(result) && isObj(result) && result.hasOwnProperty("code")) {
        let code = Number(result.code);
        switch (code) {
          case 1:
            resolved(result);
            break;
          case 0:
            resolved(result);
            break;
          case 402:
            rejected(result.message);
            break;
          case 401: // 定义token失效的代码,刷新token
            rejected(result.message);
          default:
            rejected(result.message);
            break;
        }
      } else if (
        isDef(res.data) &&
        isObj(res.data) &&
        res.data.error == "invalid_token" &&
        !isRefreshToken(options)
      ) {
        // token失效，重新获取token
        const refreshResp = await refresh({
          grant_type: "refresh_token",
          client_id: config.clientId,
          client_secret: tokenStore.client_secret,
          refresh_token: tokenStore.refreshToken.value,
        });
        if (refreshResp && refreshResp.success) {
          // 更新token
          tokenStore.$patch({
            value: refreshResp.data.value,
            refreshToken: refreshResp.data.refreshToken,
            tokenType: refreshResp.data.tokenType,
          });
          // 重新请求
          options.url = options.url.replace(server_url, "");
          delete options.header;
          const resp = await request(options);
          // 返回结果
          resolved(resp);
        } else {
          // refreshToken过期，重新登录
          rejected("无权限");
          const tabBarStore = useTabBarStore();
          const userStore = useUserStore();
          uni.showToast({
            title: "登录信息已失效，请重新登录",
            icon: "none",
            success: () => {
              mainStore.logout();
              userStore.logout();
              setTimeout(() => {
                uni.reLaunch({
                  url: "/pages/login/login",
                  success: () => {},
                });
              }, 2000);
            },
          });
        }
      } else if (!isDef(result)) {
        rejected("返回数据异常");
      } else if (isObj(result)) {
        //res.data.error = unauthorized 表示401
        if (result.error == "unauthorized") {
          uni.reLaunch({
            url: "/pages/generalPage/noauthority/noauthority",
          });
        }
        resolved(result);
      }
    };
    options.fail = (err) => {
      console.log("请求失败", err);
      rejected(err);
    };
    uni.uploadFile(options);
  });
}

export async function downloadFile(options = {}) {
  return new Promise((resolved, rejected) => {
    options.url = `${server_url}${options.url}`;
    options.header = {
      clientId: config.clientId,
      scope: Platform,
    };
    if (mainStore.hasLogin) {
      tokenStore.value && (token = tokenStore.value);
      tokenStore.tokenType && (tokenType = tokenStore.tokenType);
      options.header["Authorization"] = `${tokenType} ${token}`;
    }
    options.success = async (res) => {
      if (isDef(res) && isObj(res)) {
        resolved(res);
      } else if (
        isDef(res.data) &&
        isObj(res.data) &&
        res.data.error == "invalid_token" &&
        !isRefreshToken(options)
      ) {
        // token失效，重新获取token
        const refreshResp = await refresh({
          grant_type: "refresh_token",
          client_id: config.clientId,
          client_secret: tokenStore.client_secret,
          refresh_token: tokenStore.refreshToken.value,
        });
        if (refreshResp && refreshResp.success) {
          // 更新token
          tokenStore.$patch({
            value: refreshResp.data.value,
            refreshToken: refreshResp.data.refreshToken,
            tokenType: refreshResp.data.tokenType,
          });
          // 重新请求
          options.url = options.url.replace(server_url, "");
          delete options.header;
          const resp = await request(options);
          // 返回结果
          resolved(resp);
        } else {
          // refreshToken过期，重新登录
          rejected("无权限");
          const tabBarStore = useTabBarStore();
          const userStore = useUserStore();
          uni.showToast({
            title: "登录信息已失效，请重新登录",
            icon: "none",
            success: () => {
              mainStore.logout();
              userStore.logout();
              setTimeout(() => {
                uni.reLaunch({
                  url: "/pages/login/login",
                  success: () => {},
                });
              }, 2000);
            },
          });
        }
      } else if (!isDef(res)) {
        rejected("返回数据异常");
      }
    };
    options.fail = (err) => {
      console.log("请求失败", err);
      rejected(err);
    };
    uni.downloadFile(options);
  });
}