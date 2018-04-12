// pages/wallet/walletDetail/walletDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    wallList:[]
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
      url: getApp().data.servsers + 'finance/trade',
      method: 'POST',
      data: {
        page: 0,
        token: that.data.token
      },
      success: function (res) {
        wx.hideLoading()
        var list = res.data.data.list
        var wallList=[]
        for (var i = list.length-1; i>=0; i--) {
          wallList.push(list[i])
        }
        that.setData({
          wallList: wallList
        })
      }
    })
  },
  linkDetail(e){
    var trade_id = e.currentTarget.dataset.trade_id
    wx.navigateTo({
      url: '../walletDetail/walletDetail?trade_id=' + trade_id,
    })
  }
})