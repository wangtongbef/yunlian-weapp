Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSign:true,
    scanfail:true,
    tokenRoles: {},
    scanStatus:0
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
    wx.request({
      url: getApp().data.servsers + 'finance/share',
      data: {
        token: that.data.tokenRoles.token,
        goods_id: 'abc'
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
        that.setData({
          isSign: false
        })
      }
    })
    var scan = function () {
      wx.scanCode({
        onlyFromCamera: false,
        success: (res) => {
          console.log(res)
          wx.request({
            url: getApp().data.servsers + 'finance/share',
            data: {
              token: that.data.tokenRoles.token,
              goods_id: 'abc'
            },
            method: 'POST',
            success: function (res) {
              console.log(res)
              that.setData({
                isSign: false
              })
            },
            fail: function (e) {
              that.setData({
                scanfail: false
              })
            }
          })
        },
        fail: function () {
          that.setData({
            scanfail: false
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
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})