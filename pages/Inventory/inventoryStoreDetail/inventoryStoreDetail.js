// pages/Inventory/inventoryStoreDetail/inventoryStoreDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storetitle: {},
    currentTab:0,
    nomalProducts: [{ name: '卡儿酷启动电源', amount: 2000 }, { name: '卡儿酷车充', amount: 1000 }, {name: '卡儿酷军工电源', amount: 5000 }],
    // faultyProducts: [{ name: '卡儿酷启动电', amount: 20 }, { name: '卡儿酷车', amount: 10 }, { name: '卡儿酷军工', amount: 500 }],
    //nomalProducts: [],
    faultyProducts: [],
    products: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      storetitle: options,
      products: that.data.nomalProducts
    })
  },

  swichNav: function (e) {
    var that = this
    if (that.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
      if (e.target.dataset.current == 0){
        that.setData({
          products: that.data.nomalProducts
        })
      } else if (e.target.dataset.current == 1) {
        that.setData({
          products: that.data.faultyProducts
        })
      }
    }
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