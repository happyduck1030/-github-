<template>
	<view>
		<view class="page-section">
			<view class="top">
				<view class="top-left">
					<!-- 打印机 -->
					<view class="printer machine1" @click="printerShow"></view>
					<!-- 门 -->
					<view class="door" @click="doorShow"></view>
				</view>
				<view class="top-mid">
					<!-- 服务器 -->
					<view class="server machine2" @click="machineShow"></view>
					<!-- 成员工位 -->
					<view class="memberGroup">
						<view class="row1">
							<view class="member" @click="memberShow('姓名：郑志豪\n 方向 : 后端\n')">
								<text class="members_name">{{members[5].name}}</text>
							<!-- 郑志豪 -->
							</view>
							<view class="member" @click="memberShow('姓名：冯旖旎\n  方向 : NLP\n')">
								<text class="members_name">{{members[14].name}}</text>
							<!-- 冯旖旎 -->
							</view>
							<view class="member" @click="memberShow('')"></view>
							<view class="member" @click="memberShow('姓名：吴苡瑕\n  方向 : 前端\n')">
								<text class="members_name">{{members[9].name}}</text>
							<!-- 吴苡瑕 -->
							</view>
						</view>
						<view class="interval"></view>
						<view class="row2">
							<view class="member" @click="memberShow('姓名：黎翠儿\n  方向 : 前端\n')">
								<text class="members_name">{{members[10].name}}</text>
							<!-- 黎翠儿 -->
							</view>
							
							<view class="member" @click="memberShow('姓名：黎明智\n  方向 : CV\n')">
								<text class="members_name">{{members[7].name}}</text>
							<!-- 黎明智 -->
							</view>
							<view class="member" @click="memberShow('姓名：黄日昇\n  方向 : UI\n')">
								<text class="members_name">{{members[8].name}}</text>
							<!-- 黄日昇 -->
							</view>
							<view class="member" @click="memberShow('姓名：徐惠和\n  方向 : NLP\n')">
								<text class="members_name">{{members[13].name}}</text>
							<!--徐惠和  -->
							</view>
						</view>
					</view>
				</view>
				<view class="top-right">
					<!-- 空调 -->
					<view class="air-conditioner air" @click="aircShow"></view>
					<!-- 书柜 -->
					<view class="bookcase book" @click="bookShow"></view>
				</view>
			</view>
			<view class="main">
				<view class="main-left">
					<!-- 座位 -->
					<view class="row first">
						<view class="seat free t" v-if="!chairs[0].status"  @click="sitDown(1)"><text>1</text></view>
						<view class="seat busy f" v-if="chairs[0].status"  @click="standUp(1)"><text>1</text></view>
						
						<view class="seat free t" v-if="!chairs[1].status"  @click="sitDown(2)"><text>2</text></view>
						<view class="seat busy f" v-if="chairs[1].status"  @click="standUp(2)"><text>2</text></view>
						
						<view class="seat free t" v-if="!chairs[2].status"  @click="sitDown(3)"><text>3</text></view>
						<view class="seat busy f" v-if="chairs[2].status"  @click="standUp(3)"><text>3</text></view>
					</view>
					<view class="interval"></view>
					<view class="row">
						<view class="seat free t" v-if="!chairs[5].status"  @click="sitDown(6)"><text>6</text></view>
						<view class="seat busy f" v-if="chairs[5].status"  @click="standUp(6)"><text>6</text></view>
						
						<view class="seat free t" v-if="!chairs[4].status"  @click="sitDown(5)"><text>5</text></view>
						<view class="seat busy f" v-if="chairs[4].status"  @click="standUp(5)"><text>5</text></view>
						
						<view class="seat free t" v-if="!chairs[3].status"  @click="sitDown(4)"><text>4</text></view>
						<view class="seat busy f" v-if="chairs[3].status"  @click="standUp(4)"><text>4</text></view>
					</view>
					
					<view class="row third">
						<view class="seat free t" v-if="!chairs[6].status"  @click="sitDown(7)"><text>7</text></view>
						<view class="seat busy f" v-if="chairs[6].status"  @click="standUp(7)"><text>7</text></view>
						
						<view class="seat free t" v-if="!chairs[7].status"  @click="sitDown(8)"><text>8</text></view>
						<view class="seat busy f" v-if="chairs[7].status"  @click="standUp(8)"><text>8</text></view>
						
						<view class="seat free t" v-if="!chairs[8].status"  @click="sitDown(9)"><text>9</text></view>
						<view class="seat busy f" v-if="chairs[8].status"  @click="standUp(9)"><text>9</text></view>
					</view>
					<view class="interval"></view>
					<view class="row">
						<view class="seat free t" v-if="!chairs[11].status" @click="sitDown(12)"><text>12</text></view>
						<view class="seat busy f" v-if="chairs[11].status" @click="standUp(12)"><text>12</text></view>
						
						<view class="seat free t" v-if="!chairs[10].status" @click="sitDown(11)"><text>11</text></view>
						<view class="seat busy f" v-if="chairs[10].status" @click="standUp(11)"><text>11</text></view>
						
						<view class="seat free t" v-if="!chairs[9].status" @click="sitDown(10)"><text>10</text></view>
						<view class="seat busy f" v-if="chairs[9].status" @click="standUp(10)"><text>10</text></view>
					</view>
				</view>
				<!-- 过道 -->
				<view class="main-mid"></view>
				<view class="main-right">
					<!-- 卡座 -->
					<view class="row first">
						<view class="station" @click="memberShow('姓名：胡锦康\n  方向 : 后端\n')">
							<text class="members_name">{{members[1].name}}</text>
						<!--胡锦康  -->
						</view>
						<view class="station" @click="memberShow('姓名：黄佰诚\n  方向 : 前端\n')">
							<text class="members_name">{{members[11].name}}</text>
						<!-- 黄佰诚 -->
						</view>
					</view>
					<view class="interval"></view>
					<view class="row">
						<view class="station" @click="memberShow('成员工位')">
						 
						</view>
						<view class="station" @click="memberShow('姓名：彭玉丹\n  方向 : 前端\n')">
							<text class="members_name">{{members[12].name}}</text>
							<!-- 彭玉丹 -->
						</view>
					</view>
					<view class="row third">
						<view class="station" @click="memberShow('姓名：陈子航\n  方向 : 后端\n')">
							<text class="members_name">{{members[4].name}}</text>
							<!-- 陈子航 -->
						</view>
						<view class="station" @click="memberShow('姓名：曾建超\n  方向 : 后端\n')">
							<text class="members_name">{{members[3].name}}</text>
							<!-- 曾建超 -->
						</view>
					</view>
					<view class="interval"></view>
					<view class="row">
						<view class="station" @click="memberShow('姓名：张洋\n  方向 : 后端\n')">
							<text class="members_name">{{members[2].name}}</text>
							<!-- 张洋 -->
						</view>
						<view class="station" @click="memberShow('姓名：黄昱煌\n  方向 : CV\n')">
							<text class="members_name">{{members[6].name}}</text>
							<!-- 黄昱煌 -->
						</view>
					</view>
				</view>
			</view>
			<view class="bottom">
				<view class="bottom-left">
					<!-- 门 -->
					<view class="door" @click="doorShow"></view>
					<!-- 饮水机 -->
					<view class="water" @click="waterShow"></view>
				</view>
				<view class="bottom-mid">
					<!-- 门 -->
					<view class="door" @click="doorShow"></view>
				</view>
				<view class="bottom-right">
					<!-- 长桌 -->
					<view class="long table" @click="memberShow('姓名：李弢阳\n 方向 : 后端\n ')">
						<text class="members_name">{{members[0].name}}</text>
					<!-- 李弢阳 -->
					</view>
					<!-- 空调 -->
					<view class="air-conditioner side" @click="aircShow"></view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup"><text class="popup-text">{{message}}</text></uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				chairs: [
					{ id:1, status:false },
					{ id:2, status:false },
					{ id:3, status:false },
					{ id:4, status:false },
					{ id:5, status:false },
					{ id:6, status:false },
					{ id:7, status:false },
					{ id:8, status:false },
					{ id:9, status:false },
					{ id:10, status:false },
					{ id:11, status:false },
					{ id:12, status:false },
				],
				message:"",
				members:[
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
			}
		},
		methods: {
			// 工位
			memberShow(message) {
				this.message = message;
				this.$refs.popup.open('center');
			},
			// 设备
			machineShow() {
				this.message = "设备";
				this.$refs.popup.open('center');
			},
			// 门
			doorShow() {
				this.message = "门";
				this.$refs.popup.open('center');
			},
			// 书柜
			bookShow() {
				this.message = "书柜";
				this.$refs.popup.open('center');
			},
			// 空调
			aircShow() {
				this.message = "空调";
				this.$refs.popup.open('center');
			},
			// 打印机
			printerShow() {
				this.message = "打印机";
				this.$refs.popup.open('center');
			},
			// 饮水机
			waterShow(){
				this.message = "饮水机";
				this.$refs.popup.open('center');
			},
			// 坐下
			sitDown(id){
				uni.navigateTo({
					url:`/pages/chair/chair?id=${id}`,
				})
			},
			//起立
			standUp(id){
				uni.navigateTo({
					url:`/pages/chair/chair?id=${id}`,
				})
			},
			// 获取所有椅子状态
			getAllChair(){
				uni.request({
					url:"https://turingteam.xyz:9642/getChair",
					method:"GET",
					success:(res)=>{
						if(res.data.code === 200){
							this.chairs = res.data.data;
						}
					}
				})
			}
		},
		onLoad() {
			uni.startPullDownRefresh();
			// this.getAllChair();	
		},
		onShow() {
			uni.startPullDownRefresh();
			// this.getAllChair();
			setTimeout(()=>{
				uni.stopPullDownRefresh()
			},1000)
		},
		onPullDownRefresh() {
			setTimeout(()=>{
				this.getAllChair();
			},700)
			setTimeout(()=>{
				uni.stopPullDownRefresh()
			},1000)
		}
	}
