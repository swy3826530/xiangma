<template>
	<view>
		<text>test组件:{{msg}}</text>
		<button type="primary" @click="test">点击</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			test(){
				uni.$emit("testShowName",{name:'msg'})
			}
		},
		props:["msg"]
	}
</script>

<style lang="scss">

</style>
