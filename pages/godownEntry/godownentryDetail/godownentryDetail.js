// pages/godownEntry/godownentryDetail/godownentryDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productsList: [{ name: '酷启动电源', amount: 2000 }, { name: '卡儿酷车充', amount: 1000 }, { name: '卡儿酷军工电源', amount: 5000 }],
    state:0,
    role:'',
    maskshow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    that.setData({
      state: options.state,
      role: options.role
    })
  },

  godownentryButton: function(){
    var that = this
    if (that.data.role == '仓管员'){
      that.setData({
        maskshow: true
      })
    } else if (that.data.role == '配送员'){
      //确认入库
    }
  },

  endtouchmove: function (){
    return false;
  },

  yes:function(){
    //确认取消入库
  },

  no:function(){
    var that = this
    that.setData({
      maskshow: false
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
