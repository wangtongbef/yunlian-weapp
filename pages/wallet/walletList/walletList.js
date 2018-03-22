// pages/wallet/walletDetail/walletDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wallList:[
      {type:'收入',time:'2018-01-30  13:45:59',money:'900'},
      { type: '提现', time: '2018-01-19  08:16:36', money: '80' },
      { type: '收入', time: '2018-01-10  15:24:03', money: '200' },
      { type: '提现', time: '2017-12-19  16:20:09', money: '450' },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
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
          wallList: res.data.data.list
        })
        // var wallList = that.data.wallList
        // for (var i = 0; i < wallList.length;i++){
        //   if (item.type === 1){
        //     wallList[i].amountStatus = true
        //   } else if (item.type === 2){
        //     wallList[i].amountStatus = false
        //   }
        // }
        console.log(that.data.wallList)
      }
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