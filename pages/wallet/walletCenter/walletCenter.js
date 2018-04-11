// pages/wallet/takeCash/takeCash.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstIn:true,
    token: '',
    balance: '',
    listshow:false,
    nearby: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var tokenRoles = wx.getStorageSync('tokenRoles')
    that.setData({
      token: tokenRoles.token
    })
    wx.request({
      url: getApp().data.servsers + 'finance/index',
      method: 'POST',
      data: {
        token: that.data.token
      },
      success: function (res) {
        that.setData({
          balance: res.data.data.amount
        })
      }
    })
    wx.request({
      url: getApp().data.servsers + 'finance/trade',
      method: 'POST',
      data: {
        page: 0,
        token: that.data.token
      },
      success: function (res) {
        wx.hideLoading()
        var nearby = res.data.data.list
        var wallList = []
        for (var i = nearby.length-1; i >= 0; i--) {
          wallList.push(nearby[i])
        }
        that.setData({
          nearby: wallList
        })
        if (nearby.length!==0){
          that.setData({
            listshow: true
          })
        }
      }
    })
  },
  linkList(){
    wx.navigateTo({
      url: '../walletList/walletList',
    })
  },
  linkBtn(){
    wx.navigateTo({
      url: '../takeCash/takeCash',
    })
  },
  linkDetail(e){
    var trade_id = e.currentTarget.dataset.trade_id
    wx.navigateTo({
      url: '../walletDetail/walletDetail?trade_id=' + trade_id,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    that.setData({
      firstIn:false
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showLoading({
      title: '加载中',
    })
    var that=this
    if (!that.data.firstIn){
      var tokenRoles = wx.getStorageSync('tokenRoles')
      that.setData({
        token: tokenRoles.token
      })
      wx.request({
        url: getApp().data.servsers + 'finance/index',
        method: 'POST',
        data: {
          token: that.data.token
        },
        success: function (res) {
          that.setData({
            balance: res.data.data.amount
          })
        }
      })
      wx.request({
        url: getApp().data.servsers + 'finance/trade',
        method: 'POST',
        data: {
          page: 0,
          token: that.data.token
        },
        success: function (res) {
          wx.hideLoading()
          var nearby = res.data.data.list
          var wallList = []
          for (var i = nearby.length - 1; i >= 0; i--) {
            wallList.push(nearby[i])
          }
          that.setData({
            nearby: wallList
          })
          if (nearby.length !== 0) {
            that.setData({
              listshow: true
            })
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})