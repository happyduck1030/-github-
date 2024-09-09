<template>
	<view class="page-section">
		<uni-list>
			<uni-list-item>
				<template v-slot:body>
					<view class="slot-box">
						<text class="slot-text">定期重置</text>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
		<!-- 空状态 -->
		<view class="empty" v-if="totalRecord.length == 0">
			<view class="content_img"><image src="/static/images/empty.png" mode="widthFix"></image></view>
			 <view class="content_txt">无人上榜</view>
		</view>
		<view v-else>
			<uni-list>
				<uni-list-item v-for="(item, index) in totalRecord" :key="index">
					<template v-slot:header>
						<view class="slot-left-box">
							<view class="title p{{index}}">
								{{item.username}}
							</view>
							<view class="note">
								打卡{{item.totalCount}}次
							</view>
						</view>
					</template>
					<template v-slot:footer>
						<view style="line-height: 50rpx;">总时长：{{item.totalTime}}分钟</view>
					</template>
				</uni-list-item>
			</uni-list>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				totalRecord:[],
			}
		},
		methods: {
			getRecord(){
				uni.request({
					url:"https://turingteam.xyz:9642/getRecord",
					method:"GET",
					success: (res) => {
						// console.log(res);
						if(res.data.code === 200){
							this.totalRecord = res.data.data;
						}
					}
				})
			},
		},
		onLoad(){
			this.getRecord();
		}
	}
</script>

<style lang="scss">
.page-section{
	width: 750rpx;
	height: 100vh;
	background-color: #FAFCFF;
}
	
.slot-box {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	align-items: center;
}

.slot-text {
	flex: 1;
	font-size: 14px;
	color: gray;
	margin-right: 10px;
}
	
.slot-left-box{
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	.title{
		color: #384144;
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
	.note{
		color: #999999;
		font-size: 12px;
	}
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
