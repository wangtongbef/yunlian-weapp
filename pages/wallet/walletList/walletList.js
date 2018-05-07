// pages/wallet/walletDetail/walletDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    wallListPage: 1,
    wallListMore: 0,
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
        page: that.data.wallListPage,
        token: that.data.token
      },
      success: function (res) {
        wx.hideLoading()
        if (res.data.code == -3) {
          wx.showToast({
            title: 'token过期',
            icon: 'none',
            duration: 1000
          })
          setTimeout(function () {
            wx.redirectTo({
              url: '../../login/login'
            })
          }, 1000)
        } else {
          var wallList = res.data.data.list
          that.setData({
            wallList: wallList,
            wallListMore: res.data.data.more
          })
        }
      }
    })
  },
  linkDetail(e){
    var trade_id = e.currentTarget.dataset.trade_id
    wx.navigateTo({
      url: '../walletDetail/walletDetail?trade_id=' + trade_id,
    })
  },
  onReachBottom: function () {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    if (that.data.wallListMore == 1){
      var wallListPage = that.data.wallListPage + 1
      wx.request({
        url: getApp().data.servsers + 'finance/trade',
        method: 'POST',
        data: {
          page: wallListPage,
          token: that.data.token
        },
        success: function (res) {
          wx.hideLoading()
          if (res.data.code == -3) {
            wx.showToast({
              title: 'token过期',
              icon: 'none',
              duration: 1000
            })
            setTimeout(function () {
              wx.redirectTo({
                url: '../../login/login'
              })
            }, 1000)
          } else {
            var addWallList = res.data.data.list
            var wallList = that.data.wallList.concat(addWallList) 
            that.setData({
              wallListPage: wallListPage,
              wallList: wallList,
              wallListMore: res.data.data.more
            })
          }
        }
      })

    } else if (that.data.wallListMore == 0){
      wx.hideLoading()
      wx.showToast({
        title: '到底啦',
        icon: 'success',
        duration: 1000
      })
    }
  }
})