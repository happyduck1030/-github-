"use strict";const e=require("../common/vendor.js");exports.login=(o,t)=>{e.index.login({provider:"weixin",success:s=>{e.index.request({url:"https://turingteam.xyz:9642/login",method:"GET",data:{jsCode:s.code},success:s=>{if(console.log(s),200==s.data.code){if(e.index.setStorageSync("token",s.data.data.token),"function"!=typeof o)throw new Error("Callback must be a function");o()}else if("用户不存在，请先注册"===s.data.msg){if("function"!=typeof t)throw new Error("fun must be a function");t()}},fail:e=>{console.log(e)}})}})},exports.login2=()=>{e.index.login({provider:"weixin",success:o=>{e.index.request({url:"https://turingteam.xyz:9642/login",method:"GET",data:{jsCode:o.code},success:o=>{console.log(o),200==o.data.code&&e.index.setStorageSync("token",o.data.data.token)},fail:e=>{console.log(e)}})}})},exports.register=(o,t)=>{e.index.login({provider:"weixin",success:s=>{e.index.request({url:"https://turingteam.xyz:9642/register",method:"POST",data:{jsCode:s.code,name:o,className:t},success:o=>{console.log(o),200==o.data.code?(e.index.setStorageSync("token",o.data.data.token),e.index.showToast({title:"注册成功",mask:!0})):400===o.data.code&&e.index.showToast({title:o.data.msg,icon:"error",mask:!0})}})}})};