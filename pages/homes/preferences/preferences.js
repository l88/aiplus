// preferences.js
var srv = require("../../../common/services.js");
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    homePref: {},
    myPref: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opt) {
    var that = this;
    var hid = opt.id,hn=opt.name;
    var myId = app.globalData.userInfo.uid;
    srv.getHomePref(hid,function(hpref){
      that.setData({homePref:hpref});
    });
    srv.getMyHomePref(hid,myId,function(mpref){
      that.setData({myPref:mpref});
    });
  }
})