// pages/saleForm/saleForm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    isCommissioner: false,
    storeArray: ['全部门店'],
    saleArray:[],
    timeArray:['今天','本周','本月','本年'],
    productAlltimedata:{},
    productInfo: [],
    isShow: true,
    storeIndex:0,
    saleIndex: 0,
    timeIndex: 0,
  },
  bindStoreChange: function (e) {
    console.log('门店选的是', this.data.storeArray[e.detail.value])
    if (e.detail.value !== 0) {
      this.setData({
        isShow:false
      })
    }else{
      this.setData({
        isShow: true
      })
    }
    this.setData({
      storeIndex: e.detail.value
    })

  },
  bindSaleChange: function (e) {
    console.log('销售员选的是', this.data.saleArray[e.detail.value])
    this.setData({
      saleIndex: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      timeIndex: e.detail.value
    })
    console.log('time选的是', this.data.timeIndex)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this
    var tokenRoles = wx.getStorageSync('tokenRoles')
    var role = wx.getStorageSync('role')
    that.setData({
      token: tokenRoles.token
    })
    if (role.role_name === '商务专员'){
      that.setData({
        isCommissioner: true
      })
      wx.request({
        url: getApp().data.servsers + 'statistics/salesForCommissioner',
        data: {
          shop_id: 0,
          token: that.data.token
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
          that.setData({
            productAlltimedata: res.data.data,
            productInfo: res.data.data.today
          })
          console.log(that.data.productAlltimedata)
        }
      })
    } else if (role.role_name === '门店负责人'){

    }
  },
  search(){
    var that = this
    if (that.data.timeIndex == 0){
      that.setData({
        productInfo: that.data.productAlltimedata.today
      })
    } else if (that.data.timeIndex == 1) {
      that.setData({
        productInfo: that.data.productAlltimedata.week
      })
    } else if (that.data.timeIndex == 2) {
      that.setData({
        productInfo: that.data.productAlltimedata.month
      })
    } else if (that.data.timeIndex == 3) {
      that.setData({
        productInfo: that.data.productAlltimedata.year
      })
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