// pages/goodsReturn/returnStorecheck/returnStorecheck.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:'',
    chargePstore: [],
    checkedIndex: 999
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var tokenRoles = wx.getStorageSync('tokenRoles')
    that.setData({
      token: tokenRoles.token
    })
    wx.request({
      url: getApp().data.servsers + 'shop/signingShopsForChargePerson', //获取门店列表
      data: {
        token: that.data.token
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
              url: '../../login/login'
            })
          }, 1000)
        } else {
          that.setData({
            chargePstore: res.data.data
          })
          if (that.data.chargePstore.length == 1) {
            wx.setStorage({
              key: 'storeDetail',
              data: that.data.chargePstore[0],
              success: function () {
                wx.redirectTo({
                  url: '../../goodsReturn/reeturnConfirm/reeturnConfirm'
                })
              }
            })
          }
        }
      }
    })
  },

  checkStore(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    that.setData({
      checkedIndex: index
    })
    wx.setStorage({
      key: 'storeDetail',
      data: that.data.chargePstore[index],
      success: function () {
        setTimeout(function () {
          wx.redirectTo({
            url: '../../goodsReturn/reeturnConfirm/reeturnConfirm',
          })
        }, 500)
      }
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