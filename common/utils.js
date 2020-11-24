
let Utils = {
	
	toast:{
		// 显示自动消失的富文本提示消息
		 showRichToast(msg) {
			plus.nativeUI.toast("<font style=\"font-size:24px\">" + msg + "</font>", {
				type: 'richtext',
				background: '#ff0000',
				duration: 'long',
				richTextStyle: {
					align: 'center'
				}
			});
			setTimeout(function(){
					plus.nativeUI.closeToast();
				}, 500);
		}		
	}

};

export default Utils
