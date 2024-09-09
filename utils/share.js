export default{
	data() {
		return {
			title: '图灵实验室打卡',
			path: "/pages/index/index",//用户点开后的默认页面，我默认为首页
			imageUrl: "/static/images/turing.jpg",//自定义图片的地址
		}
	},
	//分享到朋友或群
	onShareAppMessage(res) {
		return {
			title:this.title,
			path:this.path,
			imageUrl:this.imageUrl,
			success(res){
				uni.showToast({
					title:'分享成功'
				})
			},
			fail(res){
				uni.showToast({
					title:'分享失败',
					icon:'none'
				})
			}
		}
	},
	
	//分享到朋友圈
	    onShareTimeline(res) {
	        return {
	            title:this.title,
	            path:this.path,
	            imageUrl:this.imageUrl,
	            success(res) {
	                uni.showToast({
	                    title: '分享成功'
	                })
	            },
	            fail(res) {
	                uni.showToast({
	                    title: '分享失败',
	                    icon: 'none'
	                })
	            }
	        }
	    }, 
}