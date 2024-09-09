"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_check = require("../../utils/check.js");
const CustomModal = () => "../../component/custom-modal/custom-modal.js";
const _sfc_main = {
  components: {
    CustomModal
  },
  data() {
    return {
      // 地图经纬度、缩放、圆
      latitude: 21.15375,
      longitude: 110.2965,
      scale: 18,
      circles: [{
        id: 1,
        latitude: 21.15375,
        longitude: 110.2965,
        radius: 55,
        fillColor: "#00000011",
        color: "#74b9ff",
        strokeWidth: 2
      }],
      showModal: false,
      isOpen: getApp().globalData.isOP,
      inner: getApp().globalData.in
    };
  },
  methods: {
    // 显示自定义模态对话框
    showCustomModal() {
      this.showModal = true;
    },
    // 处理用户点击自定义模态对话框的确认按钮的逻辑
    handleConfirm(data) {
      utils_check.register(data.name, data.className);
      this.showModal = false;
    },
    // 处理用户关闭自定义模态对话框的逻辑
    handleClose() {
      this.showModal = false;
    },
    // 去开门
    toOpenDoor() {
      common_vendor.index.navigateTo({
        url: "/pages/openDoor/openDoor"
      });
    },
    // 订阅开门通知
    subscribe() {
      const token = common_vendor.index.getStorageSync("token");
      if (token == "") {
        this.showCustomModal();
        return;
      }
      common_vendor.index.getSetting({
        withSubscriptions: true,
        success: (res) => {
          console.log(res.authSetting);
          console.log(res.subscriptionsSetting);
        }
      });
      common_vendor.index.showModal({
        content: "勾选“保持选择”后，每次打卡可接收下一次的开门通知。",
        cancelText: "取消",
        cancelColor: "red",
        confirmText: "我会勾选",
        confirmColor: "#409EFE",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.requestSubscribeMessage({
              tmplIds: ["YT5WwUDkbE2OaixVEi8xPzwvvyCOQH7Q_SJSb3wGq-c"],
              complete: (res2) => {
                console.log(res2);
                if (res2["YT5WwUDkbE2OaixVEi8xPzwvvyCOQH7Q_SJSb3wGq-c"] === "accept") {
                  console.log("isok");
                  const token2 = common_vendor.index.getStorageSync("token");
                  common_vendor.index.request({
                    url: "https://turingteam.xyz:9642/subscribeMsg",
                    method: "PUT",
                    header: {
                      Authorization: token2
                    },
                    success: (res3) => {
                      console.log(res3);
                      if (res3.data.code === 200) {
                        common_vendor.index.showToast({
                          title: res3.data.msg
                        });
                      }
                    },
                    fail: (err) => {
                      console.log(err);
                    }
                  });
                }
              }
            });
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    },
    // 打卡
    scanCode() {
      const token = common_vendor.index.getStorageSync("token");
      if (token == "") {
        console.log("未登录");
        utils_check.login(this.scanCode, this.showCustomModal);
        return;
      }
      common_vendor.index.scanCode({
        onlyFromCamera: true,
        success: (res) => {
          if (res.path[0] == "/") {
            common_vendor.index.reLaunch({
              url: res.path
            });
          } else {
            common_vendor.index.reLaunch({
              url: "/" + res.path
            });
          }
        }
      });
    },
    // 获取开关门
    getLabStatus() {
      common_vendor.index.request({
        url: "https://turingteam.xyz:9642/getLabStatus",
        method: "GET",
        success: (res) => {
          if (res.data.code === 200) {
            this.isOpen = res.data.data.status;
            getApp().globalData.isOP = res.data.data.status;
          }
        },
        fail: (err) => {
          console.log(err);
        }
      });
    },
    // 定位
    getPersonalLocation(res) {
      common_vendor.index.getLocation({
        type: "gcj02",
        // geocode:true,
        success: (res2) => {
          let latitude = res2.latitude;
          let longitude = res2.longitude;
          let position = this.caldistance(latitude, longitude);
          this.inner = position;
          getApp().globalData.in = position;
        },
        fail: function(res2) {
          console.log("定位失败");
          console.log(res2);
        }
      });
    },
    // 计算距离
    caldistance(lat1, lng1, lat2 = this.circles[0].latitude, lng2 = this.circles[0].longitude) {
      if (lat1 == null) {
        return false;
      }
      getApp().globalData.lat = lat1;
      getApp().globalData.lon = lng1;
      var radLat1 = lat1 * Math.PI / 180;
      var radLat2 = lat2 * Math.PI / 180;
      var a = radLat1 - radLat2;
      var b = lng1 * Math.PI / 180 - lng2 * Math.PI / 180;
      var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
      s = s * 6378.137;
      s = Math.round(s * 1e4) / 1e4;
      getApp().globalData.distance = s * 1e3;
      return s * 1e3 <= this.circles[0].radius ? true : false;
    }
  },
  // 页面初始化
  onLoad() {
    common_vendor.index.clearStorage();
    this.getLabStatus();
    const token = common_vendor.index.getStorageSync("token");
    if (token == "") {
      utils_check.login2();
    }
  },
  // 监听页面加载
  onShow() {
    this.getPersonalLocation();
    this.getLabStatus();
    let map = common_vendor.index.createMapContext("map");
    map.setCenterOffset({
      offset: [0.5, 0.35]
    });
    setInterval(() => {
      this.getPersonalLocation();
    }, 1500);
  },
  // 监听分享
  onShareAppMessage() {
    return {
      title: "图灵实验室打卡",
      path: "/pages/index/index",
      //用户点开后的默认页面，我默认为首页
      imageUrl: "/static/images/turing.jpg",
      //自定义图片的地址
      success(res) {
        console.log(res);
        console.log("分享成功！");
      }
    };
  },
  //分享到朋友圈
  onShareTimeline() {
    return {
      title: "图灵实验室打卡",
      path: "/pages/index/index",
      imageUrl: "/static/images/turing.jpg",
      success(res) {
        console.log(res);
        console.log("分享成功！");
      }
    };
  }
};
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_uni_notice_bar2 = common_vendor.resolveComponent("uni-notice-bar");
  const _component_CustomModal = common_vendor.resolveComponent("CustomModal");
  (_easycom_uni_nav_bar2 + _easycom_uni_notice_bar2 + _component_CustomModal)();
}
const _easycom_uni_nav_bar = () => "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_uni_notice_bar = () => "../../uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_uni_notice_bar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.subscribe && $options.subscribe(...args)),
    b: common_vendor.p({
      fixed: true,
      ["status-bar"]: true,
      border: false,
      leftWidth: "140rpx"
    }),
    c: common_vendor.o($options.toOpenDoor),
    d: common_vendor.p({
      single: true,
      color: !$data.isOpen ? "#fff" : "#00917c",
      ["background-color"]: !$data.isOpen ? "red" : "#caf7e3",
      text: !$data.isOpen ? "暂未开门，请在群里询问或点此修正开门状态" : "实验室已开门，点此修正开门状态",
      ["right-icon"]: "forward"
    }),
    e: common_vendor.t($data.inner ? "打卡" : "未进入范围"),
    f: common_vendor.o((...args) => $options.scanCode && $options.scanCode(...args)),
    g: !$data.inner,
    h: common_vendor.o($options.handleConfirm),
    i: common_vendor.o($options.handleClose),
    j: $data.showModal,
    k: $data.latitude,
    l: $data.longitude,
    m: $data.scale,
    n: $data.circles
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
