var getLocation = require('../../../utils/getLocation.js');
// pages/storeDetail/storeDetail.js
var API = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCommissioner: true,
    store:{},
    saleList:[
      // { name:'刘小池',phoneNum:'15678938978'},
    ],
    businessList:[
      { name: '赵文卓', phoneNum: '15678938978' },
    ],
    chargePersonList:[
      { name: '陈1真', id:0, phoneNum: '15678938978' },
    ],
    storeDetailstorge:{},
    storeDetailres:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getLocation();
    var that = this;
    var tokenRoles = wx.getStorageSync('tokenRoles')
    that.setData({
      role: wx.getStorageSync('role'),
      token: tokenRoles.token,
      storeDetailstorge: wx.getStorageSync('storeDetail'),
    })
    if (that.data.role.role_name == '商务专员') {
      console.log(that.data.role)
      that.setData({
        isCommissioner: true
      })
      wx.request({
        url: getApp().data.servsers + 'shop/shopInfoForCommissioner', //获取门店详情
        data: {
          token: that.data.token,
          id: that.data.storeDetailstorge.id
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
          that.setData({
            storeDetailres: res.data.data,
            chargePersonList: res.data.data.charge_person,
            businessList: res.data.data.sales
          })
          console.log(that.data.storeDetailres)
        }
      })
    } else if (that.data.role.role_name == '门店负责人') {
      that.setData({
        isCommissioner: false
      })
      wx.request({
        url: getApp().data.servsers + 'shop/shopInfoForChargePerson', //获取门店详情
        data: {
          token: that.data.token,
          id: that.data.storeDetailstorge.id
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
          that.setData({
            storeDetailres: res.data.data,
            chargePersonList: res.data.data.charge_person,
            businessList: res.data.data.sales
          })
          console.log(that.data.storeDetailres)
        }
      })
    }
    // wx.getStorage({
    //   key: 'store',
    //   success: function(res) {
    //     console.log(res.data)
    //     that.setData({
    //       store:res.data
    //     })
    //   },
    // })
    /*console.log(options);
    wx.request({
      url: 'http://dev2.lystrong.cn/api/weapp/v1/shops/getShop/',
      method:'POST',
      success:function(res){
        console.log(res)
      }
    })*/
    // API.getStoredetail('', function (res) {
    //   //这里既可以获取模拟的res
    //   console.log(res)
    //   that.setData({
    //     storeDetail: res.data
    //   })
    // });
  },
  storeNameChange(){
    wx.navigateTo({
      url: '../changeStoreName/changeStoreName'
    })
  },
  linkMap(){
    console.log("map")
    // wx.navigateTo({
      //跳转到地图页面
      //url: ''
    // })
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res)
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
      }
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
    var that = this
    wx.request({
      url: getApp().data.servsers + 'shop/shopInfoForCommissioner', //获取门店详情
      data: {
        token: that.data.token,
        id: that.data.storeDetailstorge.id
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
        that.setData({
          storeDetailres: res.data.data,
          chargePersonList: res.data.data.charge_person,
          businessList: res.data.data.sales
        })
        console.log(that.data.storeDetailres)
      }
    })
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