// pages/scanGoods/scanGoodsdetail/scanGoodsdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    Type:'',
    product_ids:[],
    options:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    that.setData({
      options: options
    })
    wx.showLoading({
      title: '加载中',
    })
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
          that.setData({
            name: res.data.data.name,
            Type: res.data.data.type,
            product_ids: res.data.data.product_ids
          })
        }
      }
    })
  }
})