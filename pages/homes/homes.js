var testData = {
  myHomes: [
    { id: -1, name: "我的书信", avatar: "../../images/letter.png", message: "小提示：如何创建我的家。", time: "21:15", newNum: 0 }
    , { id: 2, name: "马云之家马云之家马云之家马云之家马云之家马云之家马云之家马云之家马云之家马云之家马云之家马云之家马云之家马云之家马云之家马云之家马云之家马云之家", avatar: "http://img1.3lian.com/gif/more/11/201212/0d1252b54be4f2d240b6b7fe4ed35054.jpg", message: "小马:什么鬼，我有支付宝 什么鬼，我有支付宝什么鬼，我有支付宝什么鬼，我有支付宝什么鬼，我有支付宝什么鬼，我有支付宝什么鬼，我有支付宝什么鬼，我有支付宝什么鬼，我有支付宝什么鬼，我有支付宝什么鬼，我有支付宝什么鬼，我有支付宝什么鬼，我有支付宝什么鬼，我有支付宝什么鬼，我有支付宝", time: "13:15", newNum: 1 }
    , { id: 5, name: "马化腾之家", avatar: "http://img1.3lian.com/gif/more/11/201212/cd1d745ed855bef27f47c8aff0786067.jpg", message: "大大:哈哈哈，我要一统江湖啦", time: "9:15", newNum: 2 }
    , { id: 4, name: "客服之家1", avatar: "../../images/avatar_computer.png", message: "小提示：如何创建我的家。", time: "21:15", newNum: 20 }
    , { id: 3, name: "客服之家2", avatar: "../../images/avatar_computer.png", message: "小提示：如何创建我的家。", time: "21:15", newNum: 990 }
    , { id: 11, name: "客服之家3", avatar: "../../images/avatar_computer.png", message: "小提示：如何创建我的家。", time: "21:15", newNum: 0 }
    , { id: 10011, name: "客服之家4", avatar: "../../images/avatar_computer.png", message: "小提示：如何创建我的家。", time: "21:15", newNum: 0 }
  ]
}
Page({
  data: {
    scrollerHeight: 0,
    toView:"",
    scrollTop:"",
    myHomes: []
  },
  onLoad: function (opt) {
    var that = this;
    testData.myHomes.sort((a, b) => a.id -b.id);
    this.setData({ myHomes: testData.myHomes});

    //设置界面宽度高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollerHeight: res.windowHeight-70
        });
      }
    });
  },
  upper:function(){

  },
  lower:function(){

  }
});