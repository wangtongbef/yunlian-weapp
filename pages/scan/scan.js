Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSign:true,
    scanfail:true,
    tokenRoles: {},
    scanStatus:0,
    scanmsg:'',
    prodectData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this
    //扫一扫
    that.setData({
      tokenRoles: wx.getStorageSync('tokenRoles')
    })
    var scan = function () {
      wx.scanCode({
        onlyFromCamera: false,
        success: (res) => {
          console.log(res.result)
          var productUrl = res.result
          if (productUrl.indexOf("http")>=0){
            wx.request({
              url: getApp().data.servsers + 'finance/share',
              data: {
                token: that.data.tokenRoles.token,
                goods_id: productUrl+'/'
              },
              method: 'POST',
              success: function (res) {
                console.log(res)
                that.setData({
                  isSign: false,
                  scanStatus: res.data.code,
                  scanmsg: res.data.msg,
                  prodectData: res.data.data
                })
              }
            })
          } else{
            that.setData({
              scanfail: false
            })
          }
        },
        fail: function () {
          wx.navigateBack({
            delta: 1
          })
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