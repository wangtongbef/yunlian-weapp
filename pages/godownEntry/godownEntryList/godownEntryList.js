// pages/godownEntry/godownEntryList/godownEntryList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    states: [{ stateId: 0, state: '全部状态' }, { stateId: 1, state: '待确认' }, { stateId: 2, state: '已入库' }, { stateId: 3, state:'已取消'}],
    list: [{ numbers: 'ps1122233', time: "2018-06-07  16:16", state: 1 },
     { numbers: 'ps1122233', time: "2018-06-07  16:16", state: 2 },
     { numbers: 'ps1122233', time: "2018-06-07  16:16", state: 3 }],
    stateChecked: 0,
    stateBoxstate: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
  },

  stateBoxhide: function (e) {
    console.log('stateBoxhide');
    var that = this;
    that.setData({
      stateBoxstate: !that.data.stateBoxstate
    })
  },

  stateCheck: function (e) {
    var that = this
    that.setData({
      stateChecked: e.currentTarget.dataset.stateid
    })
    setTimeout(function(){that.setData({
      stateBoxstate: !that.data.stateBoxstate
    })},10)
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