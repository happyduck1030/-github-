/*
 这个js文件用来判断用户是否登录（通过查看uni.getStorageSync("token")来查看）
 如果storage没有存token，那么拿到的是空字符串""
*/

// 登录，传两个回调函数，第一个是成功的回调，第二个是失败的回调
export const login = (callback,fun) => {
	uni.login({
		provider: 'weixin',
		success: (res) => {
			// console.log(res.code);
			uni.request({
				url:"https://turingteam.xyz:9642/login",
				method:"GET",
				data:{
					jsCode:res.code
				},
				success:(res)=>{
					console.log(res);
					if(res.data.code == 200){
						uni.setStorageSync("token",res.data.data.token);
						// 判断callback是否是函数
						if(typeof callback === "function"){
							callback();
						}else{
							// 不是就报错
							throw new Error("Callback must be a function");
						}
					}
					else if(res.data.msg === "用户不存在，请先注册"){
						// 判断fun是否是函数
						if(typeof fun === "function"){
							fun();
						}else{
							// 不是就报错
							throw new Error("fun must be a function");
						}
					}
				},
				fail: (err) => {
					console.log(err);
				}
			})
		}
	})
}

// 注册，需要name,className,jsCode
export const register = (name,className) => {
	uni.login({
		provider: 'weixin',
		success: (res) => {
			uni.request({
				url:"https://turingteam.xyz:9642/register",
				method:"POST",
				data:{
					jsCode:res.code,
					name,
					className,
				},
				success:(res)=>{
					console.log(res);
					if(res.data.code == 200){
						uni.setStorageSync("token",res.data.data.token)
						uni.showToast({
							title:"注册成功",
							mask:true,
						})
					}else if(res.data.code === 400){
						uni.showToast({
							title:res.data.msg,
							icon:"error",
							mask:true,
						})
					}
				},
			})
		},
	})
}

// 一开始的静默登录
export const login2 = () => {
	uni.login({
		provider: 'weixin',
		success: (res) => {
			// console.log(res.code);
			uni.request({
				url:"https://turingteam.xyz:9642/login",
				method:"GET",
				data:{
					jsCode:res.code
				},
				success:(res)=>{
					console.log(res);
					if(res.data.code == 200){
						uni.setStorageSync("token",res.data.data.token);
					}
				},
				fail: (err) => {
					console.log(err);
				}
			})
		}
	})
}