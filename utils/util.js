module.exports = {
  formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()


    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  },
  formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  },
  /**
   * 计到当前的时间差格式化,用于信件列表显示
   * @param date Date对象，或Date.toString()
   */
  formatNowDiff(date) {
    date = typeof date == "Date" ? date : new Date(date);
    var dTime = Date.now() - date.getTime();
    var days = Math.floor(dTime / (24 * 3600 * 1000))
    var leave1 = dTime % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000))
    var leave2 = leave1 % (3600 * 1000)        //计算小时数后剩余的毫秒数 
    var minutes = Math.floor(leave2 / (60 * 1000))
    var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000)
    return (days > 0 ? days + '天' : (hours > 0 ? hours + '小时' : (minutes > 0 ? minutes + '分钟' : seconds + '秒'))) + '前';
  }


}

var index = require('../data/data_index.js')
var index_next = require('../data/data_index_next.js')
var discovery = require('../data/data_discovery.js')
var discovery_next = require('../data/data_discovery_next.js')

function getData(url) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: {},
      header: {
        //'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("success")
        resolve(res)
      },
      fail: function (res) {
        reject(res)
        console.log("failed")
      }
    })
  })
}

function getData2() {
  return index.index;
}

function getNext() {
  return index_next.next;
}

function getDiscovery() {
  return discovery.discovery;
}

function discoveryNext() {
  return discovery_next.next;
}



module.exports.getData = getData;
module.exports.getData2 = getData2;
module.exports.getNext = getNext;
module.exports.getDiscovery = getDiscovery;
module.exports.discoveryNext = discoveryNext;

var data_homes = require('../data/data_homes.js')

function getMyHomes(cb) {
  var homes = data_homes.homes
  typeof cb == "function" && cb(homes)
}
function createHome(d, cb) {
  var homes = data_homes.homes
  var newHome = {}
  var userinfo = undefined
  if (d == undefined) return
  getApp().getUserInfo(function (e) {
    userinfo = e
  })
  if (userinfo == undefined) return
  d.name ? newHome.name = d.name : newHome.name = '新建的家'
  newHome.owner = userinfo.uid
  homes.data.push(newHome)//TODO 发到后台
  newHome.home_id = 9 //TODO DEBUG
  console.log(newHome)
  typeof cb == 'function' && cb(newHome)
}

module.exports.getMyHomes = getMyHomes;
module.exports.createHome = createHome;
