<template>
	<view class="paint-circle-list">
		<!-- 头部 -->
		<view class="header">
			<view class="back">
				<image class="left" style="z-index:5;" src="../../static/img/message.png"></image>
				<image class="right" style="z-index:5;" src="../../static/img/iphone.png"></image>
				<image style="width:100%;top:-104rpx;" mode="widthFix" src="../../static/img/background.png"></image>
			</view>
			<view class="headortrait">
				<image src="../../static/img/head.png"/>
			</view>
		</view>
		<!-- 内容部分 -->
		<view class="bodyer">
			<view>
				<!-- 内容头部 -->
				<view class="content">
					<!-- 头像 -->
					<view class="head_img">
						<image src="../../static/img/touxiang.png"></image>
					</view>
					<!-- 昵称 -->
					<view class="nick">
						<text>小象巴啦啦</text>
					</view>
					<!-- 发表日期 -->
					<view class="date">
						<text>2020/10/28</text>
					</view>
				</view>
				<!-- 发表的说说 -->
				<view class="publish_content">
					<!-- 文字 -->
					<view class="publish_text">
						<text>央美少年班直击各大美院附属中学，备考央美清华，给孩子的未来多一个选择。</text>
					</view>
					<!-- 图片 -->
					<view class="publish_img">
						<image src="../../static/img/touxiang.png"></image>
					</view>
				</view>
				<!-- 进行操作 -->
				<view class="operation">
					<!-- 点赞 -->
					<view class="dianzan">
						<image src="../../static/img/aixin.png"></image>
					</view>
					<!-- 点击评价 -->
					<view class="click_compile">
						<image src="../../static/img/edit.png"></image>
					</view>
				</view>
				<!-- 评价 -->
				<view class="evaluate">
					<view class="evaluate_wrap">
						<!-- 如果有用户点赞则显示 -->
						<view class="like_list">
							<image style="width:28rpx;height:24rpx;margin-right:10rpx;" src="../../static/img/aixin.png"></image>
							<text>佳佳老师</text>
						</view>
						<!-- 评价人的昵称 及评价的分数-->
						<view>
							<view class="evaluate_nick">
								<text>佳佳老师：</text>
								<view class="pinglun">
									<image style="width:28rpx;height:24rpx;" src="../../static/img/xingxing.png"></image>
								</view >
							</view>
							<!-- 评价的内容  做个判断 如果是语音则显示-->
							<view class="evaluate_con">央美少年班直击各大美院附属中学，备考央美清华班冲击。</view>
							<view></view>
						</view>
					</view>
				</view>
			</view>
			
		</view>
		<!-- <text @click="takePh">拍照</text>
		<text @click="chooseImage">从相册选择</text>
		<button @click="startRecord">开始录音</button>
		<button @click="stopRecord">停止录音</button>
		<button @click="playRecord">播放录音</button> -->
		<uni-list>
			<uni-list-item direction="column" v-for="item in paintsMessageList" :key="item.id">
				<template v-slot:body>	
					<view class="uni-flex uni-flex-row">
						<text>{{item.phone}}</text>
						<text>{{item.createdTime}}</text>
					</view>

				
				<!-- 通过body插槽定义列表内容，当前布局会显示多张图片，如果图片为一张，则显示为大图 -->
				
					<!-- 内容 -->
					<view>{{item.content}}</view>
					
					
					<!-- <view v-if="typeof item.images === 'string'" class="content uni-media-box">
						<image  class="uni-thumb" :src="typeof item.images === 'string'?item.images : item.images[0]"
						 mode="aspectFill"></image>
					</view> -->
					<view class="content uni-media-box">
						<image v-for="img in item.images.split(',')"  class="uni-thumb" :src="img" mode="aspectFill"></image>
					</view>
					
					<view style="text-align: right">
						<uni-icons :type="item.like?'heart-filled':'heart'" size="30" :color="item.like?'#ff0000':''" @click="painsLike(item)"/>
						<uni-icons type="chat" size="30" @click="painsComment(item)"/>
					</view>
					
					<view v-for="like in item.likeList">
						<text ><uni-icons type="heart-filled" size="30" color="red"/>{{like.phone}}</text>
					</view>
					<view v-for="comment in item.commentList" >
						<uni-icons type="contact" size="30" color="red"/>
						<text>评论:{{comment.phone}}</text>
						<text>评论:{{comment.content}}</text>
						<text>{{comment.star}}</text>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
		<uni-load-more :status="more">正在加载</uni-load-more>
	</view>
