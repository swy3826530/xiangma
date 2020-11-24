<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		onLoad() {
		  console.log("init 启动页")
		  const value = uni.getStorageSync('launchFlag');
		  if (!value) {
		    uni.redirectTo({
		      url: '/pages/user/login/login'
		    });
		  } else {
		    uni.setStorage({
		      key: 'launchFlag',
		      data: true
		    });
		    uni.redirectTo({
		      url: '/pages/index/lauth'
		    });
		  }
		}
	}
</script>

<style>

</style>
