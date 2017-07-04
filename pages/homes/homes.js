var srv = require("../../common/services.js");
var app = getApp();
Page({
  data: {
    scrollerHeight: 0,
    toView: "",
    scrollTop: "",
    myHomes: []
  },
  onLoad: function (opt) {
    var that = this;
    srv.getHomePref("10");
    srv.loadMyhomes(function (res) {
      res.sort((a, b) => b.newNum - a.newNum == 0 ? a.id - b.id : b.newNum - a.newNum);
      that.setData({ myHomes: res })
    });

    //设置界面宽度高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollerHeight: res.windowHeight - 70
        });
      }
    });
  },
  upper: function () {

  },
  lower: function () {

  }
});