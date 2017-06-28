var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var testData = {
  relations: [
    { id: 9, personId: 15, homeId: 99, nickName: '王五', name: '客人', rights: 0 },
    { id: 1, personId: 11, homeId: 99, nickName: '张三', name: '客人', rights: 0 },
    { id: 2, personId: 12, homeId: 99, nickName: '张四张四', name: '南22A', rights: 113.7 },
    { id: 3, personId: 11, homeId: 99, nickName: '张三', name: '北11D', rights: 117 }
  ]
}
Page({
  data: {
    tabs: ["按成员昵称", "按成员身份"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    scrollerHeight: 0,
    searchVal: "",
    relations: [],
    vRelations: [], //for view
    homePref: {}
  },
  prePage: {},
  onLoad: function (opt) {
    var that = this;
    var pages = getCurrentPages();
    if (pages.length > 1) {
      this.prePage = pages[pages.length - 2];
      this.setData({ homePref: this.prePage.data.homePref })
    }

    if (opt.id != this.data.homePref.id)
      wx.navigateBack()
    testData.relations.sort((a, b) => a.personId < b.personId ? -1 : 1);
    this.setData({ relations: testData.relations, vRelations: testData.relations })
    opt.name && wx.setNavigationBarTitle({
      title: opt.name + '(' + testData.relations.length + ')'
    })

    //设置界面宽度高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
          scrollerHeight: res.windowHeight - 250
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
    this.setData({
      searchVal: e.detail.value
    });
    if (!e.detail.value) {
      this.setData({ vRelations: testData.relations });
      return
    }
    var v = e.detail.value
    this.setData({
      vRelations:
      testData.relations.filter((a) => a.nickName.indexOf(v) >= 0 || a.name.indexOf(v) >= 0)
    })
  },
  clearSearch: function () {
    this.setData({ vRelations: testData.relations });
    this.setData({
      searchVal: ""
    });
  },
  checkMembers: function (e) {
    var checkboxItems = this.data.vRelations, values = e.detail.value;
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
      vRelations: checkboxItems
    });
  },
  kickOut: function () {
    var items = this.data.vRelations.filter((a) => a.checked);
    if (items.length == 0) {
      wx.showToast({
        title: '请选择要踢除的成员/身份'
      });
      return
    }
    var names = items.map((a)=> a.nickName+'/'+a.name);
    wx.showModal({
      title: '确认踢除成员',
      content: names.toString()+';确认要踢除以上'+names.length+'个成员吗？',
      confirmText: "踢除",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          wx.showToast({
            title: '已踢除'
          })
          wx.navigateBack()
        }
      }
    })
  }
});