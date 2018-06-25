// pages/Inventory/inventoryList/inventoryList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    downloaded:false,
    token:'',
    storeList:[],
    expressList: [{ name: "顺丰", numbers: "123456789" }, { name: "韵达", numbers: "145263987" }],
    //expressList: [],
    currentTab:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      token: wx.getStorageSync('tokenRoles').token
    })
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: getApp().data.servsers + 'shop/signingShopsForChargePerson', //获取门店列表
      data: {
        token: that.data.token
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
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
            storeList: res.data.data,
            downloaded:true
          })
        }
      }
    })
  },

  swichNav: function (e){
    var that = this
    if (that.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  navigat: function(e){
    var that = this;
    var storeId = that.data.storeList[e.target.dataset.index].id
    var storeName = that.data.storeList[e.target.dataset.index].name
    wx.navigateTo({
      url: '../inventoryStoreDetail/inventoryStoreDetail?id=' + storeId + '&name=' + storeName
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