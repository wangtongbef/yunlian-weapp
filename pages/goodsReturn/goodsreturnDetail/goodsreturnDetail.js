// pages/goodsReturn/goodsreturnDetail/goodsreturnDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productsList: [{ name: '酷启动电源', amount: 2000 }, { name: '卡儿酷车充', amount: 1000 }, { name: '卡儿酷军工电源', amount: 5000 }],
    statet: '',
    statecolor:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    that.setData({
      statet: options.statet
    })

    if (options.statet == '待审核' || options.statet == '待取货' || options.statet == '运送中'){
      that.setData({
        statecolor: 'rgb(1,144,210)'
      })
    } else if (options.statet == '已完成' || options.statet == '已取消' || options.statet == '审核不过'){
      that.setData({
        statecolor: 'rgb(88,88,88)'
      })
    }
  },

  endtouchmove: function () {
    return false;
  },

  yes: function () {
    //确认取消入库
  },

  no: function () {
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
