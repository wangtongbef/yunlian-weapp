// pages/scanGoods/scanGoodsdetail/scanGoodsdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    Type:'',
    product_ids:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    wx.request({
      url: getApp().data.servsers + 'code/productList',
      data: {
        token: wx.getStorageSync('tokenRoles').token,
        code_sn: options.code_sn,
        code_type: options.code_type,
        type_id: options.id
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
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
            name: res.data.data.name,
            Type: res.data.data.type,
            product_ids: res.data.data.product_ids
          })
        }
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