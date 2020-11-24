
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/init","pages/index/lauth","pages/user/login/login","pages/user/register/register","pages/index/index","pages/paint-circle/paint-circle-list","pages/paint-circle/createPaintsMessage","pages/user/my/my","pages/test/test","pages/test1/test1"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#C3B8B4","selectedColor":"#F76605","borderStyle":"white","backgroundColor":"#fff","list":[{"pagePath":"pages/paint-circle/paint-circle-list","text":"发现","iconPath":"static/img/find.png","selectedIconPath":"static/img/find_b.png"},{"pagePath":"pages/user/my/my","text":"我的","iconPath":"static/img/my.png","selectedIconPath":"static/img/my_b.png"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"course-effect","compilerVersion":"2.8.8","entryPagePath":"pages/index/init","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/init","meta":{"isQuit":true},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/index/lauth","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"titleNView":false,"bounce":"none"}},{"path":"/pages/user/login/login","meta":{},"window":{"navigationBarTitleText":"登录","enablePullDownRefresh":false}},{"path":"/pages/user/register/register","meta":{},"window":{"navigationBarTitleText":"注册","enablePullDownRefresh":false}},{"path":"/pages/index/index","meta":{},"window":{"navigationBarTitleText":"uni-app"}},{"path":"/pages/paint-circle/paint-circle-list","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"作品圈","enablePullDownRefresh":false}},{"path":"/pages/paint-circle/createPaintsMessage","meta":{},"window":{"navigationBarTitleText":"发布作品","enablePullDownRefresh":false}},{"path":"/pages/user/my/my","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","enablePullDownRefresh":false}},{"path":"/pages/test/test","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"垂直排列，略缩图显示多图"}},{"path":"/pages/test1/test1","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"垂直排列，图文混排"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});