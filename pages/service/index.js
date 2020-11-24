import Vue from 'vue'
import axios from 'axios';
import Utils from '../../common/utils.js';
// 默认超时设置
axios.defaults.timeout = 50000;
// 相对路径设置
axios.defaults.baseURL = 'http://192.168.3.4:8088/course-effect/';


//http request 拦截器
axios.interceptors.request.use(
	config => {
		console.log("拦截请求")
		// 获取token
		let token = uni.getStorageSync('token');

		// 设置参数格式
		if (!config.headers['Content-Type']) {
			config.headers = {
				'Content-Type': 'application/json',
			};
		}
		// 添加token到headers
		if (token) {
			config.headers.Authorization = token
		}
		// 鉴权参数设置
		if (config.method === 'get') {
			//get请求下 参数在params中，其他请求在data中
			config.params = config.params || {};
			let json = JSON.parse(JSON.stringify(config.params));

		} else {
			config.data = config.data || {};

		}
		return config;
	},
	err => {
		return Promise.reject(err);
	}
);




//配置成功后的拦截器
axios.interceptors.response.use(res => {
	console.log("请求成功后拦截" )
	console.log(res)
	Utils.toast.showRichToast(res.data.msg)
	if (res.data.code == 200) {
		
		return res;

		// plus.nativeUI.toast(res.data.msg);
		// uni.showToast({
		// 	title: res.data.msg
		// })
	} 
/* 	else {
		return res;
	} */
}, error => {
	return Promise.reject(error)
})




axios.defaults.adapter = function(config) { //自己定义个适配器，用来适配uniapp的语法
	return new Promise((resolve, reject) => {

		var settle = require('axios/lib/core/settle');
		var buildURL = require('axios/lib/helpers/buildURL');
		uni.request({
			method: config.method.toUpperCase(),
			url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
			header: config.headers,
			data: config.data,
			dataType: config.dataType,
			responseType: config.responseType,
			sslVerify: config.sslVerify,
			complete: function complete(response) {
				console.log("执行完成：", response)
				response = {
					data: response.data,
					status: response.statusCode,
					errMsg: response.errMsg,
					header: response.header,
					config: config
				};
				settle(resolve, reject, response);
			}
		})
	})
}


// export default service


/**
 * 封装get方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function fetch(url, params = {}) {
	return new Promise((resolve, reject) => {
		axios.get(url, {
				params: params
			})
			.then(response => {
				if (response.status === 200) {
					//返回成功处理  这里传的啥 后续调用的时候 res就是啥
					resolve(response.data); //我们后台所有数据都是放在返回的data里所以这里统一处理了
				} else {
					//错误处理
					uni.showToast(response.msg)
				}
			})
			.catch(err => {
				reject(err);
				let message = '请求失败！请检查网络';
				//错误返回
				if (err.response) message = err.response.data.message;
				uni.showToast(message)
			})
	})
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.post(url, data)
			.then(response => {
				console.log("请求成功后拦截111")
				if (response.status === 200) {
					resolve(response.data);
				} else {
					uni.showToast(response.msg)
				}
			}, err => {
				reject(err);
				let message = '请求失败！请检查网络';
				if (err.response) message = err.response.data.message;
				uni.showToast(message)
			})
	})
}


/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.put(url, data)
			.then(response => {
				if (response.status === 200) {
					resolve(response.data);
				} else {
					uni.showToast(response.msg)
				}
			}, err => {
				reject(err);
				let message = '请求失败！请检查网络';
				if (err.response) message = err.response.data.message;
				uni.showToast(message)
			})
	})
}

export function del(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.delete(url, data)
			.then(response => {
				if (response.status === 200) {
					resolve(response.data);
				} else {
					uni.showToast(response.msg)
				}
			}, err => {
				reject(err);
				let message = '请求失败！请检查网络';
				if (err.response) message = err.response.data.message;
				uni.showToast(message)
			})
	})
}

export function upload(url, data = {}) {
	return new Promise((resolve, reject) => {		
		uni.uploadFile({
						  url: 'http://192.168.3.4:8088/course-effect/'+ url , 
			              filePath: data.file,
			              name: 'file',
						  header:{
							  'Authorization':uni.getStorageSync('token')
						  },
			              formData: {
			              },
			              success: (response) => {
							  resolve(response);			                
			              }
		})
	})
}
