"use strict";const s=require("../../common/vendor.js"),a={data:()=>({chairs:[{id:1,status:!1},{id:2,status:!1},{id:3,status:!1},{id:4,status:!1},{id:5,status:!1},{id:6,status:!1},{id:7,status:!1},{id:8,status:!1},{id:9,status:!1},{id:10,status:!1},{id:11,status:!1},{id:12,status:!1}],message:"",members:[{name:"李弢阳",type:"后端",id:0},{name:"胡锦康",type:"后端",id:1},{name:"张洋",type:"后端",id:2},{name:"曾建超",type:"后端",id:3},{name:"陈子航",type:"后端",id:4},{name:"郑志豪",type:"后端",id:5},{name:"黄昱煌",type:"CV",id:6},{name:"黎明智",type:"CV",id:7},{name:"黄日昇",type:"UI",id:8},{name:"吴苡瑕",type:"前端",id:9},{name:"黎翠儿",type:"前端",id:10},{name:"黄佰诚",type:"前端",id:11},{name:"彭玉丹",type:"前端",id:12},{name:"徐惠和",type:"NLP",id:13},{name:"冯旖旎",type:"NLP",id:14}]}),methods:{memberShow(s){this.message=s,this.$refs.popup.open("center")},machineShow(){this.message="设备",this.$refs.popup.open("center")},doorShow(){this.message="门",this.$refs.popup.open("center")},bookShow(){this.message="书柜",this.$refs.popup.open("center")},aircShow(){this.message="空调",this.$refs.popup.open("center")},printerShow(){this.message="打印机",this.$refs.popup.open("center")},waterShow(){this.message="饮水机",this.$refs.popup.open("center")},sitDown(a){s.index.navigateTo({url:`/pages/chair/chair?id=${a}`})},standUp(a){s.index.navigateTo({url:`/pages/chair/chair?id=${a}`})},getAllChair(){s.index.request({url:"https://turingteam.xyz:9642/getChair",method:"GET",success:s=>{200===s.data.code&&(this.chairs=s.data.data)}})}},onLoad(){s.index.startPullDownRefresh()},onShow(){s.index.startPullDownRefresh(),setTimeout((()=>{s.index.stopPullDownRefresh()}),1e3)},onPullDownRefresh(){setTimeout((()=>{this.getAllChair()}),700),setTimeout((()=>{s.index.stopPullDownRefresh()}),1e3)}};if(!Array){s.resolveComponent("uni-popup")()}Math;const t=s._export_sfc(a,[["render",function(a,t,e,o,r,i){return s.e({a:s.o(((...s)=>i.printerShow&&i.printerShow(...s))),b:s.o(((...s)=>i.doorShow&&i.doorShow(...s))),c:s.o(((...s)=>i.machineShow&&i.machineShow(...s))),d:s.t(r.members[5].name),e:s.o((s=>i.memberShow("姓名：郑志豪\n 方向 : 后端\n"))),f:s.t(r.members[14].name),g:s.o((s=>i.memberShow("姓名：冯旖旎\n  方向 : NLP\n"))),h:s.o((s=>i.memberShow(""))),i:s.t(r.members[9].name),j:s.o((s=>i.memberShow("姓名：吴苡瑕\n  方向 : 前端\n"))),k:s.t(r.members[10].name),l:s.o((s=>i.memberShow("姓名：黎翠儿\n  方向 : 前端\n"))),m:s.t(r.members[7].name),n:s.o((s=>i.memberShow("姓名：黎明智\n  方向 : CV\n"))),o:s.t(r.members[8].name),p:s.o((s=>i.memberShow("姓名：黄日昇\n  方向 : UI\n"))),q:s.t(r.members[13].name),r:s.o((s=>i.memberShow("姓名：徐惠和\n  方向 : NLP\n"))),s:s.o(((...s)=>i.aircShow&&i.aircShow(...s))),t:s.o(((...s)=>i.bookShow&&i.bookShow(...s))),v:!r.chairs[0].status},r.chairs[0].status?{}:{w:s.o((s=>i.sitDown(1)))},{x:r.chairs[0].status},r.chairs[0].status?{y:s.o((s=>i.standUp(1)))}:{},{z:!r.chairs[1].status},r.chairs[1].status?{}:{A:s.o((s=>i.sitDown(2)))},{B:r.chairs[1].status},r.chairs[1].status?{C:s.o((s=>i.standUp(2)))}:{},{D:!r.chairs[2].status},r.chairs[2].status?{}:{E:s.o((s=>i.sitDown(3)))},{F:r.chairs[2].status},r.chairs[2].status?{G:s.o((s=>i.standUp(3)))}:{},{H:!r.chairs[5].status},r.chairs[5].status?{}:{I:s.o((s=>i.sitDown(6)))},{J:r.chairs[5].status},r.chairs[5].status?{K:s.o((s=>i.standUp(6)))}:{},{L:!r.chairs[4].status},r.chairs[4].status?{}:{M:s.o((s=>i.sitDown(5)))},{N:r.chairs[4].status},r.chairs[4].status?{O:s.o((s=>i.standUp(5)))}:{},{P:!r.chairs[3].status},r.chairs[3].status?{}:{Q:s.o((s=>i.sitDown(4)))},{R:r.chairs[3].status},r.chairs[3].status?{S:s.o((s=>i.standUp(4)))}:{},{T:!r.chairs[6].status},r.chairs[6].status?{}:{U:s.o((s=>i.sitDown(7)))},{V:r.chairs[6].status},r.chairs[6].status?{W:s.o((s=>i.standUp(7)))}:{},{X:!r.chairs[7].status},r.chairs[7].status?{}:{Y:s.o((s=>i.sitDown(8)))},{Z:r.chairs[7].status},r.chairs[7].status?{aa:s.o((s=>i.standUp(8)))}:{},{ab:!r.chairs[8].status},r.chairs[8].status?{}:{ac:s.o((s=>i.sitDown(9)))},{ad:r.chairs[8].status},r.chairs[8].status?{ae:s.o((s=>i.standUp(9)))}:{},{af:!r.chairs[11].status},r.chairs[11].status?{}:{ag:s.o((s=>i.sitDown(12)))},{ah:r.chairs[11].status},r.chairs[11].status?{ai:s.o((s=>i.standUp(12)))}:{},{aj:!r.chairs[10].status},r.chairs[10].status?{}:{ak:s.o((s=>i.sitDown(11)))},{al:r.chairs[10].status},r.chairs[10].status?{am:s.o((s=>i.standUp(11)))}:{},{an:!r.chairs[9].status},r.chairs[9].status?{}:{ao:s.o((s=>i.sitDown(10)))},{ap:r.chairs[9].status},r.chairs[9].status?{aq:s.o((s=>i.standUp(10)))}:{},{ar:s.t(r.members[1].name),as:s.o((s=>i.memberShow("姓名：胡锦康\n  方向 : 后端\n"))),at:s.t(r.members[11].name),av:s.o((s=>i.memberShow("姓名：黄佰诚\n  方向 : 前端\n"))),aw:s.o((s=>i.memberShow("成员工位"))),ax:s.t(r.members[12].name),ay:s.o((s=>i.memberShow("姓名：彭玉丹\n  方向 : 前端\n"))),az:s.t(r.members[4].name),aA:s.o((s=>i.memberShow("姓名：陈子航\n  方向 : 后端\n"))),aB:s.t(r.members[3].name),aC:s.o((s=>i.memberShow("姓名：曾建超\n  方向 : 后端\n"))),aD:s.t(r.members[2].name),aE:s.o((s=>i.memberShow("姓名：张洋\n  方向 : 后端\n"))),aF:s.t(r.members[6].name),aG:s.o((s=>i.memberShow("姓名：黄昱煌\n  方向 : CV\n"))),aH:s.o(((...s)=>i.doorShow&&i.doorShow(...s))),aI:s.o(((...s)=>i.waterShow&&i.waterShow(...s))),aJ:s.o(((...s)=>i.doorShow&&i.doorShow(...s))),aK:s.t(r.members[0].name),aL:s.o((s=>i.memberShow("姓名：李弢阳\n 方向 : 后端\n "))),aM:s.o(((...s)=>i.aircShow&&i.aircShow(...s))),aN:s.t(r.message),aO:s.sr("popup","b3a76cba-0")})}]]);wx.createPage(t);
