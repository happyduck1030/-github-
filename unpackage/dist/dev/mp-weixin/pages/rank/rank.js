"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      totalRecord: []
    };
  },
  methods: {
    getRecord() {
      common_vendor.index.request({
        url: "https://turingteam.xyz:9642/getRecord",
        method: "GET",
        success: (res) => {
          if (res.data.code === 200) {
            this.totalRecord = res.data.data;
          }
        }
      });
    }
  },
  onLoad() {
    this.getRecord();
  }
};
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.totalRecord.length == 0
  }, $data.totalRecord.length == 0 ? {
    b: common_assets._imports_0
  } : {
    c: common_vendor.f($data.totalRecord, (item, index, i0) => {
      return {
        a: common_vendor.t(item.username),
        b: common_vendor.t(item.totalCount),
        c: common_vendor.t(item.totalTime),
        d: index,
        e: "6c20da03-3-" + i0 + ",6c20da03-2"
      };
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
