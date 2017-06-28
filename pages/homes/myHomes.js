/* homes.js */
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    homes: []
  },
  formData: {
    search: ''
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    //console.log(options);
    app.getUserInfo()
  },
  onShow: function () {
    // 页面渲染完成
    var that = this
    util.getMyHomes(function (opt) {
      var homes = opt.data
      that.setData({ homes: homes })
    })
  },
  bindInSearch: function (e) {
    this.formData.search = e.detail.value
  },
  bindTapSearch: function () {
    wx.navigateTo({
      url: 'search/search?s=' + this.formData.search
    })
  },
  bindTapNew: function () {
    wx.navigateTo({
      url: 'newhome/newhome'
    })
  }
})