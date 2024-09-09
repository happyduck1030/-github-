<template>
	<view class="page-section">
		<!-- 总榜 -->
		<uni-list :border="false">
			<uni-list-item title="总排名" showArrow link="navigateTo" to="../rank/rank"></uni-list-item>
		</uni-list>
		<!-- 昨日排名 -->
		<view class="rank">
			<view class="r1">
				<view class="r1t">昨</view>
				<view class="r1t">日</view>
				<view class="r1t">排</view>
				<view class="r1t">名</view>
			</view>
			<!-- 滑块 -->
			<scroll-view scroll-x scroll-anchoring class="yesterday">
				<!-- 无人上榜 -->
				<view v-if="yesterdayRecord.length == 0" class="nobody">
					<view class="intxt"><text>未有人上榜呢</text></view>
				</view>
				<!-- 榜上有人 -->
				<view v-else class="somebody" v-for="(item,index) in yesterdayRecord.slice(0,4)" :key="index">
					<view class="in">
						<text class="name p{{index}}">{{item.username}}</text>
						<text class="time">{{item.totalTime}}分钟</text>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 今日已学 -->
		<uni-list :border="false">
			<uni-list-item>
				<template v-slot:header>
					<view class="slot-box">
						<image class="slot-image" src="/static/images/avatar.png" mode="widthFix"></image>
					</view>
				</template>
				<template v-slot:footer>
					<text class="right_text" style="line-height: 85rpx;">今日已学{{todayTime}}分钟</text>
				</template>
			</uni-list-item>
		</uni-list>
		<!-- 历史记录 -->
		<uni-list>
			<uni-list-item :border="false">
				<template v-slot:header>
					<view class="slot-left-box">
						<view class="title">
							{{name!="" && className != "" ? name + " | " + className : "历史记录"}}
						</view>
						<view class="note" v-if='name != "" && className != ""'>
							历史记录
						</view>
					</view>
				</template>
				<template v-slot:footer>
					<text class="right_text">总时长{{totalTime}}分钟</text>
				</template>
			</uni-list-item>
		</uni-list>
		<view class="empty" v-if="personalRecord.length == 0">
			<view class="content_img"><image src="/static/images/empty.png" mode="widthFix"></image></view>
			 <view class="content_txt">还未学习</view>
			 <button type="default" size="default" hover-class="none" style="margin-top: 50rpx;font-weight: 700;" @click="showPersonalRecord">点击加载更多</button>
		</view>
		<view v-else>
			<uni-list>
				<uni-list-item v-for="(item, index) in personalRecord" :key="index">
					<template v-slot:header>
						<view class="slot-left-box">
							<view class="title">
								{{item.chairId}}号座位
							</view>
							<view class="note">
								{{item.date}}
							</view>
						</view>
					</template>
					<template v-slot:footer>
						<view style="line-height: 50rpx;">{{item.time}}分钟</view>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
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
				yesterdayRecord : [],
				personalRecord:[],
				todayTime:0,
				totalTime:0,
				name:"",
				className:"",
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
			
			// 加载更多
			showPersonalRecord(){
				const token = uni.getStorageSync("token");
				// 判断有没有登陆
				if(token == ""){
					console.log("未登录");
					login(this.getPersonalRecord,this.showCustomModal);
					return;
				}
				this.getPersonalRecord();
			},
			
			// 获取个人信息
			getUserInfo(){
				const token = uni.getStorageSync("token");
				if(token == ""){
					return;
				}
				uni.request({
					url:"https://turingteam.xyz:9642/getUserInfo",
					method:"GET",
					header:{
						Authorization:token,
					},
					success: (res) => {
						// console.log(res);
						if(res.data.code === 200){
							this.name = res.data.data.name;
							this.className = res.data.data.className;
						}else if(res.data.code === 403){
							login(this.getUserInfo,this.showCustomModal);
						}
					},
					fail: (err) => {
						console.log(err);
					}
				})
			},
			// 获取昨日记录
			getYesterdayRecord(){
				uni.request({
					url:"https://turingteam.xyz:9642/getRecordYesterday",
					method:"GET",
					success:(res)=>{
						// console.log(res);
						if(res.data.code === 200){
							this.yesterdayRecord = res.data.data;
						}
					}
				})
			},
			// 获取个人历史总时长
			getPersonalTotalTime(){
				const token = uni.getStorageSync("token");
				if(token == ""){
					return;
				}
				uni.request({
					url:"https://turingteam.xyz:9642/getTotalTimeByUserId",
					method:"GET",
					header:{
						Authorization:token,
					},
					success: (res) => {
						// console.log(res);
						if(res.data.code === 200){
							this.totalTime = res.data.data.totalTime;
						}else if(res.data.code === 403){
							login(this.getPersonalTotalTime,this.showCustomModal);
						}
					},
					fail: (err) => {
						console.log(err);
					}
				})
			},
			// 获取个人纪录
			getPersonalRecord(){
				const token = uni.getStorageSync("token");
				if(token == ""){
					return;
				}
				uni.request({
					url:"https://turingteam.xyz:9642/getRecordByUserId",
					method:"GET",
					header:{
						Authorization:token,
					},
					success: (res) => {
						// console.log(res);
						if(res.data.code === 200){
							this.personalRecord = res.data.data;
						}else if(res.data.code === 403){
							login(this.getPersonalRecord,this.showCustomModal);
						}
					},
					fail: (err) => {
						console.log(err);
					}
				})
			},
			// 获取个人今日学习时长
			getTodayRecord(){
				const token = uni.getStorageSync("token");
				if(token == ""){
					return;
				}
				uni.request({
					url:"https://turingteam.xyz:9642/getTotalTimeByUserIdToday",
					method:"GET",
					header:{
						Authorization:token,
					},
					success: (res) => {
						// console.log(res);
						if(res.data.code === 200){
							this.todayTime = res.data.data.totalTime;
						}else if(res.data.code === 403){
							login(this.getTodayRecord,this.showCustomModal);
						}
					},
					fail: (err) => {
						console.log(err);
					}
				})
			},
		},
		// 进入页面
		onShow() {
			// 昨日记录
			this.getYesterdayRecord();
			// 个人今日学习时长
			this.getTodayRecord();
			// 获取个人纪录
			this.getPersonalRecord();
			// 获取个人历史总时长
			this.getPersonalTotalTime();
			// 获取个人信息
			this.getUserInfo();
		},
		// 刷新
		onPullDownRefresh() {
			// 昨日记录
			this.getYesterdayRecord();
			// 个人今日学习时长
			this.getTodayRecord();
			// 获取个人纪录
			this.getPersonalRecord();
			// 获取个人历史总时长
			this.getPersonalTotalTime();
			// 获取个人信息
			this.getUserInfo();
			setTimeout(()=>{
				uni.stopPullDownRefresh();
			},1000)
		}
	}
