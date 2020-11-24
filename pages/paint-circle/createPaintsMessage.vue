<template>
	<view>
		<textarea v-model="content" placeholder="请描述自己的作品吧..."></textarea>
		<view v-for="item in files">
			<image :src="item">
		</view>
		
		
	</view>
</template>

<script>
		import {painsImgUploadApi} from '../service/api.js'
	
	export default {
		onLoad: function (option) { 
				this.files  = JSON.parse(decodeURIComponent(option.item));
				// this.uploadPaintsImgs();
		},
		data() {
			return {
				files:[],
				content:"",
				file:null
			};
		},
		methods:{
			uploadPaintsImgs(){
				let json = {
					file:this.file
				}
				painsImgUploadApi(json).then(res =>{
					res = JSON.parse(res.data)
					console.log(res)
					if (res.code === 200) {
						this.images.push(res.data)
					}
					console.log(this.images)
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
