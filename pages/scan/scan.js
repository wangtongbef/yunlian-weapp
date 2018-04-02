Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSign:true,
    scanStatus:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this
    //扫一扫
    var scan = function () {
      wx.scanCode({
        onlyFromCamera: false,
        success: (res) => {
          // wx.showToast({
          //   title: res,
          //   icon: 'none',
          //   duration: 2000
          // })
          console.log(res)
          that.setData({
            isSign: false
          })
          console.log(that.data.isSign)
        },
        fail: function (e) {
        }
      })
    }
    scan()
  },
  finish (){
    wx.reLaunch({
      url: '../index/index'
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