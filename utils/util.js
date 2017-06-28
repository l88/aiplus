function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
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

function getMyHomes(cb){
  var homes =data_homes.homes
  typeof cb == "function" && cb(homes)
}
function createHome(d,cb){
  var homes = data_homes.homes
  var newHome={}
  var userinfo=undefined
  if(d == undefined) return
  getApp().getUserInfo(function(e){
    userinfo=e
  })
  if(userinfo==undefined) return
  d.name?newHome.name = d.name:newHome.name='新建的家'
  newHome.owner = userinfo.uid
  homes.data.push(newHome)//TODO 发到后台
  newHome.home_id = 9 //TODO DEBUG
  console.log(newHome)
  typeof cb == 'function' && cb(newHome)
}

module.exports.getMyHomes = getMyHomes;
module.exports.createHome = createHome;
