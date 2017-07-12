var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    successInfo: '欢迎您',
    failInfo: '',
    tryAuth: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getMeInfo();
  },
  tapAuth() {
    var that = this;
    wx.openSetting({
      success(authSetting) {
        console.log('authSetting',authSetting)
        if (authSetting["scope.userInfo"]) {
          that.getMeInfo();
        }
      }
    })
  },
  /**
   * 获取用户信息
   */
  getMeInfo(err, success) {
    var that = this;
    app.wafer.request({
      login: true,
      url: app.config.service.meUrl,
      success(res) {
        app.globalData.userInfo = res.data;
        wx.switchTab({
          url: 'homes/homes'
        });
        typeof success == "function" && success(res.data)
      },
      fail(res) {
        console.log('getMeError', res);
        that.setData({ tryAuth: true, failInfo: res.toString() });
        typeof err == "function" && err(res);
      }
    });
  }
})