// preferences.js
var homePref = { id: 99, homeId: 22, owner: 11, isPublic: false, isAcceptable: true, name: '张三的家', desc: '张三和王五的家', relationName: '房号', rightsName: '面积', rightsUnit: '平米', canMbApprove:false, minAcceptRights: 1, minApplys:1,minApplyRights: 2, applyTips:'申请面积调整，需要提交和验证身份证及房产证明'}
var relations = [{id:11, name: '客人', rights: 0 }, {id:22, name: 'S13A', rights: 113.7 }]
var myPref = { id: 99,personId:11,homeId:22, nickName: '小五', totalRights: 113.7, relations: relations }
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
  onLoad: function (options) {
    this.setData({
      myPref: myPref,
      homePref: homePref
    })
  }
})