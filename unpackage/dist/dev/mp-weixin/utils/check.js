"use strict";
const common_vendor = require("../common/vendor.js");
const login = (callback, fun) => {
  common_vendor.index.login({
    provider: "weixin",
    success: (res) => {
      common_vendor.index.request({
        url: "https://turingteam.xyz:9642/login",
        method: "GET",
        data: {
          jsCode: res.code
        },
        success: (res2) => {
          console.log(res2);
          if (res2.data.code == 200) {
            common_vendor.index.setStorageSync("token", res2.data.data.token);
            if (typeof callback === "function") {
              callback();
            } else {
              throw new Error("Callback must be a function");
            }
          } else if (res2.data.msg === "用户不存在，请先注册") {
            if (typeof fun === "function") {
              fun();
            } else {
              throw new Error("fun must be a function");
            }
          }
        },
        fail: (err) => {
          console.log(err);
        }
      });
    }
  });
};
const register = (name, className) => {
  common_vendor.index.login({
    provider: "weixin",
    success: (res) => {
      common_vendor.index.request({
        url: "https://turingteam.xyz:9642/register",
        method: "POST",
        data: {
          jsCode: res.code,
          name,
          className
        },
        success: (res2) => {
          console.log(res2);
          if (res2.data.code == 200) {
            common_vendor.index.setStorageSync("token", res2.data.data.token);
            common_vendor.index.showToast({
              title: "注册成功",
              mask: true
            });
          } else if (res2.data.code === 400) {
            common_vendor.index.showToast({
              title: res2.data.msg,
              icon: "error",
              mask: true
            });
          }
        }
      });
    }
  });
};
const login2 = () => {
  common_vendor.index.login({
    provider: "weixin",
    success: (res) => {
      common_vendor.index.request({
        url: "https://turingteam.xyz:9642/login",
        method: "GET",
        data: {
          jsCode: res.code
        },
        success: (res2) => {
          console.log(res2);
          if (res2.data.code == 200) {
            common_vendor.index.setStorageSync("token", res2.data.data.token);
          }
        },
        fail: (err) => {
          console.log(err);
        }
      });
    }
  });
};
exports.login = login;
exports.login2 = login2;
exports.register = register;
