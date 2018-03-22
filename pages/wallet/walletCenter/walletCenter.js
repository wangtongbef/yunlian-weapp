// pages/wallet/takeCash/takeCash.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance: '',
    nearby: [
      { time: '2018-03-09 10:12:20', type: '销售收入', money: '200' },
      { time: '2018-02-18 19:54:09', type: '提现', money: '15' },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://dev2.lystrong.cn/api/weapp/v1/finance/index',
      method: 'POST',
      data: {
        token: 'abc123'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          balance: res.data.data.amount
        })
      }
    })
    wx.request({
      url: 'http://dev2.lystrong.cn/api/weapp/v1/finance/trade',
      method: 'POST',
      data: {
        page: 1,
        token: 'abc123'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          nearby: res.data.data.list
        })
        console.log(that.data.nearby)
      }
    })
  },
  linkList(){
    wx.navigateTo({
      url: '../walletList/walletList',
    })
  },
  linkBtn(){
    wx.navigateTo({
      url: '../takeCash/takeCash',
    })
  },
  linkDetail(){
    wx.navigateTo({
      url: '../walletDetail/walletDetail',
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