// admin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    homePref: {}
  },
  prePage: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opt) {
    var pages = getCurrentPages();
    if (pages.length > 1) {
      this.prePage = pages[pages.length - 2];
      this.setData({ homePref: this.prePage.data.homePref })
    }
    if (opt.id != this.data.homePref.id)
      wx.navigateBack()
  },
  goBack: function(){
    wx.navigateBack()
  },
  save:function(){
    
  }
})