</template>
<script>
	import {painsMessageOfOrgListApi,painsLikeApi,cancelPainsLikeApi,painsCommentApi} from '../service/api.js'
	import {uniList} from '@dcloudio/uni-ui'
	import {uniListItem} from '@dcloudio/uni-ui'
	import {uniLoadMore} from "@dcloudio/uni-ui"
	import Utils from '../../common/utils.js';
	import {uniIcons} from "@dcloudio/uni-ui"
	
	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();
	
	innerAudioContext.autoplay = true;
	
	export default {
		components: {
			 uniList,
			 uniListItem,
			 uniLoadMore,
			 uniIcons
			 },
		data() {
			return {
				userinfo: {},
				paintsMessageList: [],
				pageNum: 1,
				pageSize: 2,
				imgs:'http://xiangma-course-effect.oss-cn-beijing.aliyuncs.com/paints/04FC84301D724A66BF6075E6BCDB709D.png',
				more:"more",
				total:0,
				images:[] //拍照或相册选择图片
			};
		},
		mounted() {
			this.userinfo = uni.getStorageSync('userinfo')
			this.getPainsMessageList(1);
		},
		methods: {
			//作品列表
			getPainsMessageList(pageNum) {
				let json = {
					pageNum: pageNum,
					pageSize: this.pageSize
				}
				painsMessageOfOrgListApi(json).then(res => {

					if (res.code === 200) {
						let rows = res.data.rows;
						for (let i = 0; i < rows.length; i++) {
							
						  rows[i].like = false;
						  for (let j = 0; j < rows[i].likeList.length; j++) {
							
						    if (this.userinfo.phone == rows[i].likeList[j].phone) {
						      rows[i].like = true;
						    }
						  }
						  
						  this.paintsMessageList.push(rows[i])
						}
						
						this.total = res.data.total;
					}
				})
			},
			//点赞
			painsLike(item){
				console.log(item.like)
				let json = {
					pcmid:item.id
				}
				if(item.like){
					cancelPainsLikeApi(json).then(res=>{
					if (res.code === 200) {
						item.like = false;
						let likeList = item.likeList;
						for(let i=0;i<likeList.length;i++){
							if(likeList[i].phone === this.userinfo.phone){
								item.likeList.splice(i,1);
							}
						}
					
					}
				})
				return;
				}
				painsLikeApi(json).then(res=>{
					if (res.code === 200) {
						item.like = true;
						item.likeList.push({
							"phone": this.userinfo.phone,
						})
					}
				})
			},
			//评论
			painsComment(item){
				let json = {
					content: "谢谢",
					star: 4,
					pcmid: 69
				}
				painsCommentApi(json).then(res=>{
					if (res.code === 200) {
						item.commentList.push(res.data);
					}
				})
			},
			//拍照
			takePh(){
				var camera = plus.camera.getCamera(1);
				var res = camera.supportedVideoResolutions[0];
				var fmt = camera.supportedVideoFormats[0];
				camera.captureImage(
					function(path) {
						if (path) {
							uni.saveFile({
								tempFilePath: path,
								success: function(res) {
									var savedFilePath = res.savedFilePath;
									//将临时文件保存到本地
									uni.saveImageToPhotosAlbum({
										filePath: savedFilePath,
										success: function() {
											Utils.toast.showRichToast('拍摄成功')
										}
									});
								}
							});
						}
						console.log('Capture image success: ' + path);
					},
					function(error) {
						console.log('Capture image failed: ' + error.message);
						//捕获图片失败
						if (error.message) {
						 Utils.toast.showRichToast('捕获图片失败')
						}
					},
					
					{
						resolution: res,
						format: fmt
					}
				);

				//微信小程序 跳转到另外一个页面
				uni.navigateTo({
					url:'Shooting'
				})
				                
				
			},
			//从相册选择
			chooseImage(){
				uni.chooseImage({
				    count: 9, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: function (res) {
						let files = [];
				        for(var i=0;i<res.tempFilePaths.length;i++){
							files.push(res.tempFilePaths[i])
							
						}
						console.log(files)
						
						uni.navigateTo({
							url:"createPaintsMessage?item="+ encodeURIComponent(JSON.stringify(files))
						})					
/* 						uni.getImageInfo({		
							src:res.tempFilePaths[0],					
							success:function(image){	
								console.log(image);
								uni.navigateTo({
									url:"createPaintsMessage?item="+ encodeURIComponent(JSON.stringify(image.path))
								})
							}
						}); */
				    }
				});
			},
			startRecord(){
				
				recorderManager.start();
			},
			stopRecord(){
				recorderManager.stop();
			},
			playRecord(){
				if (this.voicePath) {
					innerAudioContext.src = this.voicePath;
					innerAudioContext.play();
				}
			},
			onPullDownRefresh() {
				console.log("111111")
	/* 			this.tipShow = true
				this.formData.status = 'more'
				this.$refs.udb.loadData({
					clear: true
				}, () => {
					this.tipShow = false
					uni.stopPullDownRefresh()
				}) */
			},
			onReachBottom() {
				if(this.pageNum>=this.total){
					this.more = "nomore";
					return;
				}
				this.more="loding";
				this.getPainsMessageList(++this.pageNum);
			}
		}
	}
