<template>
	<view>
		<!-- 通知 -->
		<uni-notice-bar single :color="!isOpen?'#fff':'#00917c'" :background-color="!isOpen?'red':'#caf7e3'" :text="!isOpen?'暂未开门，请在群里询问或点此修正开门状态':'实验室已开门，点此修正开门状态'" @click="toOpenDoor"/>
		<view class="root">
			<text class="top">这是 {{this.chairId}} 号座位</text>
			<text class="tips">上一位使用者：{{this.username}}</text>
			<!-- 开门的情况 -->
			<view v-if="isOpen">
				<view :class="!status?'freeText':'unfreeText'">
				  {{!status?"空闲":"正在使用"}}
				</view>
				<!-- 座位空闲 -->
				<view v-if="!status" class="open">
					<image class="chairs" src="/static/images/freeChair.png"></image>
					<button class="btn sit" :disabled="!inner" @click="signIn">坐下</button>
					<text class="tips" v-if="!inner">未获取到位置信息或不在范围内</text>
					<text class="tips" v-if="!inner">请返回主界面重新定位</text>
				</view>
				
				<!-- 被坐&&是自己坐下 -->
				<view v-if="status&&canOperate" class="open">
					<image class="chairs" src="/static/images/unfreeChair.png"></image>
					<button class="btn" type="warn" @click="signOut">签退</button>
					<text class="tips">每晚11:30将重置状态，请注意签退时间。</text>
					<text class="tips">可扫任意座位码进入签退页面</text>
					<text class="tips">当你是最后一个离开并需要关门时，</text>
					<text class="tips">请及时修正实验室开门状态</text>
				</view>
				
				<!-- 被坐&&不是自己坐下 -->
				<view v-if="status&&!canOperate" class="open">
					<image class="chairs" src="/static/images/unfreeChair.png"></image>
					<button class="btn" disabled>他人已坐下</button>
					<text class="tips">若确定座位虚占，请联系管理员。</text>
				</view>
			</view>
			
			<!-- 没开门情况 -->
			<view v-if="!isOpen" class="noOpen">
				<image src="/static/images/tab-3.png" class="chair2"></image>
				<button type="warn" @click="toOpenDoor">修正开门状态</button>
				<text class="tips">实验室未开门</text>
				<text class="tips">签退必须在开门状态下签退</text>
			</view>
			
			<view class="bott"></view>
		</view>
		
		<CustomModal @confirm="handleConfirm" @close="handleClose" v-show="showModal"/>
	</view>
</template>

<script>
	import CustomModal from "@/component/custom-modal/custom-modal.vue";
	import {login, register, login2} from "/utils/check.js"
	export default {
		components: {
			CustomModal,
		},
		data() {
			return {
				isOpen: getApp().globalData.isOP,
				inner: getApp().globalData.in,
				chairId: -1,
				status: false,
				username: "暂无",
				canOperate:true,
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
			
			// 开门
			toOpenDoor(){
				uni.navigateTo({
					url:"/pages/openDoor/openDoor"
				})
			},
			
			// 获取chair状态
			getChairById(){
				const token = uni.getStorageSync("token");
				if(token === ""){
					uni.request({
						url:"https://turingteam.xyz:9642/getChairById",
						method:"GET",
						data:{
							id:this.chairId,
						},
						success:(res)=> {
							console.log(res);
							if(res.data.code === 200){
								this.status = res.data.data.status;
								this.username = res.data.data.username;
								this.canOperate = res.data.data.canOperate;
							}
						},
						fail: (err) => {
							console.log(err);
						}
					})
				}
				else{
					uni.request({
						url:"https://turingteam.xyz:9642/getChairById",
						method:"GET",
						data:{
							id:this.chairId,
						},
						header:{
							Authorization: token,
						},
						success:(res)=> {
							console.log(res);
							if(res.data.code === 200){
								this.status = res.data.data.status;
								this.username = res.data.data.username;
								this.canOperate = res.data.data.canOperate;
							}
						},
						fail: (err) => {
							console.log(err);
						}
					})
				}
				
			},
			
			//签到
			signIn(){
				const token = uni.getStorageSync("token");
				if(token == ""){
					console.log("未登录");
					login(this.sitDown,this.showCustomModal);
					return;
				}
				this.sitDown();
			},
			
			// 坐下
			sitDown(){
				const token = uni.getStorageSync("token");
				if(token == ""){
					return;
				}
				uni.request({
					url:"https://turingteam.xyz:9642/work".concat("?chairId=", this.chairId),
					method:"PUT",
					header:{
						Authorization: token,
					},
					// data:{
					// 	chairId: this.chairId,
					// },
					success: (res) => {
						// console.log(res);
						if(res.data.code == 200){
							uni.showToast({
								title:"加载中",
								icon:"loading",
								duration:700,
								mask:true,
							})
							setTimeout(()=>{
								this.getChairById();
							},700)
						}
						else if(res.data.code === 400){
							uni.showToast({
								title:res.data.msg,
								icon:"error",
								mask:true
							})
							setTimeout(()=>{
								uni.reLaunch({
									url:"/pages/seat/seat"
								})
							},1500)
						}
						else if(res.data.code === 403){
							login(this.sitDown,this.showCustomModal);
						}
					},
					fail: (err) => {
						console.log(err);
					}
				})
			},
			
			//签退
			signOut(){
				const token = uni.getStorageSync("token");
				if(token == ""){
					console.log("未登录");
					login(this.leave,this.showCustomModal);
					return;
				}
				this.leave();
			},
			
			// 离开
			leave(){
				const token = uni.getStorageSync("token");
				if(token === ""){
					return;
				}
				uni.request({
					url:"https://turingteam.xyz:9642/life".concat("?chairId=", this.chairId),
					method:"PUT",
					header:{
						Authorization: token,
					},
					// data:{
					// 	chairId: this.chairId,
					// },
					success: (res) => {
						// console.log(res);
						if(res.data.code == 200){
							uni.showToast({
								title:"加载中",
								icon:"loading",
								duration:700,
								mask:true,
							})
							setTimeout(()=>{
								this.getChairById();
							},700)
						}else if(res.data.code === 403){
							login(this.leave,this.showCustomModal);
						}
					},
					fail: (err) => {
						console.log(err);
					}
				})
			}
		},
		onLoad(e) {
			const token = uni.getStorageSync("token");
			this.chairId = e.id;
			this.getChairById();
			if(token == ""){
				login2();
			}
		},
	}
</script>

<style scoped>

.root {
  height: 100%;
  /* flex-grow: 10; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column
}

.top{
  margin-top: 50rpx;
  font-size: 40rpx}

.tips{
  margin: 15rpx;
  font-size: 30rpx;
  color: #ccc;
  text-align: center;
}

.freeText {
  font-size: 120rpx;
  color: #27ae60;
  text-align: center;
}

.unfreeText{
  font-size: 120rpx;
  color: #FA5151;
  text-align: center;
}

.chairs {
  width: 360rpx;
  height: 200rpx;
  margin: 10px 0;
}

.btn{
	width: 350rpx;
	height: 80rpx;
}

.sit{
	color: #67C23A;
	background-color: #F0F9EB;
}

.leave{
	color: #F56E6E;
	background-color: #FEF0F0;
}

.tips{
  margin: 15rpx;
  font-size: 36rpx;
  color: #ccc;
  text-align: center;
}

.open , .noOpen{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.chair2 {
  width: 200rpx;
  height: 200rpx;
  margin: 10px 0;
}

.bott{
margin-bottom: 280rpx;
}
</style>
