// letters.js
var app = getApp();
var srv = require("../../../common/services.js");
var util = require("../../../utils/util");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchShowed: false,
    switchName:'书信',
    scrollerHeight: 0,
    searchVal: "",
    delivers: [],
    vDelivers: [],
    homeInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opt) {
    var that = this
    opt && opt.name && wx.setNavigationBarTitle({
      title: opt.name,
    })
    srv.getHomeInfo(opt.id, function (hi) {
      that.setData({ homeInfo: hi });
    });

    //获取家里的所有发布
    srv.loadHomeDelivers({ homeId: opt.id }, delivers => {
      delivers.every(e => {
        e.dtime=util.formatNowDiff(e.time);
      return true;});
      that.setData({ delivers: delivers, vDelivers: delivers });
    })
    //设置界面宽度高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollerHeight: res.windowHeight - 70
        });
      }
    });
  },
  searchTyping: function (e) {
    this.setData({
      searchVal: e.detail.value
    });
  },
  showSearch: function () {
    this.setData({
      searchShowed: true
    });
  },
  hideSearch: function () {
    this.setData({
      searchVal: "",
      searchShowed: false
    });
  },
  clearSearch: function () {
    this.setData({
      searchVal: ""
    });
  },
  lower: function () {

  },
  upper: function () {

  },
  switchList(e){
    var names = ['书信', '申请', '决议'];
    var that = this;
    wx.showActionSheet({
      itemList: names,
      success(res){
        if(res.cancel) return;
        that.setData({ switchName: names[res.tapIndex]})
      }
    })
  }
})