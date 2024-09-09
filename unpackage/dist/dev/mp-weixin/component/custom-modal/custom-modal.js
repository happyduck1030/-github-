"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      inputValue1: "",
      inputValue2: "",
      warning1: false,
      warning2: false,
      isActive: false
    };
  },
  methods: {
    confirm() {
      const name = this.inputValue1;
      const className = this.inputValue2;
      if (name == "" || className == "") {
        common_vendor.index.showToast({
          title: "格式不能为空",
          icon: "error",
          mask: true,
          duration: 1e3
        });
        if (name == "") {
          this.warning1 = true;
        } else {
          this.warning1 = false;
        }
        if (className == "") {
          this.warning2 = true;
        } else {
          this.warning2 = false;
        }
        return;
      }
      this.$emit("confirm", { name, className });
      this.$emit("close");
    },
    cancel() {
      this.$emit("cancel");
      this.$emit("close");
    },
    isEmpty1() {
      if (this.inputValue1 === "") {
        this.warning1 = true;
      } else {
        this.warning1 = false;
      }
    },
    isEmpty2() {
      if (this.inputValue2 === "") {
        this.warning2 = true;
      } else {
        this.warning2 = false;
      }
    },
    showImg() {
      this.isActive = true;
    },
    hideImg() {
      this.isActive = false;
    }
  },
  onShow() {
    this.warning1 = false;
    this.warning2 = false;
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o([($event) => $data.inputValue1 = $event.detail.value, (...args) => $options.isEmpty1 && $options.isEmpty1(...args)]),
    b: common_vendor.o((...args) => $options.showImg && $options.showImg(...args)),
    c: $data.inputValue1,
    d: common_assets._imports_0$3,
    e: common_vendor.n($data.isActive ? "active" : ""),
    f: $data.warning1,
    g: common_vendor.o([($event) => $data.inputValue2 = $event.detail.value, (...args) => $options.isEmpty2 && $options.isEmpty2(...args)]),
    h: common_vendor.o((...args) => $options.hideImg && $options.hideImg(...args)),
    i: $data.inputValue2,
    j: $data.warning2,
    k: common_vendor.o((...args) => $options.cancel && $options.cancel(...args)),
    l: common_vendor.o((...args) => $options.confirm && $options.confirm(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a707f8d2"]]);
wx.createComponent(Component);
