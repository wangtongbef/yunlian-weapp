var API = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: true,
    currentTab: 0,
    chargePstore:[],
    waiting:[],
    waited:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    /*var that = this;
    wx.request({
      url: 'http://dev2.lystrong.cn/api/weapp/v1/shops/getSigningShops/',
      method:'POST',
      data:{
        token:'abc',
        commissioner_id:2
      },
      success:function(res){
        console.log(res)
        var name = res.data.data
        that.setData({
          waiting:name
        })
      }
    })*/
    var that = this
    API.getTosign('', function (res) {
      //这里既可以获取模拟的res
      console.log(res)
      that.setData({
        waiting: res.data
      })
    });
    API.getSigned('', function (res) {
      //这里既可以获取模拟的res
      console.log(res)
      that.setData({
        waited: res.data
      })
    });
  },
  swichNav: function (e) {
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      var showMode = e.target.dataset.current == 0;
      this.setData({
        currentTab: e.target.dataset.current,
        isShow: showMode
      })
    }
  },
  waitingDetail(e){
    //console.log(e);
    var that = this;
    var index = e.currentTarget.dataset.id;
    console.log(index);
    wx.setStorage({
      key: 'store',
      data: that.data.waiting[index],
      success:function(){
        console.log('缓存成功')
      }
    })
    wx.navigateTo({
      url: '../storeDetail/storeDetail?id='+index,
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