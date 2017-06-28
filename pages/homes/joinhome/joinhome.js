// joinhome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opt) {
    opt && opt.name && wx.setNavigationBarTitle({
      title: opt.name,
    })
    this.setData({ homeInfo: { home_id: 99, name: '张三的家', avatarUrl: '../../../images/avatar_computer.png', desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。' } })
  }
})