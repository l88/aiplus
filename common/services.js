var app = getApp();
module.exports = {
  loadMyhomes: function (cb) {
    var myId = app.globalData.userInfo.openId;
    wx.getStorage({
      key: 'myHomes',
      success: function (res) {
        console.log(res)
        typeof cb == "function" && cb(res.data);
      },
      fail: function (res) {
        //TODO load from host
        typeof cb == "function" && cb(testData.myHomes);
      }
    })
  },
  getHomeInfo: function (id, cb) {
    var homeInfo = { home_id: id, name: '张三的家', avatarUrl: '../../../images/avatar_computer.png', desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。' }
    typeof cb == "function" && cb(homeInfo);
  },
  getDelivers: function () {
    //fetch from host
    var ret = wx.getStorageSync("delivers");
    return ret ? ret : [];
  },
  addDeliver: function (deliver) {
    //TODO push to host
    var ds = wx.getStorageSync("delivers")
    if (!ds) ds = [];
    ds.push(deliver);
    wx.setStorageSync('delivers', ds);
  },
  /**
   * 加载家里已发布的书信
   */
  loadHomeDelivers: function (param, cb) {
    var ds = []
    if (param.homeId) {
      var ds1 = wx.getStorageSync("delivers");
      if (!ds1) ds1 = [];
      ds = ds1.filter((a) => a.homeId == param.homeId);
    }
    typeof cb == "function" && cb(testData.hdelivers);
  },
  getHomePref: function (hid, cb) {
    var hps = wx.getStorageSync("homePrefs");
    console.log("hps=" + hps);
    if (!hps) hps = [];
    //TODO sync from host
    var hp = hps.find((a) => a.homeId == hid);
    if (!hp) hp = testData.homePref; //TEST
    hp && typeof cb == "function" && cb(hp);
  },
  getMyHomePref: function (hid, myid, cb) {
    var myps = wx.getStorageSync("myPrefs");
    if (!myps) myps = [];
    //TODO sync from host
    var myp = myps.find((a) => a.homeId == hid && a.personId == myid);
    if (!myp) myp = testData.myPref; //TEST
    myp && typeof cb == "function" && cb(myp);
  },
  maxId: function (array, idName) {
    var maxid = -1;
    idName = idName ? idName : 'id';
    array.forEach(function (v) {
      maxid = maxid > v[idName] ? maxid : v[idName];
    }, this);
    return maxid;
  }
}

var defaultData = {
  homePref: { relationName: '身份', rightsName: '权益', rightsUnit: '票' }
}
var testData = {
  hdelivers: [
    { id: 0, homeId: 3, sender: { id: 99, nickName: '张三', relations: [{ id: 1, name: '东3101' }, { id: 2, name: '东2105' }] }, letterId: 99, time: 1499160092214, dtype: 'letter', letter: { id: 99, title: '测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1测试1', content: '测试加油测试加油测试加油测试加油测试加油测试加油测试加油测试加油测试加油测试加油测试加油测试加油测试加油测试加油测试加油测试加油测试加油测试加油测试加油测试加油', ltype: 'plain', version: 1, mtime: 1499160087736, ownerId: 99, owner: { nickName: '李四' } }, votes: { aye: { persons: 5, rightsNum: 8, rights: 1097.5 }, nay: { persons: 2, rightsNum: 3, rights: 809 } }, comments:6 }
    , { id: 4, homeId: 3, sender: { id: 99, nickName: '张三a', relations: [{ id: 1, name: '东3101a' }, { id: 2, name: '东2105a' }] }, letterId: 99, time: 1499160092214, dtype: 'letter', letter: { id: 99, title: '测试2a', content: '测试加油a', ltype: 'plain', version: 1, mtime: 1499160087736, ownerId: 99, owner: { nickName: '李四a' } }, votes: { aye: { persons: 5, rightsNum: 8, rights: 1097.5 }, nay: { persons: 2, rightsNum: 3, rights: 809 } }, comments: 6 }
    , { id: 2, homeId: 3, letterId: 99, time: 1499160092214, dtype: 'tips', tip:{desc:'asdfsadddddddddddddddddd sdfsadf sfdaasdfasdf 12:30'}} 
    , { id: 3, homeId: 3, sender: { id: 99, nickName: '张三b', relations: [{ id: 1, name: '东3101a' }, { id: 2, name: '东2105a' }] }, letterId: 99, time: 1499160092214, dtype: 'letter', letter: { id: 99, title: '测试2b', content: '测试加油b', ltype: 'plain', version: 1, mtime: 1499160087736, ownerId: 99, owner: { nickName: '李四a' } }, votes: { aye: { persons: 5, rightsNum: 8, rights: 1097.5 }, nay: { persons: 2, rightsNum: 3, rights: 809 } }, comments: 6 }]
  , homePref: { id: 99, homeId: 22, owner: 11, isPublic: false, isAcceptable: true, name: '张三的家', desc: '张三和王五的家', relationName: '房号', rightsName: '面积', rightsUnit: '平米', canMbApprove: false, minAcceptRights: 1, minApplys: 1, minApplyRights: 2, applyTips: '申请面积调整，需要提交和验证身份证及房产证明' }
  , myPref: { id: 99, personId: 11, homeId: 22, nickName: '小五', totalRights: 113.7, relations: [{ id: 11, name: '客人', rights: 0 }, { id: 22, name: 'S13A', rights: 113.7 }] }
  , myHomes: [
    { id: 2, name: "马云之家马云之家马云之家马云之家马云之家马云之家马云之家马云之家马云之家马云之家马云之家马云之家马云之家马云之家马云之家马云之家马云之家马云之家", avatar: "http://img1.3lian.com/gif/more/11/201212/0d1252b54be4f2d240b6b7fe4ed35054.jpg", message: "小马:什么鬼，我有支付宝 什么鬼，我有支付宝什么鬼，我有支付宝什么鬼，我有支付宝什么鬼，我有支付宝什么鬼，我有支付宝什么鬼，我有支付宝什么鬼，我有支付宝什么鬼，我有支付宝什么鬼，我有支付宝什么鬼，我有支付宝什么鬼，我有支付宝什么鬼，我有支付宝什么鬼，我有支付宝什么鬼，我有支付宝", time: "13:15", newNum: 1 }
    , { id: 5, name: "马化腾之家", avatar: "http://img1.3lian.com/gif/more/11/201212/cd1d745ed855bef27f47c8aff0786067.jpg", message: "大大:哈哈哈，我要一统江湖啦", time: "9:15", newNum: 2 }
    , { id: 4, name: "客服之家1", avatar: "../../images/avatar_computer.png", message: "小提示：如何创建我的家。", time: "21:15", newNum: 20 }
    , { id: 3, name: "客服之家2", avatar: "../../images/avatar_computer.png", message: "小提示：如何创建我的家。", time: "21:15", newNum: 990 }
    , { id: 1111, name: "客服之家3", avatar: "../../images/avatar_computer.png", message: "小提示：如何创建我的家。", time: "21:15", newNum: 0 }
    , { id: 11, name: "客服之家4", avatar: "../../images/avatar_computer.png", message: "小提示：如何创建我的家。", time: "21:15", newNum: 0 }
  ]
}