</script>

<style>
@import "../seat/animation.wxss";
	
.popup-text{
	display: inline-block;
	font-size: 20px;
	text-align: center;
	line-height: 40px;
	width: 150px;
	background-color: #fff;
	border-radius: 18px;
	padding:10rpx 0;
}

/* 服务器 */
.server{
	width: 170rpx;
	height: 6vh;
	background: #FFD6B8;
	border: 3rpx solid #464643;
	border-radius: 10rpx;
}

/* 打印机 */
.printer{
	width: 70rpx;
	height: 6vh;
	/*26vh*/
	background: #FFD6B8;
	border: 3rpx solid #464643;
	border-radius: 10rpx;
}

/* 长桌 */
.long{
	width: 200rpx;
	height: 90rpx;
	background: #FC9D8A;
	border: 3rpx solid #464643;
	border-radius: 10rpx;
}

/* 空调 */
.air-conditioner{
	width: 70rpx;
	height: 70rpx;
	background: #FFD6B8;
	border: 3rpx solid #464643;
	border-radius: 10rpx;
}

/* 书柜 */
.bookcase{
	width: 70rpx;
	height: 23vh;
	/*26vh*/
	background: #FFD6B8;
	border: 3rpx solid #464643;
	border-radius: 10rpx;
}

/* 工位 */
.member {
	background: #FC9D8A;
	width: 110rpx;
	height: 90rpx;
	border: 3rpx solid #464643;
	border-radius: 10rpx;
}