</script>

<style lang="scss">
	.paint-circle-list{
		font-family: PingFang SC;
	}
	.header{
		position: relative;
	}
	.back{
		
	}
	.left{
		position: relative;
		left: 32rpx;
		top: 66rpx;
		width: 40rpx;
		height: 34rpx;
	}
	.right{
		float: right;
		position: relative;
		right: 32rpx;
		top: 66rpx;
		width: 40rpx;
		height: 34rpx;
	}
	.headortrait{
		width: 140rpx;
		height: 140rpx;
		padding: 10rpx;
		right: 32rpx;
		bottom: 32rpx;
		border-radius: 20rpx;
		background-color: #ffffff;
		border: 2rpx solid #878787;
		position: absolute;
		z-index: 99;
	}
	.headortrait image{
		width: 140rpx;
		height:140rpx;
	}
	.bodyer {
		margin-top: 20rpx !important;
		width: 686rpx;
		margin: auto;
	}
	.bodyer .content{
		display: flex;
		position: relative;
		padding-bottom: 20rpx;
		border-bottom: 2rpx solid #F2F2F2;
		margin-bottom: 20rpx;
	}
	.bodyer .content .head_img{
		margin-right: 20rpx;
	}
	.bodyer .content .head_img image{
		width: 80rpx;
		height: 80rpx;
	}
	.bodyer .content .nick{
		color: #4BAEFD;
		font-size: 32rpx;
		display: flex;
		font-weight: bold;
		align-items: center;
		line-height: 60rpx;
	}
	.bodyer .content .date{
		height: 80rpx;
		line-height: 80rpx;
		position: absolute;
		right: 0;
		font-size: 24rpx;
		color: #989898;
	}
	.publish_content .publish_text text{
		color: #333333;
		font-size: 32rpx;
		line-height: 44.8rpx;
	}
	.publish_content .publish_img{
		margin-top: 20rpx;
	}
	.publish_content .publish_img image{
		width: 180rpx;
		height: 180rpx;
	}
	.operation{
		display: flex;
		float: right;
		margin-right: 14rpx;
	}
	.operation image{
		width: 28rpx;
		height: 26rpx;
	}
	.dianzan{
		margin-right: 40rpx;
	}
	.evaluate{
		margin-top: 60rpx;
		width: 686rpx;
		background-color: #F7F7F7;
	}
	.evaluate_wrap{
		padding: 12rpx 20rpx 12rpx 20rpx;
	}
	.evaluate_nick{
		font-size: 28rpx;
		color: #4BAEFD;
		position: relative;
		margin: 20rpx 0;
		display: flex;
	}
	.like_list{
		font-size: 28rpx;
		color: #4BAEFD;
	}
	.evaluate_nick .pinglun{
		position: absolute;
		right: 0;
	}
	.evaluate_nick .pinglun>image{
		margin:0 2rpx;
	}
	.evaluate_con{
		font-size: 28rpx;
		color: #333333;
		line-height: 38rpx;
	}
</style>
