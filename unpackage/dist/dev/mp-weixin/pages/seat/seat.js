"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      chairs: [
        { id: 1, status: false },
        { id: 2, status: false },
        { id: 3, status: false },
        { id: 4, status: false },
        { id: 5, status: false },
        { id: 6, status: false },
        { id: 7, status: false },
        { id: 8, status: false },
        { id: 9, status: false },
        { id: 10, status: false },
        { id: 11, status: false },
        { id: 12, status: false }
      ],
      message: "",
      members: [
        { "name": "李弢阳", "type": "后端", "id": 0 },
        { "name": "胡锦康", "type": "后端", "id": 1 },
        { "name": "张洋", "type": "后端", "id": 2 },
        { "name": "曾建超", "type": "后端", "id": 3 },
        { "name": "陈子航", "type": "后端", "id": 4 },
        { "name": "郑志豪", "type": "后端", "id": 5 },
        { "name": "黄昱煌", "type": "CV", "id": 6 },
        { "name": "黎明智", "type": "CV", "id": 7 },
        { "name": "黄日昇", "type": "UI", "id": 8 },
        { "name": "吴苡瑕", "type": "前端", "id": 9 },
        { "name": "黎翠儿", "type": "前端", "id": 10 },
        { "name": "黄佰诚", "type": "前端", "id": 11 },
        { "name": "彭玉丹", "type": "前端", "id": 12 },
        { "name": "徐惠和", "type": "NLP", "id": 13 },
        { "name": "冯旖旎", "type": "NLP", "id": 14 }
      ]
    };
  },
  methods: {
    // 工位
    memberShow(message) {
      this.message = message;
      this.$refs.popup.open("center");
    },
    // 设备
    machineShow() {
      this.message = "设备";
      this.$refs.popup.open("center");
    },
    // 门
    doorShow() {
      this.message = "门";
      this.$refs.popup.open("center");
    },
    // 书柜
    bookShow() {
      this.message = "书柜";
      this.$refs.popup.open("center");
    },
    // 空调
    aircShow() {
      this.message = "空调";
      this.$refs.popup.open("center");
    },
    // 打印机
    printerShow() {
      this.message = "打印机";
      this.$refs.popup.open("center");
    },
    // 饮水机
    waterShow() {
      this.message = "饮水机";
      this.$refs.popup.open("center");
    },
    // 坐下
    sitDown(id) {
      common_vendor.index.navigateTo({
        url: `/pages/chair/chair?id=${id}`
      });
    },
    //起立
    standUp(id) {
      common_vendor.index.navigateTo({
        url: `/pages/chair/chair?id=${id}`
      });
    },
    // 获取所有椅子状态
    getAllChair() {
      common_vendor.index.request({
        url: "https://turingteam.xyz:9642/getChair",
        method: "GET",
        success: (res) => {
          if (res.data.code === 200) {
            this.chairs = res.data.data;
          }
        }
      });
    }
  },
  onLoad() {
    common_vendor.index.startPullDownRefresh();
  },
  onShow() {
    common_vendor.index.startPullDownRefresh();
    setTimeout(() => {
      common_vendor.index.stopPullDownRefresh();
    }, 1e3);
  },
  onPullDownRefresh() {
    setTimeout(() => {
      this.getAllChair();
    }, 700);
    setTimeout(() => {
      common_vendor.index.stopPullDownRefresh();
    }, 1e3);
  }
};
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.printerShow && $options.printerShow(...args)),
    b: common_vendor.o((...args) => $options.doorShow && $options.doorShow(...args)),
    c: common_vendor.o((...args) => $options.machineShow && $options.machineShow(...args)),
    d: common_vendor.t($data.members[5].name),
    e: common_vendor.o(($event) => $options.memberShow("姓名：郑志豪\n 方向 : 后端\n")),
    f: common_vendor.t($data.members[14].name),
    g: common_vendor.o(($event) => $options.memberShow("姓名：冯旖旎\n  方向 : NLP\n")),
    h: common_vendor.o(($event) => $options.memberShow("")),
    i: common_vendor.t($data.members[9].name),
    j: common_vendor.o(($event) => $options.memberShow("姓名：吴苡瑕\n  方向 : 前端\n")),
    k: common_vendor.t($data.members[10].name),
    l: common_vendor.o(($event) => $options.memberShow("姓名：黎翠儿\n  方向 : 前端\n")),
    m: common_vendor.t($data.members[7].name),
    n: common_vendor.o(($event) => $options.memberShow("姓名：黎明智\n  方向 : CV\n")),
    o: common_vendor.t($data.members[8].name),
    p: common_vendor.o(($event) => $options.memberShow("姓名：黄日昇\n  方向 : UI\n")),
    q: common_vendor.t($data.members[13].name),
    r: common_vendor.o(($event) => $options.memberShow("姓名：徐惠和\n  方向 : NLP\n")),
    s: common_vendor.o((...args) => $options.aircShow && $options.aircShow(...args)),
    t: common_vendor.o((...args) => $options.bookShow && $options.bookShow(...args)),
    v: !$data.chairs[0].status
  }, !$data.chairs[0].status ? {
    w: common_vendor.o(($event) => $options.sitDown(1))
  } : {}, {
    x: $data.chairs[0].status
  }, $data.chairs[0].status ? {
    y: common_vendor.o(($event) => $options.standUp(1))
  } : {}, {
    z: !$data.chairs[1].status
  }, !$data.chairs[1].status ? {
    A: common_vendor.o(($event) => $options.sitDown(2))
  } : {}, {
    B: $data.chairs[1].status
  }, $data.chairs[1].status ? {
    C: common_vendor.o(($event) => $options.standUp(2))
  } : {}, {
    D: !$data.chairs[2].status
  }, !$data.chairs[2].status ? {
    E: common_vendor.o(($event) => $options.sitDown(3))
  } : {}, {
    F: $data.chairs[2].status
  }, $data.chairs[2].status ? {
    G: common_vendor.o(($event) => $options.standUp(3))
  } : {}, {
    H: !$data.chairs[5].status
  }, !$data.chairs[5].status ? {
    I: common_vendor.o(($event) => $options.sitDown(6))
  } : {}, {
    J: $data.chairs[5].status
  }, $data.chairs[5].status ? {
    K: common_vendor.o(($event) => $options.standUp(6))
  } : {}, {
    L: !$data.chairs[4].status
  }, !$data.chairs[4].status ? {
    M: common_vendor.o(($event) => $options.sitDown(5))
  } : {}, {
    N: $data.chairs[4].status
  }, $data.chairs[4].status ? {
    O: common_vendor.o(($event) => $options.standUp(5))
  } : {}, {
    P: !$data.chairs[3].status
  }, !$data.chairs[3].status ? {
    Q: common_vendor.o(($event) => $options.sitDown(4))
  } : {}, {
    R: $data.chairs[3].status
  }, $data.chairs[3].status ? {
    S: common_vendor.o(($event) => $options.standUp(4))
  } : {}, {
    T: !$data.chairs[6].status
  }, !$data.chairs[6].status ? {
    U: common_vendor.o(($event) => $options.sitDown(7))
  } : {}, {
    V: $data.chairs[6].status
  }, $data.chairs[6].status ? {
    W: common_vendor.o(($event) => $options.standUp(7))
  } : {}, {
    X: !$data.chairs[7].status
  }, !$data.chairs[7].status ? {
    Y: common_vendor.o(($event) => $options.sitDown(8))
  } : {}, {
    Z: $data.chairs[7].status
  }, $data.chairs[7].status ? {
    aa: common_vendor.o(($event) => $options.standUp(8))
  } : {}, {
    ab: !$data.chairs[8].status
  }, !$data.chairs[8].status ? {
    ac: common_vendor.o(($event) => $options.sitDown(9))
  } : {}, {
    ad: $data.chairs[8].status
  }, $data.chairs[8].status ? {
    ae: common_vendor.o(($event) => $options.standUp(9))
  } : {}, {
    af: !$data.chairs[11].status
  }, !$data.chairs[11].status ? {
    ag: common_vendor.o(($event) => $options.sitDown(12))
  } : {}, {
    ah: $data.chairs[11].status
  }, $data.chairs[11].status ? {
    ai: common_vendor.o(($event) => $options.standUp(12))
  } : {}, {
    aj: !$data.chairs[10].status
  }, !$data.chairs[10].status ? {
    ak: common_vendor.o(($event) => $options.sitDown(11))
  } : {}, {
    al: $data.chairs[10].status
  }, $data.chairs[10].status ? {
    am: common_vendor.o(($event) => $options.standUp(11))
  } : {}, {
    an: !$data.chairs[9].status
  }, !$data.chairs[9].status ? {
    ao: common_vendor.o(($event) => $options.sitDown(10))
  } : {}, {
    ap: $data.chairs[9].status
  }, $data.chairs[9].status ? {
    aq: common_vendor.o(($event) => $options.standUp(10))
  } : {}, {
    ar: common_vendor.t($data.members[1].name),
    as: common_vendor.o(($event) => $options.memberShow("姓名：胡锦康\n  方向 : 后端\n")),
    at: common_vendor.t($data.members[11].name),
    av: common_vendor.o(($event) => $options.memberShow("姓名：黄佰诚\n  方向 : 前端\n")),
    aw: common_vendor.o(($event) => $options.memberShow("成员工位")),
    ax: common_vendor.t($data.members[12].name),
    ay: common_vendor.o(($event) => $options.memberShow("姓名：彭玉丹\n  方向 : 前端\n")),
    az: common_vendor.t($data.members[4].name),
    aA: common_vendor.o(($event) => $options.memberShow("姓名：陈子航\n  方向 : 后端\n")),
    aB: common_vendor.t($data.members[3].name),
    aC: common_vendor.o(($event) => $options.memberShow("姓名：曾建超\n  方向 : 后端\n")),
    aD: common_vendor.t($data.members[2].name),
    aE: common_vendor.o(($event) => $options.memberShow("姓名：张洋\n  方向 : 后端\n")),
    aF: common_vendor.t($data.members[6].name),
    aG: common_vendor.o(($event) => $options.memberShow("姓名：黄昱煌\n  方向 : CV\n")),
    aH: common_vendor.o((...args) => $options.doorShow && $options.doorShow(...args)),
    aI: common_vendor.o((...args) => $options.waterShow && $options.waterShow(...args)),
    aJ: common_vendor.o((...args) => $options.doorShow && $options.doorShow(...args)),
    aK: common_vendor.t($data.members[0].name),
    aL: common_vendor.o(($event) => $options.memberShow("姓名：李弢阳\n 方向 : 后端\n ")),
    aM: common_vendor.o((...args) => $options.aircShow && $options.aircShow(...args)),
    aN: common_vendor.t($data.message),
    aO: common_vendor.sr("popup", "b3a76cba-0")
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
