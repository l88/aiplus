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
      wx.showModal({
        title: '请录入新家的名称',
        content: '家的名称不能为空',
        showCancel: false
      })
      return
    }
    wx.navigateBack();
    /*
    util.createHome({ name: newName }, function () {
      wx.navigateBack()
    }
    )
    */
  }
})