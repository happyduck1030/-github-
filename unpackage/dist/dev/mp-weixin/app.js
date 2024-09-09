"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/history/history.js";
  "./pages/seat/seat.js";
  "./pages/rank/rank.js";
  "./pages/openDoor/openDoor.js";
  "./pages/chair/chair.js";
}
const _sfc_main = {
  // 全局的数据
  globalData: {
    lat: null,
    // 纬度
    lon: null,
    // 经度
    distance: null,
    // 距离
    isOP: false,
    // 开关门
    in: false
    // 是否在距离内
  },
  onLaunch: function() {
    console.warn("当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！");
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
