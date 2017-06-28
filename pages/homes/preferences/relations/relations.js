// relations.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newRights: '',
    relation: {},
    homePref: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opt) {
    var pages = getCurrentPages();
    var prePage
    if (pages.length > 1) {
      prePage = pages[pages.length - 2];
      this.setData({ homePref: prePage.data.homePref })
    }
    if (opt.rId) {
      var relation
      for (var r of prePage.data.myPref.relations)
        if (r.id == opt.rId) {
          relation = r
          break
        }
      relation && this.setData({ newRights: relation.rights, relation: relation })
    }
  },
  goBack: function () {
    wx.navigateBack()
  },
  delete: function () {
    //TODO delete
    //刷新上页数据
    //获取页面栈
    var pages = getCurrentPages();
    if (pages.length > 1) {
      //上一个页面实例对象
      var prePage = pages[pages.length - 2];
      //关键在这里
      //prePage.changeData(e.detail.value)
    }
    wx.navigateBack()
  },
  save: function () {
    this.data.relation.rights = this.data.newRights
    //TODO save
    //刷新上页数据
    wx.navigateBack()
  },
  apply: function () {
    //TODO apply
    wx.navigateBack()
  },
  inputRights: function (e) {
    this.setData({ newRights: e.detail.value })
  }
})