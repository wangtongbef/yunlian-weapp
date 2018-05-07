// pages/signForm/signForm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    signList: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var tokenRoles = wx.getStorageSync('tokenRoles')
    that.setData({
      token: tokenRoles.token
    })
    wx.request({
      url: getApp().data.servsers + 'statistics/signForCommissioner',
      data: {
        token: that.data.token
      },
      method: 'POST',
      success: function (res) {
        wx.hideLoading()
        if (res.data.code == -3) {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 1000
          })
          setTimeout(function () {
            wx.redirectTo({
              url: '../login/login'
            })
          }, 1000)
        } else {
          that.setData({
            signList: res.data.data
          })
        }
      }
    })
  }
})