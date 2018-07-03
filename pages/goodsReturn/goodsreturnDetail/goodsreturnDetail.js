// pages/goodsReturn/goodsreturnDetail/goodsreturnDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productsList: [{ name: '酷启动电源', amount: 2000 }, { name: '卡儿酷车充', amount: 1000 }, { name: '卡儿酷军工电源', amount: 5000 }],
    statet: '',
    statecolor:'',
    state:0,
    role:'',
    sendtype:'物流配送',
    receiveorsend:'退货'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    that.setData({
      statet: options.statet,
      role: options.role
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

    if (that.data.statet == '待取货'){
      if (that.data.role == '配送员'){
        that.setData({
          state: 1
        })
      } else if (that.data.role == '门店负责人' || that.data.role == '门店销售员' || (that.data.role == '仓管员' && that.data.receiveorsend == '退货')){
        if (that.data.sendtype == '物流配送'){
          that.setData({
            state: 3
          })
        } else if (that.data.sendtype == '配送员配送'){
          that.setData({
            state: 2
          })
        } 
      }
    } else if (that.data.statet == '运送中'){
      if ((that.data.role == '仓管员' && that.data.receiveorsend == '收货') || that.data.role == '生产经理') {
        that.setData({
          state: 1
        })
      } else if (that.data.role == '配送员'){
        that.setData({
          state: 2
        })
      } else if (that.data.role == '门店负责人' || that.data.role == '门店销售员' || (that.data.role == '仓管员' && that.data.receiveorsend == '退货')){
        if (that.data.sendtype == '物流配送') {
          that.setData({
            state: 2
          })
        }
      }
    }else{
      that.setData({
        state: 0
      })
    }
  },

  receive: function(){
    var that = this
    if (that.data.statet == '待取货' && that.data.role == '配送员'){
      console.log('配送员 待取货 确认收货')
    } else if (that.data.statet == '运送中' && that.data.role == '仓管员' && that.data.receiveorsend == '收货'){
      console.log('仓管员 收货 运送中 确认收货')
    } else if (that.data.statet == '运送中' && that.data.role == '生产经理'){
      console.log('生产经理 运送中 确认收货')
    }
  },

  clear: function(){
    var that = this
    if (that.data.statet == '待取货' && that.data.role == '门店负责人') {
      console.log('门店负责人 待取货 取消')
    } else if (that.data.statet == '待取货' && that.data.role == '门店销售员') {
      console.log('门店销售员 待取货 取消')
    } else if (that.data.statet == '待取货' && that.data.role == '仓管员' && that.data.receiveorsend == '退货') {
      console.log('仓管员 待取货 退货 取消')
    } else if (that.data.statet == '运送中' && that.data.role == '配送员'){
      console.log('配送员 运送中 取消')
    } if (that.data.statet == '运送中' && that.data.role == '门店负责人') {
      console.log('门店负责人 运送中 取消')
    } else if (that.data.statet == '运送中' && that.data.role == '门店销售员') {
      console.log('门店销售员 运送中 取消')
    } else if (that.data.statet == '运送中' && that.data.role == '仓管员' && that.data.receiveorsend == '退货') {
      console.log('仓管员 运送中 退货 取消')
    }
  },
  
  send: function(){
    var that = this
    if (that.data.statet == '待取货' && that.data.role == '门店负责人') {
      console.log('门店负责人 待取货 发货')
    } else if (that.data.statet == '待取货' && that.data.role == '门店销售员') {
      console.log('门店销售员 待取货 发货')
    } else if (that.data.statet == '待取货' && that.data.role == '仓管员' && that.data.receiveorsend == '退货') {
      console.log('仓管员 待取货 退货 发货')
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
