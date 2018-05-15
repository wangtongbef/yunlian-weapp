Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSign:true,
    scanfail:true,
    tokenRoles: {},
    scanStatus:0,
    scanmsg:'',
    storeDetailstorge:{},
    prodectData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this
    //扫一扫
    that.setData({
      tokenRoles: wx.getStorageSync('tokenRoles'),
      storeDetailstorge: wx.getStorageSync('storeDetail')
    })
    var scan = function () {
      wx.scanCode({
        onlyFromCamera: false,
        success: (res) => {
          var productUrl = res.result
          if (productUrl.indexOf("http")>=0){
            wx.request({
              url: getApp().data.servsers + 'finance/share',
              data: {
                shop_id: that.data.storeDetailstorge.id,
                token: that.data.tokenRoles.token,
                url: productUrl
              },
              method: 'POST',
              success: function (res) {
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
                } else {
                  if (res.statusCode==200){
                    that.setData({
                      isSign: false,
                      scanStatus: res.data.code,
                      scanmsg: res.data.msg,
                      prodectData: res.data.data
                    })
                  } else {
                    wx.showToast({
                      title: '扫码失败',
                      icon: 'none',
                      duration: 1000
                    })
                    setTimeout(function() {
                      wx.navigateBack({
                        delta: 1
                      })
                    },1000)
                  }
                }
              }
            })
          } else{
            that.setData({
              scanfail: false
            })
          }
        },
        fail: function () {
          wx.showToast({
            title: '扫码失败',
            icon: 'none',
            duration: 1000
          })
          setTimeout(function () {
            wx.redirectTo({
              url: '../index/index'
            })
          }, 1000)
        }
      })
    }
    scan()
  },
  finish (){
    wx.reLaunch({
      url: '../index/index'
    })
  }
})