// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //user:{},
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
      // user: wx.getStorageSync('user'),
      roleName: role.role_name
    })
    wx.request({
      url: getApp().data.servsers + 'user/profile',
      data: {
        token: wx.getStorageSync('tokenRoles').token
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          phonenumber: res.data.data.phone_number
        })
      }
    })
  }
})