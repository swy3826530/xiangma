<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
			<test :msg="msg" @testShowName="testShowName"></test>
	</view>
</template>

<script>
	
	import test from "../../components/test.vue"
	
	export default {
		data() {
			return {
				msg: 'racy'
			}
		},
		onLoad() {
			uni.$once("testShowName",(rel =>{
				console.log(rel)
			}))
		},
		methods: {
			toRegister(){
				uni.navigateTo(
					"pages/user/register/register"
				)
			}
			,testShowName(rel){
				console.log(rel.name);
				//this.msg = rel;
			}
		},
		components:{
			test
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
