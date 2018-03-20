var getLocation = require('../../../utils/getLocation.js');
// pages/storeDetail/storeDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      store:{},
      saleList:[
        { name:'刘小池',phoneNum:'15678938978'},
        { name: '张军好', phoneNum: '18025376979' },
        { name: '陈芳名', phoneNum: '18073769080' },
        { name: '陈国良', phoneNum: '15675687675' },
      ],
      businessList:[
        { name: '赵文卓', phoneNum: '15678938978' },
        { name: '张三丰', phoneNum: '18376734037' },
        { name: '周笔畅', phoneNum: '15578931078' },
      ],
      chargePersonList:[
        { name: '陈1真', id:0, phoneNum: '15678938978' },
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getLocation();
    var that = this;
    wx.getStorage({
      key: 'store',
      success: function(res) {
        console.log(res.data)
        that.setData({
          store:res.data
        })
      },
    })
    /*console.log(options);
    wx.request({
      url: 'http://dev2.lystrong.cn/api/weapp/v1/shops/getShop/',
      method:'POST',
      success:function(res){
        console.log(res)
      }
    })*/
  },
  linkMap(){
    wx.navigateTo({
      //跳转到地图页面
      //url: ''
    })
  },
  salePhoneBtn(e){
    //console.log(e.currentTarget.id);
    var id = e.currentTarget.id;
    wx.makePhoneCall({
      phoneNumber: this.data.saleList[id].phoneNum
    })
  },
  businessPhoneBtn(e){
    var id = e.currentTarget.id;
    wx.makePhoneCall({
      phoneNumber: this.data.businessList[id].phoneNum
    })
  },
  //跳转到添加用户手机页面
  addPerson(){
    wx.navigateTo({
      url: '../addPerson/addPerson',
      success:function(){
        console.log('成功了')
      }
    })
  },
  //更改用户，跳转到添加用户手机页面
  changePerson(){
    wx.navigateTo({
      url: '../addPerson/addPerson',
    })
  },
  //动态生成标题
  /*titleName(){
    wx.setNavigationBarTitle({
      title: '添加门店负责人',
    })
  }*/
  delete(e){
    //var id = e.currentTarget.id;
    var id = e.dataset.id
    console.log(id)
    var that = this;
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