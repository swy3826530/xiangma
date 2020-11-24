<template>
    <view class="login">
		<view class="logo">
			<img src="../../../static/img/logo.png">
		</view>
		<!-- <uni-forms ref="form" :form-rules="" @submit="login" @reset="" @validate=""> 校验-->
		<form class="content" ref="form" @submit="login" >
			<input type="text" placeholder-class="left" v-model="phone" placeholder="请输入手机号" />
			<!-- <uni-field labelWidth="0" name="phone" v-model="phone" placeholder="请输入手机号" /> -->
			<input class="uni-input" password type="text" placeholder="请输入密码" />
			<!-- <uni-field labelWidth="0" name="password" v-model="password" placeholder="请输入密码" /> -->
			<view class="register">
				<text form-type="reset" @click="jumpReg">注册账号</text>
			</view>
			<button form-type="submit">登录</button>
		</form>
    </view>
</template>

<script>
	
	import { loginApi } from '../../service/api.js'

	export default {
		data() {
			return {
				phone: "17310981813",
				password: "123456"
			};
		},
		methods: {
			//登录
			login() {
				// let json = {
				// 	phone: this.phone,
				// 	password: this.password
				// }
				// loginApi(json).then(res => {
					// if(res.code === 200){
					// 	uni.setStorage({
					// 		key:'userinfo',
					// 		data:res.data
					// 	})
					// 	uni.setStorage({
					// 		key:'token',
					// 		data:'Bearer '+res.data.access_token
					// 	});
						
					// 	uni.switchTab({
					// 		url: '/pages/paint-circle/paint-circle-list'
					// 	});
					// }
					// 获取不到数据情况下使用的
					uni.switchTab({
						url: '/pages/paint-circle/paint-circle-list'
					});
				// })
			},
			jumpReg(){
				uni.navigateTo({
					url: '../register/register'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login{
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	.logo{
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 6.5rem;
	}
	.content{
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 3.2rem;
	}
	.content button{
		width: 14.7rem;
		height: 2.58rem;
		border-radius: 1.29rem;
		color: white;
		background: linear-gradient(to right,#00CFE8,#4BAEFD)
	}
	.content input {
		padding: 0 1.76rem !important;
		box-sizing: border-box;
	}
	.register{
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto;
		width: 3.29rem;
		height: 1.17rem;
		margin: .52rem auto 3rem auto;
	}
	.register text{
		color: #04BEFD;
		font-size: .82rem;
	}
	.uni-field,input{
		
		display: flex;
		width: 14.7rem;
		height: 44px;
		padding: 0;
		border-radius: 1.29rem;
		margin-top: .82rem;
		border: 2px solid #4BAEFD;
	}
	.uni-field:after{
		border: 0;
	}
</style>
