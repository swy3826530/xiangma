// 获取cookie
export function getCookie(name) {
  var arr,
    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  // eslint-disable-next-line no-cond-assign
  if ((arr = document.cookie.match(reg))) {
    return arr[2];
  } else {
    return null;
  }
}

// 设置cookie,增加到vue实例方便全局调用
export function setCookie(cName, value, expiredays) {
  var exdate = new Date();
  exdate.setTime(exdate.getTime() + expiredays * 24 * 60 * 60 * 1000);
  document.cookie =
    cName +
    "=" +
    escape(value) +
    (expiredays == null ? "" : ";expires=" + exdate.toGMTString());
}
// 删除cookie
export function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null) {
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  }
}
