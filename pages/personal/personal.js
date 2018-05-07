// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{},
    phonenumber:'',
    roleName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var role = wx.getStorageSync('role')
    var that = this
    that.setData({
      user: wx.getStorageSync('user'),
      roleName: role.role_name
    })
    wx.request({
      url: getApp().data.servsers + 'user/profile',
      data: {
        token: wx.getStorageSync('tokenRoles').token
      },
      method: 'POST',
      success: function (res) {
        if (res.code == -3) {
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
            phonenumber: res.data.data.phone_number
          })
        }
      }
    })
  }
})