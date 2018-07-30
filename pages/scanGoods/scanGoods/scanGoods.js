// pages/scanGoods/scanGoods/scanGoods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    err: false,
    code_sn: '',
    code_type:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.scanCode({
      onlyFromCamera: false,
      success: (res) => {
        if (res.result.indexOf("code_type") >= 0 && res.result.indexOf("code_sn") >= 0) {
          var detail = res.result.split("?")[1].split("&")
          that.setData({
            code_sn: detail[0].split("=")[1],
            code_type: detail[1].split("=")[1]
          })
          wx.request({
            url: getApp().data.servsers + 'code/getProduct',
            data: {
              token: wx.getStorageSync('tokenRoles').token,
              code_sn: that.data.code_sn,
              code_type: that.data.code_type
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
                    url: '../../login/login'
                  })
                }, 1000)
              } else {
                if (res.statusCode == 200) {
                  that.setData({
                    list:res.data.data
                  })
                } else {
                  wx.showToast({
                    title: '扫码失败',
                    icon: 'none',
                    duration: 1000
                  })
                  setTimeout(function () {
                    wx.navigateBack({
                      delta: 1
                    })
                  }, 1000)
                }
              }
            }
          })
        } else {
          wx.hideLoading()
          that.setData({
            err: true
          })
        }
      },
      fail: function () {
        wx.hideLoading()
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  todetail: function (e){
    var that = this
    wx.navigateTo({
      url: '../scanGoodsdetail/scanGoodsdetail?code_sn=' + that.data.code_sn + '&code_type=' + that.data.code_sn + '&id=' + e.currentTarget.dataset.id,
    })
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