<template>
	<view class="wrap">
		<view class="header">
			<text>HELLO</text>
			<br>
			<text>欢迎注册</text>
		</view>
		<view class="register_box">
			<form @submit="register">
				<input class='reg_input' type="text"  v-model="phone" placeholder="请输入手机号" />
				<input class='reg_input'   password=true v-model="password" placeholder="请输入密码" />
				<input class='reg_input'   password=true v-model="confirmPassword" placeholder="请再次输入密码" />
				<input class='reg_input'   type="text" v-model="orgName" placeholder="请输入机构名称" />
				<input class='reg_input'   type="text" v-model="orgNum" placeholder="请输入机构码" />
				<button  class="sub" form-type="submit" type="primary">确定</button>
			</form>
		</view>
	</view>
</template>

<script>
	
	import { registApi } from '../../service/api.js'
	export default {
		data() {
			return {
				phone: "",
				password: "",
				confirmPassword: "",
				orgName: "",
				orgNum: 0
			};
		},
		methods:{
			register(){
				let json = {
					phone: this.phone,
					password: this.password,
					confirmPassword: this.confirmPassword,
					orgName: this.orgName,
					orgNum: this.orgNum
				}
				registApi(json).then(res =>{
					if(res.code === 200){
						console.log(res.data)
						
						
						
						uni.redirectTo({
							url:"../login/login"
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap{
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	.register_box input {
		padding: 0 30px !important;
		box-sizing: border-box;
	}
	.uni-input-form, .uni-input-input, .uni-input-placeholder, .uni-input-wrapper{
	}
	.header{
		margin-top: 40px;
		font-size:25px;
		text-align: center;
		font-weight: bold;
	}
	.left{
		padding-left:30px
	}
	/* 注册框 */
	 .register_box{
		margin-top: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
	 }
	input{
		width: 250px;
		height: 44px;
		padding: 0;
		border-radius: 22px;
		margin-top: 14px;
		border: 2px solid #4BAEFD;
	}
	.uni-field:after{
		border: 0;
	}
	/* 提交 */
	.sub{
	  margin-top: 40px;
	  width: 250px;
	  height: 44px;
	  border-radius: 22px;
	  color: white;
	  background: linear-gradient(to right,#00CFE8,#4BAEFD)
	}
</style>
