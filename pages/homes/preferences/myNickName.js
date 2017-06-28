// myNickName.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opt) {
    opt && opt.name && this.setData({ nickName: opt.name })
    if (!opt || !opt.id)
      wx.navigateBack()
  },
  goBack: function () {
    wx.navigateBack()
  },
  save: function () {
    //TODO save
    //刷新上页数据
    var pages = getCurrentPages();
    if (pages.length > 1) {
      //上一个页面实例对象
      var prePage = pages[pages.length - 2];
      //关键在这里
      prePage.data.myPref.nickName=this.data.nickName
      prePage.setData({ myPref: prePage.data.myPref})
    }
    wx.navigateBack()
  },
  inputNickName: function (e) {
    this.setData({ nickName: e.detail.value })
  }
})