/* 卡座 */
.station{
	background: #FC9D8A;
	width: 125rpx;
	height: 90rpx;
	border: 3rpx solid #464643;
	border-radius: 10rpx;
	box-sizing: border-box;
}



/* 座位 */
.seat{
	width: 71rpx;
	height: 71rpx;
	border: 3rpx solid #464643;
	border-radius: 10rpx;
	text-align: center;
	line-height: 71rpx;
	vertical-align: middle;
}
/* 成员名字样式 */
.members_name{
	display: block; 
	height: 90rpx;
	text-align: center;
	line-height: 90rpx;
	overflow: hidden;
	margin: 0 auto;
	color: #fff;
}
/* 间隙 */
 .interval{
	background: #cececc;
	margin: 5rpx auto;
	width: 90%;
	border: 3rpx solid #cececc;
	border-rdius: 10rpx;
}
/* 饮水机 */
.water{
	width: 200rpx;
	height: 70rpx;
	background: #FFD6B8;
	border: 3rpx solid #464643;
	border-radius: 10rpx;
}
/* 没被坐的座位 */
.free{
  background: #EAE9DE;
}
/* 被坐的座位 */
.busy{
	background: #A3D0FF;
}

.page-section {
    width: 750rpx;
    height: 100vh;
    padding-top: 13rpx;
    background-color: #fbfaef;
  }
  
