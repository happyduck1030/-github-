<template>
	<view class="container">
		<!-- 顶部导航栏 -->
		<uni-nav-bar :fixed="true" status-bar :border="false" leftWidth="140rpx">
			<template v-slot:left class="custom-left-slot">
				<text class="custom-left-text" @click="subscribe">订阅开门通知</text>
			</template>
			<view class="custom-title-slot">
				<text class="custom-title-text">图灵 TEAM</text>
			</view>
		</uni-nav-bar>
		<!-- 通知 -->
		<uni-notice-bar single :color="!isOpen?'#fff':'#00917c'" :background-color="!isOpen?'red':'#caf7e3'" :text="!isOpen?'暂未开门，请在群里询问或点此修正开门状态':'实验室已开门，点此修正开门状态'" @click="toOpenDoor" right-icon="forward"/>
		<!-- 地图 -->
		<map id="map" style="width: 100vw; height: 100vh;" :latitude="latitude" :longitude="longitude" :scale="scale" :circles="circles"  :show-location="true">
			<!-- 打卡按钮 -->
			<button class="btn1" hover-stop-propagation @click="scanCode" :disabled="!inner">{{ inner ? "打卡" : "未进入范围" }}</button>
			<!-- 显示自定义模态对话框 -->
			<CustomModal @confirm="handleConfirm" @close="handleClose" v-show="showModal"/>
		</map>
	</view>
</template>

