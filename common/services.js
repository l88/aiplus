module.exports = {
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
  getDelivers: function (param, cb) {
    var ds = []
    if (param.homeId) {
      var ds1 = wx.getStorageSync("delivers");
      if (!ds1) ds1 = [];
      ds = ds1.filter((a) => a.homeId == param.homeId);
    }
    typeof cb == "function" && cb(ds);
  },
  getHomePref: function (hid, cb) {
    var hps = wx.getStorageSync("homePrefs");
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
  homePref: { id: 99, homeId: 22, owner: 11, isPublic: false, isAcceptable: true, name: '张三的家', desc: '张三和王五的家', relationName: '房号', rightsName: '面积', rightsUnit: '平米', canMbApprove: false, minAcceptRights: 1, minApplys: 1, minApplyRights: 2, applyTips: '申请面积调整，需要提交和验证身份证及房产证明' }
  , myPref: { id: 99, personId: 11, homeId: 22, nickName: '小五', totalRights: 113.7, relations: [{ id: 11, name: '客人', rights: 0 }, { id: 22, name: 'S13A', rights: 113.7 }] }
}