.top{
	display: flex;
	width: 750rpx;
	height: 30%;
}

.top .top-left{
	flex: 1;
}
/* 打印机 */
.top .top-left .machine1{
	margin: 3% 0 0 3%;
}
/* 大门 */
.top .top-left .door{
	margin: 15vh 0 0 3%;
	width: 70rpx;
	height: 7vh;
	background: #FFD6B8;
	border: 3rpx solid #464643;
	border-radius: 0 0 77rpx 0;
}

.top .top-mid{
	flex: 5;
	height: 100%;
}
/* 服务器 */
.top .top-mid .machine2{
	margin: 1% 0 0 50%;
}

/* 工位 */
.top .top-mid .memberGroup{
	margin: 10% 0 0 1%;
	width: 500rpx;
	height: 15vh;
	display: flex;
	flex-direction: column;
}
/* 靠墙那排桌子 */
.top .top-mid .memberGroup .row1{
	display: flex;
	flex: 5;
	justify-content: space-evenly;
}

/* 靠走廊的桌子 */
.top .top-mid .memberGroup .row2{
	flex: 5;
	display: flex;
	justify-content: space-evenly;
}

.top .top-right{
	flex: 1;
}
/* 空调 */
.top .top-right .air{
	margin: 10% 0 10% 20%;
}
/* 书柜 */
.top .top-right .book{
	margin: 15% 0 0 20%;
}

.main{
	display: flex;
	width: 750rpx;
	height: 46%;
}
/* 座位 */
.main .main-left{
	flex: 5;
	padding-left: 5%;
}
.main .main-left .row, .main .main-right .row{
	display: flex;
	justify-content: space-evenly;
}
/* 座位 第一排 , 第三排 */
.main .main-left .first, .main .main-left .third{
	margin: 40% auto 0;
}
/* 过道 */
.main .main-mid{
	flex: 3;
}
/* 卡座 */
.main .main-right{
	flex: 5;
	padding-right: 3%;
}
/* 卡座 第一排 第三排 */
.main .main-right .first, .main .main-right .third{
	margin: 45% auto 0;
}

.bottom{
	display: flex;
	width: 750rpx;
	height: 20%;
}
.bottom .bottom-left{
	flex: 2;
}
/* 门 左边 */
.bottom .bottom-left .door{
	margin: 5% 0 0 2%;
	width: 70rpx;
	height: 7vh;
	background: #FFD6B8;
	border: 3rpx solid #464643;
	border-radius: 0 77rpx 0 0;
}
/* 饮水机 */
.bottom .bottom-left .water{
	margin: 30% 0 0 10%;
}

.bottom .bottom-mid{
	flex: 2;
}
/* 门 底下 */
.bottom .bottom-mid .door{
	margin: 70% auto 2%;
	width: 70rpx;
	height: 7vh;
	background: #FFD6B8;
	border: 3rpx solid #464643;
	border-radius: 0 77rpx 0 0;
}
.bottom .bottom-right{
	flex: 3;
	display: flex;
}
/* 长桌 */
.bottom .bottom-right .table{
	margin: 47% 2% 0 0;
}
/* 空调 */
.bottom .bottom-right .side{
	margin: 53% 0 0 8%;
}

/* 遮罩层 */
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
	font-size: 14px;
	text-align: center;
	line-height: 60px;
	width: 120px;
	height: 60px;
	background-color: #fff;
	border-radius: 10px
}

</style>
