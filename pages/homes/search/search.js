// pages/homes/search/search.js
var util = require('../../../utils/util.js')
var searchInput = ''
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchKey: '',
    results: { count: 0, data: {} }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    options.s && this.setData({ searchKey: options.s })
    options.s && this.bindSearch()
  },
  bindSearchInput: function (e) {
    searchInput = e.detail.value
  },
  bindSearch: function () {
    var that = this
    util.getMyHomes(function (opt) {
      var homes = opt.data
      that.setData({ results: { count: 3, data: homes } })
    })
  }
})