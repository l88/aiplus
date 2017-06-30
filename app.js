//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.getUserInfo();
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function (res) {
          wx.getUserInfo({
            success: function (resi) {
              that.globalData.userInfo = resi.userInfo
              that.globalData.userInfo.uid=99//TODO
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
          /*
                    if (res.code) {
                      //发起网络请求
                      wx.request({
                        url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx6350490b4a2bb74e&secret=f00a82995941a972187276eea4ec0482&js_code=' + res.code + '&grant_type=authorization_code',
                        data: {
                          code: res.code
                        },
                        method: 'POST',
                        header: {
                          'content-type': 'application/x-www-form-urlencoded'
                        },
                        success: function (res) {
                          console.log('logres=' + res);
                          var sessionKey = res.data.session_key
                          var openId = res.data.openid
                          console.log('sessionKey='+sessionKey)
                        },
                        fail: function (res) {
                          console.log('submit fail'+res);
                        },
                        complete: function (res) {
                          console.log('submit complete');
                        }
                      })
                    } else {
                      console.log('获取用户登录态失败！' + res.errMsg)
                    }
          */
        }
      })
    }
  },
  globalData: {
    userInfo: null
  }
})