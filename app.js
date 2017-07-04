const qcloud = require('./vendor/qcloud-weapp-client-sdk/index');
const config = require('./config');
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    qcloud.setLoginUrl(config.service.loginUrl);
  },
  config: config,
  wafer: qcloud,
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      qcloud.request({
        login:true,
        url:config.service.meUrl,
        success(res) {
            that.globalData.userInfo = res.data;
            typeof cb == "function" && cb(that.globalData.userInfo)
        },
        fail(err){
          wx.reLaunch({
            url: '/pages/index'
          })
        }
      });
    }
  },
  globalData: {
    userInfo: null
  }
})
