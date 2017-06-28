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
    testData.relations = testData.relations.filter((a) => a.rights > 0);
    testData.relations.sort((a, b) => a.personId < b.personId ? -1 : 1);
    this.setData({ relations: testData.relations, vRelations: testData.relations });
    this.data.homePref.name && wx.setNavigationBarTitle({
      title: this.data.homePref.name + '(' + testData.relations.length + ')'
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
    var checkboxItems = this.data.vRelations, value = e.detail.value;
    var checkItem = this.data.vRelations.filter((a) => a.id == value);
    if (checkItem.length > 0) {
      var item = checkItem[0];
      wx.showModal({
        title: '转让家主确认',
        content: '请确认是否将家主转让给['+item.nickName+']？',
        confirmText: "转让",
        cancelText: "取消",
        success: function (res) {
          if (res.confirm) {
            wx.showToast({
              title: '已转让家主'
            })
            wx.navigateBack()
          }
        }
      });

    }

  }
});