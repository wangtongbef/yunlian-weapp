var getUser = require('../../utils/getUser.js');
Page({
  data: {
    roles:[],
    token:''
  },
  onLoad: function () {
    var that = this
    var tokenRoles = wx.getStorageSync('tokenRoles')
    console.log(tokenRoles)
    if (tokenRoles) {
      that.setData({
        roles: tokenRoles.roles,
        token: tokenRoles.token
      })
    }
  },
  onShow: function () {
    //getUser();
  },
  rolesCheck:function (event){
    var that = this
    console.log(event.currentTarget.dataset.rolecheck);
    wx.setStorageSync('role', event.currentTarget.dataset.rolecheck)
    wx.request({
      url: getApp().data.servsers + 'login/role',
      data: {
        role_id: event.currentTarget.dataset.rolecheck.role_id,
        token: that.data.token
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
        wx.setStorageSync('auth', res.data.data.auth)
      }
    })
    wx.redirectTo({
      url: '../index/index'
    })
  }
})