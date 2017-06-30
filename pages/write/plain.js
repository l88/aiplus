var myLetters = []
var app = getApp();
var myid;
var isNewLetter = true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    letter: { title: '', content: '', type: 'plain', version: 0 },
    wordCount: 0,
    maxWords: 400
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opts) {
    myid = app.globalData.userInfo.uid
    this.data.letter.owner = myid
    try {
      var vs = wx.getStorageSync('myLetters')
      if (vs) {
        myLetters = vs;
      }
    } catch (e) {
      console.log(e)
    }
    if (opts.id) {
      var letter = myLetters.find((a) => a.id == opts.id);
      if (letter) {
        this.setData({ letter: letter });
        isNewLetter = false;
      }
    }
  },
  inputTitle: function (e) {
    var v = e.detail.value;
    var letter = this.data.letter;
    letter.title = v;
    //this.setData({ letter: letter })
  },
  inputing: function (e) {
    var v = e.detail.value;
    var letter = this.data.letter;
    letter.content = v;
    this.setData({ wordCount: v.length })
  },
  tapSave: function () {
    this.saveToHost(this.data.letter, function (l) {
      wx.showToast({
        title: '保存成功'
      })
    });
  },
  tapSaveSend: function () {
    this.saveToHost(this.data.letter, function (l) {
      //TODO send
      wx.showToast({
        title: '发送成功'
      });
      wx.navigateBack();
    });
  },
  saveToHost: function (letter, cb) {
    letter.mtime = Date.now();
    if (isNewLetter) {
      myLetters.push(letter);
      isNewLetter = false;
    }

    var newId = 99;// sendHost(this.data.letter); TODO send to host
    if (newId && !letter.id) {
      letter.id = newId;
    }
    //cache
    wx.setStorage({ key: 'myLetters', data: myLetters })

    typeof cb == "function" && cb(letter)
  }
})