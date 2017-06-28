// newhome.js
var util = require('../../../utils/util.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  formSubmit: function (e) {
    var newName = e.detail.value.newName
    if (newName == '') {
      wx.showToast({
        title: '请录入新家的名称',
        icon: 'loading'
      })
      return
    }
    util.createHome({ name: newName }, function () {
      wx.navigateBack()
    }
    )
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})