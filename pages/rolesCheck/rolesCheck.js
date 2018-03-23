Page({
  data: {
    roles:[]
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: getApp().data.servsers + 'login/role',
      method: 'POST',
      data: {
        token: options.token
      },
      success: function (res) {
        console.log(res.data.data.roles)
        if (res.data.data.role){
          console.log("跳转")
        }else {
          that.setData({
            roles: res.data.data.roles
          })
        }
      }
    })
  }
})