</script>

<style lang="scss">
	// 整个页面
.page-section{
	width: 750rpx;
	height: 100vh;
	background-color: #FAFCFF;
}

// 插槽
	
.slot-box {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	align-items: center;
}

.slot-image {
	/* #ifndef APP-NVUE */
	display: block;
	/* #endif */
	margin-right: 10px;
	width: 50px;
	height: 50px;
}

.slot-text {
	flex: 1;
	font-size: 14px;
	margin-right: 10px;
}

.right_text{
	line-height: 50rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
}

.slot-left-box{
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	.title{
		color: #384144;
	}
	.note{
		color: #999999;
		font-size: 12px;
	}
}

// 排名
.rank {
  display: flex;
  flex-direction: row;
  border-top: 1rpx solid rgb(241, 241, 241);
  border-bottom: 1rpx solid rgb(216, 216, 216);
}

.r1 {
  width: 7vw;
  font-size: 24rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}

.r1t {
  margin: -5rpx;
}

// 昨日记录
.yesterday{
	white-space: nowrap;
	display: flex;
	background-color: #F0F3F6;
	width: 93vw;
}

.nobody {
  display: inline-block;
  width: 730rpx;
  border-radius: 10rpx;
  background-color: #fff;
  height: 100rpx;
  margin: 10rpx;
}

.intxt {
  color: #ccc;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.somebody{
	display: inline-block;
	width: 200rpx;
	border-radius: 10rpx;
	background-color: #fff;
	height: 100rpx;
	margin: 10rpx;
}

.in{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
}

.p0 {
  color: rgb(231, 197, 0);
}

.p1 {
  color: rgb(197, 196, 196);
}

.p2 {
  color: rgb(223, 104, 61);
}

.name {
  font-size: 40rpx;
}

.time {
  display: block;
  font-size: 25rpx;
  color: #ccc;
}

/* 空状态 */
.empty{
	 text-align: center;
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  padding-top: 50px;
	  .content_img{ 
		  image{
			  width: 500rpx;
		  }
	  }
	  .content_txt{
		  margin-top: 10px;
		  font-size: 13px;
		  letter-spacing: 2px;
		  color: #333;
	  }
  }

</style>
