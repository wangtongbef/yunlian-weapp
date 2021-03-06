// pages/wallet/walletDetail/walletDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    walletDetail:{}
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
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: getApp().data.servsers + 'finance/detail',
      method: 'POST',
      data: {
        trade_id: options.trade_id,
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
          if(res.data.code==0){
            that.setData({
              walletDetail: res.data.data
            })
          }else{
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 1000
            })
            setTimeout(function (){
              wx.navigateBack({
                delta: 1
              })
            },1000)
          }
        }
      }
    })
  }
})