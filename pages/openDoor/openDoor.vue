<template>
	<view class="page-section">
		<view class="tips">
			<view v-if="isOpen">上一次开门：{{operator}} </view>
			<view v-if="!isOpen">上一次关门：{{operator}} </view>
		</view>
		
		<view v-if="!inner" class="red">
		  <view style="margin: 5px;">未获取到位置信息或不在范围内，</view>
		  <view style="margin: 5px;">请返回主界面重新定位</view>
		  
		</view>
		
		<!-- 关门按钮 -->
		<button :disabled="!inner" class="btn close" v-if="isOpen" hover-stop-propagation @click="close">
		  关门
		</button>
		
		<!-- 开门按钮 -->
		<button :disabled="!inner" class="btn open" v-if="!isOpen" hover-stop-propagation @click="open">
		  开门
		</button>
		
		<text class="tips">
		  每晚11:30自动关门，第二天需手动开门
		
		</text>
		<CustomModal @confirm="handleConfirm" @close="handleClose" v-show="showModal"/>
	</view>
</template>

<script>
	import CustomModal from "@/component/custom-modal/custom-modal.vue";
	import {login, register} from "/utils/check.js"
	export default {
		components: {
			CustomModal,
		},
		data() {
			return {
				isOpen: getApp().globalData.isOP,
				inner: getApp().globalData.in,
				operator: "图灵管理员",
				showModal: false,
			}
		},
		methods: {
			// 显示自定义模态对话框
			showCustomModal() {
			  // 打开模态对话框
			  this.showModal = true;
			},
					
			// 处理用户点击自定义模态对话框的确认按钮的逻辑
			handleConfirm(data) {
				// console.log(data);
				//注册
				register(data.name,data.className);
				// 关闭模态对话框
				this.showModal = false;
			},
					
			// 处理用户关闭自定义模态对话框的逻辑
			handleClose() {
			  // 处理关闭操作
			  this.showModal = false;
			},
			
			// 获取实验室状态
			getLabStatus(){
				uni.request({
					url:"https://turingteam.xyz:9642/getLabStatus",
					method:"GET",
					success:(res)=>{
						if(res.data.code === 200){
							this.operator = res.data.data.operator;
						}
					},
					fail:(err)=>{
						console.log(err);
					}
				})
			},
			
			open() {
				const token = uni.getStorageSync("token");
				if(token == ""){
					// console.log("未登录");
					login(this.openDoor,this.showCustomModal);
					return;
				}
				this.openDoor();
			},
			
			// 开门
			openDoor(){
				const token = uni.getStorageSync("token")
				uni.request({
					url:"https://turingteam.xyz:9642/openLab",
					method:"PUT",
					header:{
						Authorization:token
					},
					success: (res) => {
						console.log(res);
						if(res.data.code === 200){
							this.isOpen = res.data.data.status;
							this.operator = res.data.data.operator;
							getApp().globalData.isOP = res.data.data.status;
							uni.showToast({
								title:"开门成功",
								icon:"success",
								mask:true,
							})
						}
						else if(res.data.code === 403){
							login(this.openDoor,this.showCustomModal);
						}
					},
					fail: (err) => {
						console.log(err);
						uni.showToast({
							title:"开门失败",
							icon:"fail",
						})
					}
				});
				setTimeout(()=>{
					uni.switchTab({
						url:"/pages/index/index"
					})
				},1500)
			},
			
			close() {
				const token = uni.getStorageSync("token");
				if(token == ""){
					console.log("未登录");
					login(this.closeDoor,this.showCustomModal);
					return;
				}
				this.closeDoor();
			},
			
			//关门
			closeDoor(){
				const token = uni.getStorageSync("token")
				uni.request({
					url:"https://turingclock.raqtpie.xyz:9642/closeLab",
					method:"PUT",
					header:{
						Authorization:token
					},
					success: (res) => {
						console.log(res);
						if(res.data.code === 200){
							this.isOpen = res.data.data.status;
							this.operator = res.data.data.operator;
							getApp().globalData.isOP = res.data.data.status;
							uni.showToast({
								title:"关门成功",
								icon:"success",
								mask:true,
							})
						}
						else if(res.data.code === 403){
							login(this.closeDoor,this.showCustomModal);
						}
					},
					fail: (err) => {
						console.log(err);
						uni.showToast({
							title:"关门失败",
							icon:"fail",
						})
					}
				});
				setTimeout(()=>{
					uni.switchTab({
						url:"/pages/index/index"
					})
				},1500)
			}
		},
		onShow() {
			this.getLabStatus();
		}
	}
</script>

<style>
.page-section {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.btn{
	width: 350rpx;
	height: 80rpx;
}

.close{
	color: #F56E6E;
	background-color: #FEF0F0;
}

.open{
	color: #67C23A;
	background-color: #F0F9EB;
}

.tips {
  color: #ccc;
  margin: 40rpx;
}

.red {
  color: red;
  margin: 5rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}


</style>
