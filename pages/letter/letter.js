//letter.js
var util = require('../../utils/util.js')

var app = getApp()
Page({
  data: {
    motto: '知乎--微信小程序版',
    userInfo: {}
  },
  //事件处理函数
  toQuestion: function () {
    wx.navigateTo({
      url: '../question/question'
    })
  },
  onLoad: function (p) {
    var letter_title = p.title
    letter_title && wx.setNavigationBarTitle({
      title: letter_title
    })
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  tapName: function (event) {
    console.log(event)
  }
})
