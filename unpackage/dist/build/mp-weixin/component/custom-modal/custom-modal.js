"use strict";const i=require("../../common/vendor.js"),t=require("../../common/assets.js"),n={data:()=>({inputValue1:"",inputValue2:"",warning1:!1,warning2:!1,isActive:!1}),methods:{confirm(){const t=this.inputValue1,n=this.inputValue2;if(""==t||""==n)return i.index.showToast({title:"格式不能为空",icon:"error",mask:!0,duration:1e3}),this.warning1=""==t,void(this.warning2=""==n);this.$emit("confirm",{name:t,className:n}),this.$emit("close")},cancel(){this.$emit("cancel"),this.$emit("close")},isEmpty1(){""===this.inputValue1?this.warning1=!0:this.warning1=!1},isEmpty2(){""===this.inputValue2?this.warning2=!0:this.warning2=!1},showImg(){this.isActive=!0},hideImg(){this.isActive=!1}},onShow(){this.warning1=!1,this.warning2=!1}};const e=i._export_sfc(n,[["render",function(n,e,s,a,o,r){return{a:i.o([i=>o.inputValue1=i.detail.value,(...i)=>r.isEmpty1&&r.isEmpty1(...i)]),b:i.o(((...i)=>r.showImg&&r.showImg(...i))),c:o.inputValue1,d:t._imports_0$3,e:i.n(o.isActive?"active":""),f:o.warning1,g:i.o([i=>o.inputValue2=i.detail.value,(...i)=>r.isEmpty2&&r.isEmpty2(...i)]),h:i.o(((...i)=>r.hideImg&&r.hideImg(...i))),i:o.inputValue2,j:o.warning2,k:i.o(((...i)=>r.cancel&&r.cancel(...i))),l:i.o(((...i)=>r.confirm&&r.confirm(...i)))}}],["__scopeId","data-v-b7d26443"]]);wx.createComponent(e);