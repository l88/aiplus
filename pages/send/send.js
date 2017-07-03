var testData = {
  myHomes: [
    { id: 2, name: "马云之家马云之家马云之家马云之家马云之家马云之家马云之家马云之家马云之家马云之家马云之家马云之家马云之家马云之家马云之家马云之家马云之家马云之家", avatar: "http://img1.3lian.com/gif/more/11/201212/0d1252b54be4f2d240b6b7fe4ed35054.jpg", message: "小马:什么鬼，我有支付宝", time: "13:15", newNum: 1 }
    , { id: 5, name: "马化腾之家", avatar: "http://img1.3lian.com/gif/more/11/201212/cd1d745ed855bef27f47c8aff0786067.jpg", message: "大大:哈哈哈，我要一统江湖啦", time: "9:15", newNum: 2 }
    , { id: 4, name: "客服之家1", avatar: "../../images/avatar_computer.png", message: "小提示：如何创建我的家。", time: "21:15", newNum: 20 }
    , { id: 3, name: "客服之家2", avatar: "../../images/avatar_computer.png", message: "小提示：如何创建我的家。", time: "21:15", newNum: 990 }
    , { id: 1111, name: "客服之家3", avatar: "../../images/avatar_computer.png", message: "小提示：如何创建我的家。", time: "21:15", newNum: 0 }
    , { id: 11, name: "客服之家4", avatar: "../../images/avatar_computer.png", message: "小提示：如何创建我的家。", time: "21:15", newNum: 0 }
  ]
}
var letterId=0
var app=getApp();
Page({
  data: {
    scrollerHeight: 0,
    searchVal: "",
    myHomes: [],
    vHomes: [] //for view
  },
  onLoad: function (opt) {
    var that = this;
    if(!opt.letterid){
      wx.navigateBack()
      return
    }
    letterId = opt.letterid

    testData.myHomes.sort((a, b) => a.id - b.id);
    this.setData({ myHomes: testData.myHomes, vHomes: testData.myHomes })
    wx.setNavigationBarTitle({
      title: '发信'
    })

    //设置界面宽度高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollerHeight: res.windowHeight - 200
        });
      }
    });
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  searchTyping: function (e) {
    var v = e.detail.value
    this.setData({
      searchVal: v
    });
    if (!v) {
      this.setData({ vHomes: testData.myHomes });
      return
    }
    this.setData({
      vHomes:
      testData.myHomes.filter((a) => a.name.indexOf(v) >= 0)
    });
  },
  clearSearch: function () {
    this.setData({ vHomes: testData.myHomes });
    this.setData({
      searchVal: ""
    });
  },
  checkHomes: function (e) {
    var checkboxItems = this.data.vHomes, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;
      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].id == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }
    this.setData({
      vHomes: checkboxItems
    });
  },
  tapSend: function () {
    var items = this.data.vHomes.filter((a) => a.checked);
    if (items.length == 0) {
      wx.showModal({
        content: '请选择'
      })
      return
    }

    items.forEach(function(v,i,a){
      app.addDeliver({
        id: 0, sender: app.globalData.userInfo.uid
        ,homeId:v.id,letterId:letterId
        ,time:Date.now()
      });
    },this);
    wx.showToast({
      title: '已发送'
    })
  }
});