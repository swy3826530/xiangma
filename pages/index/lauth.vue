<template>
	<view >
		<swiper class=" swiswiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" circular=false>
			<swiper-item>
				<image src="../../static/img/lauch-1.png"></image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/img/lauch-2.png"></image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/img/lauch-3.png"></image>
			</swiper-item>
		</swiper>
 </view>
</template>

<script>
	export default {
	    data() {
	        return {
	            background: ['color1', 'color2', 'color3'],
	            indicatorDots: true,
	            autoplay: true,
	            interval: 2000,
	            duration: 500
	        }
	    },
		onLoad() {
			// plus.navigator.setFullscreen(true)
		},
	    methods: {

	    }
	}
</script>

<style lang="scss">
.swiswiper{ width: 100%; height: 100%; }
</style>
