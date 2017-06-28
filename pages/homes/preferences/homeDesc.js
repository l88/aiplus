// homeDesc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    homeDesc: '',
    homeName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opt) {
    opt && opt.name && this.setData({ homeName: opt.name, homeDesc:opt.desc })
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
      prePage.data.homePref.desc = this.data.homeDesc
      prePage.setData({ homePref: prePage.data.homePref })
    }
    wx.navigateBack()
  },
  inputHomeDesc: function (e) {
    this.setData({ homeDesc: e.detail.value })
  }
})