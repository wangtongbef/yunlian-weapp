Page({
  data: {
    roles:[]
  },
  onLoad: function () {
    var that = this
    var tokenRoles = wx.getStorageSync('tokenRoles')
    console.log(tokenRoles)
    if (tokenRoles) {
      that.setData({
        roles: tokenRoles.roles
      })
    }
  },
  rolesCheck:function (event){
    console.log(event.currentTarget.dataset.rolecheck);
    wx.setStorageSync('role', event.currentTarget.dataset.rolecheck)
    wx.redirectTo({
      url: '../index/index'
    })
  }
})