// pages/store/changeStoreName/storeList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeName:'',
    token: '',
    id:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var tokenRoles = wx.getStorageSync('tokenRoles')
    var storeId = wx.getStorageSync('storeDetail')
    that.setData({
      token: tokenRoles.token,
      id: storeId.id
    })
  },
  nameVal(e){
    console.log(e.detail.value)
    this.setData({
      storeName: e.detail.value,
    })
  },
  changeNameSubmit(){
    if (this.data.storeName.length == 0){
      wx.showToast({
        title: '门店名称不能为空',
        icon: 'none',
        duration: 2000
      })
    } else if (this.data.storeName.length == 1) {
      wx.showToast({
        title: '门店名称不能少于2位',
        icon: 'none',
        duration: 2000
      })
    } else if (this.data.storeName.length > 1){
      wx.request({
        url: getApp().data.servsers + 'shop/updateShopName', 
        data: {
          id: this.data.id,
          name: this.data.storeName,
          token: this.data.token
        },
        method: 'POST',
        success: function (res) {
          console.log(res.data)
          if (res.data.code == 0){
            wx.navigateBack({
              delta: 1
            })
          } else if (res.data.code == 1){
            wx.showToast({
              title: '门店名称修改失败',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    }
    // wx.request({
    //   url: getApp().data.servsers + 'shop/updateShopName', 
    //   data: {
    //     x: '',
    //     y: ''
    //   },
    //   method: 'POST',
    //   success: function (res) {
    //     console.log(res.data)
    //   }
    // })
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