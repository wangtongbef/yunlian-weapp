Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: true,
    currentTab: 0,
    chargePstore:[
      { id: 1, name: '分就考虑到', address: '深圳市马尔库和贷款时间' },
      { id: 2, name: '开发了开发了', address: '返回晶方科技' },
      { id: 3, name: '发廊是了多少放声', address: '大家看见的' },
      { id: 4, name: '辅导老师开发的', address: '大口径的斯科拉的' }
    ],
    waiting:[
      {id:1, name: '分就考虑到',address:'深圳市马尔库和贷款时间' },
      { id: 2, name: '开发了开发了', address: '返回晶方科技' },
      { id: 3,name: '发廊是了多少放声', address: '大家看见的' },
      { id: 4,name: '辅导老师开发的', address: '大口径的斯科拉的' }
    ],
    waited:[
      /*{name:'分就考虑到就开始了接口都是'},
      { name: '开发了开发了' },
      { name: '发廊是了多少放声大哭莲富大厦' },
      { name: '辅导老师开发的啦上课' },*/
    ]
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