// pages/homes/search/search.js
var util = require('../../../utils/util.js')
var searchInput = ''
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchVal:'',
    searchKey: '',
    results: { count: 0, data: {} }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    options.s && this.setData({ searchVal: options.s })
    options.s && this.searchHome()
  },
  searchTyping: function (e) {
    this.setData({
      searchVal: e.detail.value
    });
  },
  clearSearch: function () {
    this.setData({
      searchVal: ""
    });
  },
  searchHome: function () {
    var that = this
    util.getMyHomes(function (opt) {
      var homes = opt.data
      that.setData({ results: { count: 3, data: homes } })
    })
  }
})