<script>
	import CustomModal from "@/component/custom-modal/custom-modal.vue";
	import {login, login2, register} from "/utils/check.js"
	export default {
		components: {
			CustomModal,
		},
		data() {
			return {
				// 地图经纬度、缩放、圆
				latitude: 21.15375,
				longitude: 110.29650,
				scale: 18,
				circles:[{
					id: 1,
					latitude: 21.15375,
					longitude: 110.29650,
					radius: 55,
					fillColor: '#00000011',
					color: "#74b9ff",
					strokeWidth: 2
				}],
				showModal: false,
				isOpen: getApp().globalData.isOP,
				inner: getApp().globalData.in,
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
			
			// 去开门
			toOpenDoor(){
				uni.navigateTo({
					url:"/pages/openDoor/openDoor"
				})
			},
			
			// 订阅开门通知
			subscribe(){
				const token = uni.getStorageSync("token");
				if(token == ""){
					this.showCustomModal();
					return;
				}
				uni.getSetting({
					withSubscriptions:true,
					success:(res)=>{
						console.log(res.authSetting);
						console.log(res.subscriptionsSetting);
					}
				});
				uni.showModal({
					content: '勾选“保持选择”后，每次打卡可接收下一次的开门通知。',
					cancelText: "取消",
					cancelColor: "red",
					confirmText: "我会勾选",
					confirmColor: "#409EFE",
					
					success:(res)=>{
						if(res.confirm){
							uni.requestSubscribeMessage({
								tmplIds: ['YT5WwUDkbE2OaixVEi8xPzwvvyCOQH7Q_SJSb3wGq-c'],
								complete:(res) => {
									console.log(res);
									if (res['YT5WwUDkbE2OaixVEi8xPzwvvyCOQH7Q_SJSb3wGq-c'] === "accept") {
										console.log("isok");										
										const token = uni.getStorageSync("token");
										uni.request({
											url:"https://turingteam.xyz:9642/subscribeMsg",
											method:"PUT",
											header:{
												Authorization:token
											},
											success: (res) => {
												console.log(res);
												if(res.data.code === 200){
													uni.showToast({
														title:res.data.msg,
													})
												}
											},
											fail: (err) => {
												console.log(err);
											}
										})
									}
								}
							})
						}else if (res.cancel) {
						  console.log('用户点击取消')
						}
					}
				})
			},
			
			// 打卡
			scanCode(){
				const token = uni.getStorageSync("token");
				// 判断有没有登陆
				if(token == ""){
					console.log("未登录");
					login(this.scanCode,this.showCustomModal);
					return;
				}
				// console.log(111);
				uni.scanCode({
					onlyFromCamera:true,
					success: (res) => {
						if (res.path[0] == '/') {
						  uni.reLaunch({
						    url: res.path
						  })
						} else {
						  uni.reLaunch({
						    url: "/" + res.path
						  })
						}
					}
				})
			},
			
			// 获取开关门
			getLabStatus(){
				uni.request({
					url:"https://turingteam.xyz:9642/getLabStatus",
					method:"GET",
					success:(res)=>{
						// console.log(res);
						if(res.data.code === 200){
							this.isOpen = res.data.data.status;
							getApp().globalData.isOP = res.data.data.status;
						}
					},
					fail:(err)=>{
						console.log(err);
					}
				})
			},
			
			// 定位
			getPersonalLocation (res){
				uni.getLocation({
					type: 'gcj02',
					// geocode:true,
					success:(res) => {
						// console.log(res);
						let latitude = res.latitude;
						let longitude = res.longitude;
			
												
						let position = this.caldistance(latitude, longitude);
						
						this.inner = position;
						getApp().globalData.in = position;
						
					},
					fail: function(res) {
						console.log('定位失败');
						console.log(res);
					}
				})
			},
			
			// 计算距离
			caldistance(lat1, lng1, lat2 = this.circles[0].latitude, lng2 = this.circles[0].longitude){
				if (lat1 == null) {
				  return false
				}
				getApp().globalData.lat = lat1;
				getApp().globalData.lon = lng1;
				var radLat1 = lat1 * Math.PI / 180.0;
				var radLat2 = lat2 * Math.PI / 180.0;
				var a = radLat1 - radLat2;
				var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
				var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
				s = s * 6378.137;
				s = Math.round(s * 10000) / 10000;
				getApp().globalData.distance = s * 1000
				return s * 1000 <= this.circles[0].radius ? true : false
			},
			
		},
		// 页面初始化
		onLoad() {
			uni.clearStorage();
			this.getLabStatus();
			const token = uni.getStorageSync("token");
			if(token == ""){
				login2();
			}
		},
		// 监听页面加载
		onShow(){
			this.getPersonalLocation();
			this.getLabStatus();
			// uni.offLocationChange(this.getPersonalLocation);
			// uni.startLocationUpdate();
			let map = uni.createMapContext('map');
			map.setCenterOffset({
				offset: [0.5, 0.35]
			})
			let timer = setInterval(()=>{
				this.getPersonalLocation();
			},1500)
		},
		// 监听分享
		onShareAppMessage() {
		  return {
		    title: '图灵实验室打卡',
		    path: "/pages/index/index",//用户点开后的默认页面，我默认为首页
		    imageUrl: "/static/images/turing.jpg",//自定义图片的地址
		    success(res) {
		      console.log(res);
		      console.log('分享成功！')
		    }
		  }
		},
		//分享到朋友圈
		onShareTimeline() {
		    return {
		        title: '图灵实验室打卡',
		        path: "/pages/index/index",
		        imageUrl: "/static/images/turing.jpg",
		        success(res) {
		            console.log(res);
		            console.log('分享成功！');
		        }
		    };
		}
	}
</script>

<style lang="scss">
.custom-left-slot {
  /* 自定义左侧插槽样式 */
}

.custom-left-text {
	color: #2790FA;
	font-size: 12px;
	width: 100px;
  /* 添加其他自定义样式 */
}

.custom-title-slot {
  /* 自定义中间插槽样式 */
  text-align: center;
  margin: 10px auto ;
}

.custom-title-text {
  color: block; /* 自定义中间文本的颜色 */
  font-size: 20px; /* 自定义中间文本的字体大小 */
  /* 添加其他自定义样式 */
}

.nav_left{
	flex: 1;
	color: #2790FA;
	width: 300rpx;
	font-size: 12px;
}
	
.btn1{
  // top: 60vh;
  display:block;
  width: 250rpx;
  height: 80rpx;
  margin: 55vh 33vw 0;
  color: #67C23A;
  background-color: #F0F9EB;
  }
</style>
