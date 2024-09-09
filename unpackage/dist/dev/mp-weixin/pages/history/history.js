"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_check = require("../../utils/check.js");
const common_assets = require("../../common/assets.js");
const CustomModal = () => "../../component/custom-modal/custom-modal.js";
const _sfc_main = {
  components: {
    CustomModal
  },
  data() {
    return {
      yesterdayRecord: [],
      personalRecord: [],
      todayTime: 0,
      totalTime: 0,
      name: "",
      className: "",
      showModal: false
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
    // 加载更多
    showPersonalRecord() {
      const token = common_vendor.index.getStorageSync("token");
      if (token == "") {
        console.log("未登录");
        utils_check.login(this.getPersonalRecord, this.showCustomModal);
        return;
      }
      this.getPersonalRecord();
    },
    // 获取个人信息
    getUserInfo() {
      const token = common_vendor.index.getStorageSync("token");
      if (token == "") {
        return;
      }
      common_vendor.index.request({
        url: "https://turingteam.xyz:9642/getUserInfo",
        method: "GET",
        header: {
          Authorization: token
        },
        success: (res) => {
          if (res.data.code === 200) {
            this.name = res.data.data.name;
            this.className = res.data.data.className;
          } else if (res.data.code === 403) {
            utils_check.login(this.getUserInfo, this.showCustomModal);
          }
        },
        fail: (err) => {
          console.log(err);
        }
      });
    },
    // 获取昨日记录
    getYesterdayRecord() {
      common_vendor.index.request({
        url: "https://turingteam.xyz:9642/getRecordYesterday",
        method: "GET",
        success: (res) => {
          if (res.data.code === 200) {
            this.yesterdayRecord = res.data.data;
          }
        }
      });
    },
    // 获取个人历史总时长
    getPersonalTotalTime() {
      const token = common_vendor.index.getStorageSync("token");
      if (token == "") {
        return;
      }
      common_vendor.index.request({
        url: "https://turingteam.xyz:9642/getTotalTimeByUserId",
        method: "GET",
        header: {
          Authorization: token
        },
        success: (res) => {
          if (res.data.code === 200) {
            this.totalTime = res.data.data.totalTime;
          } else if (res.data.code === 403) {
            utils_check.login(this.getPersonalTotalTime, this.showCustomModal);
          }
        },
        fail: (err) => {
          console.log(err);
        }
      });
    },
    // 获取个人纪录
    getPersonalRecord() {
      const token = common_vendor.index.getStorageSync("token");
      if (token == "") {
        return;
      }
      common_vendor.index.request({
        url: "https://turingteam.xyz:9642/getRecordByUserId",
        method: "GET",
        header: {
          Authorization: token
        },
        success: (res) => {
          if (res.data.code === 200) {
            this.personalRecord = res.data.data;
          } else if (res.data.code === 403) {
            utils_check.login(this.getPersonalRecord, this.showCustomModal);
          }
        },
        fail: (err) => {
          console.log(err);
        }
      });
    },
    // 获取个人今日学习时长
    getTodayRecord() {
      const token = common_vendor.index.getStorageSync("token");
      if (token == "") {
        return;
      }
      common_vendor.index.request({
        url: "https://turingteam.xyz:9642/getTotalTimeByUserIdToday",
        method: "GET",
        header: {
          Authorization: token
        },
        success: (res) => {
          if (res.data.code === 200) {
            this.todayTime = res.data.data.totalTime;
          } else if (res.data.code === 403) {
            utils_check.login(this.getTodayRecord, this.showCustomModal);
          }
        },
        fail: (err) => {
          console.log(err);
        }
      });
    }
  },
  // 进入页面
  onShow() {
    this.getYesterdayRecord();
    this.getTodayRecord();
    this.getPersonalRecord();
    this.getPersonalTotalTime();
    this.getUserInfo();
  },
  // 刷新
  onPullDownRefresh() {
    this.getYesterdayRecord();
    this.getTodayRecord();
    this.getPersonalRecord();
    this.getPersonalTotalTime();
    this.getUserInfo();
    setTimeout(() => {
      common_vendor.index.stopPullDownRefresh();
    }, 1e3);
  }
};
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _component_CustomModal = common_vendor.resolveComponent("CustomModal");
  (_easycom_uni_list_item2 + _easycom_uni_list2 + _component_CustomModal)();
}
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      title: "总排名",
      showArrow: true,
      link: "navigateTo",
      to: "../rank/rank"
    }),
    b: common_vendor.p({
      border: false
    }),
    c: $data.yesterdayRecord.length == 0
  }, $data.yesterdayRecord.length == 0 ? {} : {
    d: common_vendor.f($data.yesterdayRecord.slice(0, 4), (item, index, i0) => {
      return {
        a: common_vendor.t(item.username),
        b: common_vendor.t(item.totalTime),
        c: index
      };
    })
  }, {
    e: common_assets._imports_0$1,
    f: common_vendor.t($data.todayTime),
    g: common_vendor.p({
      border: false
    }),
    h: common_vendor.t($data.name != "" && $data.className != "" ? $data.name + " | " + $data.className : "历史记录"),
    i: $data.name != "" && $data.className != ""
  }, $data.name != "" && $data.className != "" ? {} : {}, {
    j: common_vendor.t($data.totalTime),
    k: common_vendor.p({
      border: false
    }),
    l: $data.personalRecord.length == 0
  }, $data.personalRecord.length == 0 ? {
    m: common_assets._imports_0,
    n: common_vendor.o((...args) => $options.showPersonalRecord && $options.showPersonalRecord(...args))
  } : {
    o: common_vendor.f($data.personalRecord, (item, index, i0) => {
      return {
        a: common_vendor.t(item.chairId),
        b: common_vendor.t(item.date),
        c: common_vendor.t(item.time),
        d: index,
        e: "50e3fded-7-" + i0 + ",50e3fded-6"
      };
    })
  }, {
    p: common_vendor.o($options.handleConfirm),
    q: common_vendor.o($options.handleClose),
    r: $data.showModal
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
