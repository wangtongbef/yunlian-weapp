Page({
  data: {
    roles:[]
  },
  onLoad: function (options) {
    var that = this
    var tokenRoles = wx.getStorageSync('tokenRoles')
    if (tokenRoles) {
      that.setData({
        roles: tokenRoles.roles
      })
    }
  },
  rolesCheck:function (event){
    console.log(event.currentTarget.dataset.rolecheck);
    wx.setStorageSync('role', event.currentTarget.dataset.rolecheck)
    wx.navigateTo({
      url: '../index/index'
    })
  }
})