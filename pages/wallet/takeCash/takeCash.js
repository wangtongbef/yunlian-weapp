// pages/wallet/takecash/takecash.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    balance: 0,
    postCashBalance:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
        console.log(res)
        that.setData({
          balance: res.data.data.amount
        })
      }
    })
    wx.request({
      url: getApp().data.servsers+'finance/withdraw',
      method: 'POST',
      data: {
        amount: 0.01,
        token: that.data.token
      },
      success: function (res) {
        console.log(res)
        console.log(res.data.data)
        that.setData({
          postCashBalance: res.data.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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