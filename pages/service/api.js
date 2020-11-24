import Vue from 'vue';
import { fetch,post,put,del,upload} from './index'
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$put=put;
Vue.prototype.$del=del;
Vue.prototype.$upload=upload;


//登录方法
const loginURL = `passport/login`;
export const loginApi = function(json) {
	console.log(json)
  return Vue.prototype.$post(loginURL,{"phone":json.phone,"password":json.password})
};
//注册
const registURL = `passport/regist`;
export const registApi = function(json) {
	console.log(json)
  return Vue.prototype.$post(registURL,{"phone":json.phone,"password":json.password,"confirmPassword":json.confirmPassword,"orgName":json.orgName,"orgNum":json.orgNum})
};


//作品圈列表
const painsMessageOrgURL = `paints-message/org`;
export const painsMessageOfOrgListApi = function (json) {
  return Vue.prototype.$fetch(painsMessageOrgURL,{"pageNum":json.pageNum,"pageSize":json.pageSize})
};

//点赞
const painsLikeURL = `paintsMessage/like`;
export const painsLikeApi = function (json) {
  return Vue.prototype.$post(painsLikeURL+`?pcmid=${json.pcmid}`)
};
//取消点赞
export const cancelPainsLikeApi = function (json) {
  return Vue.prototype.$del(painsLikeURL+`?pcmid=${json.pcmid}`)
};

//评论
const painsCommentURL = `paintsMessage/comment`;
export const painsCommentApi = function (json) {
  return Vue.prototype.$post(painsCommentURL,{"content":json.content,"star":json.star,"pcmid":json.pcmid})
};

//上传图片
const painsImgUploadURL = `paints-message/upload`;
export const painsImgUploadApi = function (json) {
  return Vue.prototype.$upload(painsImgUploadURL,{"file":json.file})

};
