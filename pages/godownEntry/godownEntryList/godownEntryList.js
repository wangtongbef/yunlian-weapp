// pages/godownEntry/godownEntryList/godownEntryList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    states: [{ stateId: 0, state: '全部状态' }, { stateId: 1, state: '待确认' }, { stateId: 2, state: '已入库' }, { stateId: 3, state:'已取消'}],
    list: [{
      "id": 1,
      "status": 0,
      "update_time": "2018-06-29 11:13:38"
    },
    {
      "id": 2,
      "status": 1,
      "update_time": "2018-06-29 11:14:36"
    },],
    stateChecked: 0,
    stateBoxstate: false,
    role:'',
    token:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var tokenRoles = wx.getStorageSync('tokenRoles')
    var role = wx.getStorageSync('role')
    that.setData({
      token: tokenRoles.token,
      role: role.role_name
    })
    console.log(that.data.role)

    wx.request({
      url: getApp().data.servsers + 'storage/storageList',
      data: {
        token: that.data.token,
        status:0
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
        // that.setData({
        //   list: res.data.data
        // })
      }
    })
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

  toDetail: function(e){
    console.log(e.currentTarget.dataset.numbers)
    wx.navigateTo({
      url: '../../godownEntry/godownentryDetail/godownentryDetail?id=' + this.data.id
    })
  },

  inStorage: function(){
    console.log('扫一扫')
    wx.navigateTo({
      url: '../../godownEntry/inStorage/inStorage'   //扫码页面
    })
  },

  endtouchmove: function () {
    return false;
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