// plain.js
var util = require("../../../../utils/util");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deliver: {
      id: 0, homeId: 3, sender: { id: 99, nickName: '张三' }, letterId: 99, time: 1499160092214, dtype: 'letter',
      letter: {
        id: 99, title: '测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1',
        content: '测试加油测试加油测试加油测试加油测试加油测试加油测试加油测试加油测试加油测试加油测试加油测试加油测试加油测试加油测试加油测试加油测试加油测试加油测试加油测试加油',
        ltype: 'plain', version: 1, mtime: 1499160087736, ownerId: 99, owner: { nickName: '李四' }
      },
      votes: {
        aye: { persons: 5, rightsNum: 8, rights: 1097.5 },
        nay: { persons: 2, rightsNum: 3, rights: 809 }
      }, comments: 6
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ dtime: util.formatTime(new Date(this.data.deliver.time)) });
  },
  voteDetail(e){
    wx.navigateTo({
      url: 'voteDetail',
    })
  }

})