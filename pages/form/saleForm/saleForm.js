// pages/saleForm/saleForm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeArray: ['全部门店','天虹虎妈照相机店', 'dsajdkajkdajfodfkld', '深圳市美康百货', '减肥'],
    saleArray:['全部销售员','张三','李四','赵武','李柳'],
    timeArray:['今天','本周','本月','本年'],
    productInfo: [{ name: '卡儿酷软件汽车启动电源', num: 2 }, { name: '卡儿酷手机充电宝', num: 6 }],
    isShow: true,
    storeIndex:0,
    saleIndex: 0,
    timeIndex: 0,
  },
  bindStoreChange: function (e) {
    console.log('乔丹选的是', this.data.storeArray[e.detail.value])
    if (e.detail.value !== 0) {
      this.setData({
        isShow:false
      })
    }else{
      this.setData({
        isShow: true
      })
    }
    /*if (e.detail.value == 4) {
      this.setData({ reply: true })
    } else {
      this.setData({ reply: false })
    }*/
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
    console.log('销售员选的是', this.data.timeArray[e.detail.value])
    this.setData({
      timeIndex: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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