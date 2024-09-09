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
      isOpen: getApp().globalData.isOP,
      inner: getApp().globalData.in,
      operator: "图灵管理员",
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
    // 获取实验室状态
    getLabStatus() {
      common_vendor.index.request({
        url: "https://turingteam.xyz:9642/getLabStatus",
        method: "GET",
        success: (res) => {
          if (res.data.code === 200) {
            this.operator = res.data.data.operator;
          }
        },
        fail: (err) => {
          console.log(err);
        }
      });
    },
    open() {
      const token = common_vendor.index.getStorageSync("token");
      if (token == "") {
        utils_check.login(this.openDoor, this.showCustomModal);
        return;
      }
      this.openDoor();
    },
    // 开门
    openDoor() {
      const token = common_vendor.index.getStorageSync("token");
      common_vendor.index.request({
        url: "https://turingteam.xyz:9642/openLab",
        method: "PUT",
        header: {
          Authorization: token
        },
        success: (res) => {
          console.log(res);
          if (res.data.code === 200) {
            this.isOpen = res.data.data.status;
            this.operator = res.data.data.operator;
            getApp().globalData.isOP = res.data.data.status;
            common_vendor.index.showToast({
              title: "开门成功",
              icon: "success",
              mask: true
            });
          } else if (res.data.code === 403) {
            utils_check.login(this.openDoor, this.showCustomModal);
          }
        },
        fail: (err) => {
          console.log(err);
          common_vendor.index.showToast({
            title: "开门失败",
            icon: "fail"
          });
        }
      });
      setTimeout(() => {
        common_vendor.index.switchTab({
          url: "/pages/index/index"
        });
      }, 1500);
    },
    close() {
      const token = common_vendor.index.getStorageSync("token");
      if (token == "") {
        console.log("未登录");
        utils_check.login(this.closeDoor, this.showCustomModal);
        return;
      }
      this.closeDoor();
    },
    //关门
    closeDoor() {
      const token = common_vendor.index.getStorageSync("token");
      common_vendor.index.request({
        url: "https://turingclock.raqtpie.xyz:9642/closeLab",
        method: "PUT",
        header: {
          Authorization: token
        },
        success: (res) => {
          console.log(res);
          if (res.data.code === 200) {
            this.isOpen = res.data.data.status;
            this.operator = res.data.data.operator;
            getApp().globalData.isOP = res.data.data.status;
            common_vendor.index.showToast({
              title: "关门成功",
              icon: "success",
              mask: true
            });
          } else if (res.data.code === 403) {
            utils_check.login(this.closeDoor, this.showCustomModal);
          }
        },
        fail: (err) => {
          console.log(err);
          common_vendor.index.showToast({
            title: "关门失败",
            icon: "fail"
          });
        }
      });
      setTimeout(() => {
        common_vendor.index.switchTab({
          url: "/pages/index/index"
        });
      }, 1500);
    }
  },
  onShow() {
    this.getLabStatus();
  }
};
if (!Array) {
  const _component_CustomModal = common_vendor.resolveComponent("CustomModal");
  _component_CustomModal();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.isOpen
  }, $data.isOpen ? {
    b: common_vendor.t($data.operator)
  } : {}, {
    c: !$data.isOpen
  }, !$data.isOpen ? {
    d: common_vendor.t($data.operator)
  } : {}, {
    e: !$data.inner
  }, !$data.inner ? {} : {}, {
    f: $data.isOpen
  }, $data.isOpen ? {
    g: !$data.inner,
    h: common_vendor.o((...args) => $options.close && $options.close(...args))
  } : {}, {
    i: !$data.isOpen
  }, !$data.isOpen ? {
    j: !$data.inner,
    k: common_vendor.o((...args) => $options.open && $options.open(...args))
  } : {}, {
    l: common_vendor.o($options.handleConfirm),
    m: common_vendor.o($options.handleClose),
    n: $data.showModal
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
