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
    prodectData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this
    //扫一扫
    that.setData({
      tokenRoles: wx.getStorageSync('tokenRoles')
    })
    var scan = function () {
      wx.scanCode({
        onlyFromCamera: false,
        success: (res) => {
          console.log(res.result)
          var productUrl = res.result
          if (productUrl.indexOf("http")>=0){
            wx.request({
              url: getApp().data.servsers + 'finance/share',
              data: {
                token: that.data.tokenRoles.token,
                url: productUrl
              },
              method: 'POST',
              success: function (res) {
                console.log(res)
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
            })
          } else{
            that.setData({
              scanfail: false
            })
          }
        },
        fail: function () {
          wx.navigateBack({
            delta: 1
          })
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