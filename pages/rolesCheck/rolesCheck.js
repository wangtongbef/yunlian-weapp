var getUser = require('../../utils/getUser.js');
Page({
  data: {
    roles:[],
    token:''
  },
  onLoad: function () {
    getUser();
    var that = this
    var tokenRoles = wx.getStorageSync('tokenRoles')
    if (tokenRoles) {
      that.setData({
        roles: tokenRoles.roles,
        token: tokenRoles.token
      })
    }
  },
  rolesCheck:function (event){
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    wx.setStorageSync('role', event.currentTarget.dataset.rolecheck)
    wx.request({
      url: getApp().data.servsers + 'login/role',
      data: {
        role_id: event.currentTarget.dataset.rolecheck.role_id,
        token: that.data.token
      },
      method: 'POST',
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
              url: '../login/login'
            })
          }, 1000)
        }else{
          wx.setStorageSync('auth', res.data.data.auth)
          if (res.data.code == 0) {
            wx.redirectTo({
              url: '../index/index'
            })
          } else if (res.data.code == 1) {
            wx.showToast({
              title: '设定角色失败',
              icon: 'none',
              duration: 2000
            })
          } 
        }
      }
    })
  }
})