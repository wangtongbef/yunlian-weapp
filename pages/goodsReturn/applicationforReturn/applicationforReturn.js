// pages/goodsReturn/applicationforReturn/applicationforReturn.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productsList: [{ name: '酷启动电源', amount: 2000 }, { name: '卡儿酷车充', amount: 1000 }, { name: '卡儿酷军工电源', amount: 5000 }],
    imgList: [],
    productType: 2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  chooseProducttype:function(e){
    var type = e.currentTarget.dataset.type
    if (this.data.productType == type){
      this.setData({
        productType: 0
      }) 
    }else{
      this.setData({
        productType: e.currentTarget.dataset.type
      })
    }
  },

  addImage:function (){
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFiles = res.tempFiles
        var list = that.data.imgList
        list.push(tempFiles[0].path)
        that.setData({
          imgList: list
        }) 
        console.log(that.data.imgList)
      }
    })
  },

  delImage:function(e){
    var that = this
    var list = that.data.imgList
    list.splice(e.currentTarget.dataset.index, 1)
    that.setData({
      imgList: list
    })
  },

  submit: function(){
    console.log('submit')
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