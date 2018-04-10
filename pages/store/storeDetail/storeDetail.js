var getLocation = require('../../../utils/getLocation.js');
// pages/storeDetail/storeDetail.js
var API = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstIn:true,
    changeAddress:false,
    newAddress:'',
    isCommissioner: true,
    role:{},
    token:'',
    businessList:[],
    chargePerson:{},
    commissioner:{},
    storeDetailstorge:{},
    storeDetailres:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
            chargePerson: res.data.data.charge_person,
            businessList: res.data.data.sales
          })
          console.log(that.data.storeDetailres)
          console.log(that.data.businessList)
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
            commissioner: res.data.data.commissioner,
            businessList: res.data.data.sales
          })
          console.log(that.data.storeDetailres)
        }
      })
    }
  },
  storeNameChange(){
    wx.navigateTo({
      url: '../changeStoreName/changeStoreName'
    })
  },
  linkMap(){
    var that = this
    getLocation();
    if (that.data.role.role_name == '商务专员') {
      wx.chooseLocation({
        success: function (res) {
          console.log(res)
          that.setData({
            newAddress: res.name
          })
          wx.request({
            url: getApp().data.servsers + 'shop/updateShopLocation', //更新门店地址
            data: {
              id: that.data.storeDetailstorge.id,
              token: that.data.token,
              address: res.name,
              longitude: res.longitude,
              latitude: res.latitude
            },
            method: 'POST',
            success: function (res) {
              console.log(res)
              if(res.data.code == 0){
                that.setData({
                  changeAddress: true
                })
              }
            }
          })
        }
      })
    } else if (that.data.role.role_name == '门店负责人') {
      console.log(that.data.storeDetailres)
      wx.openLocation({
        latitude: parseFloat(that.data.storeDetailres.shop.latitude),
        longitude: parseFloat(that.data.storeDetailres.shop.longitude),
        name: that.data.storeDetailres.shop.address,
        scale: 28
      })
    }
  },
  // salePhoneBtn(e){
  //   //console.log(e.currentTarget.id);
  //   var id = e.currentTarget.id;
  //   wx.makePhoneCall({
  //     phoneNumber: this.data.saleList[id].phoneNum
  //   })
  // },
  // businessPhoneBtn(e){
  //   var id = e.currentTarget.id;
  //   wx.makePhoneCall({
  //     phoneNumber: this.data.businessList[id].phoneNum
  //   })
  // },
  //跳转到添加用户手机页面
  addChargeperson(){
    wx.navigateTo({
      url: '../addPerson/addPerson?title=添加门店负责人',
      success:function(){
        console.log('成功了')
      }
    })
  },
  addSales() {
    wx.navigateTo({
      url: '../addPerson/addPerson?title=添加门店销售员',
      success: function () {
        console.log('成功了')
      }
    })
  },
  //更改用户，跳转到添加用户手机页面
  changePerson(){
    var that=this
    var chargePersonData = {
      token: that.data.token,
      id: that.data.storeDetailres.shop.id,
      charge_person_id: that.data.chargePerson.id
    }
    wx.setStorageSync('chargePersonData', chargePersonData)
    wx.navigateTo({
      url: '../addPerson/addPerson?title=更换门店负责人',
    })
  },
  deleteBusiness(e){
    var that = this
    var index = e.currentTarget.dataset.index
    console.log(e)
    wx.request({
      url: getApp().data.servsers + 'shop/deleteShopSalesPerson',
      data: {
        token: that.data.token,
        id: that.data.storeDetailres.shop.id,
        sales_person_id: that.data.businessList[index].id
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
        if (res.data.code == 0) {
          wx.request({
            url: getApp().data.servsers + 'shop/shopInfoForCommissioner', //获取门店详情
            data: {
              token: that.data.token,
              id: that.data.storeDetailres.shop.id
            },
            method: 'POST',
            success: function (res) {
              console.log(res)
              that.setData({
                businessList: res.data.data.sales
              })
            }
          })
          wx.showToast({
            title: '删除成功',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  giveUpstore(){
    var that = this
    var storeDetail = that.data.storeDetailstorge
    if (storeDetail.status == '待签约') {
      wx.request({
        url: getApp().data.servsers + 'shop/forgoShop',
        data: {
          token: that.data.token,
          id: storeDetail.id,
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
          if (res.data.code == 0) {
            wx.showToast({
              title: '放弃签约成功',
              icon: 'none',
              duration: 1000
            })
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 1000)
          }
        }
      })
    } else if (storeDetail.status == '已签约') {
      wx.request({
        url: getApp().data.servsers + 'shop/escapeShop',
        data: {
          token: that.data.token,
          id: storeDetail.id,
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
          if (res.data.code == 0) {
            wx.showToast({
              title: '解约成功',
              icon: 'none',
              duration: 1000
            })
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 1000)
          }
        }
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
    var that = this
    var token = that.data.token
    if (!that.data.firstIn && that.data.role.role_name == '商务专员'){
      setTimeout(
        function () {
          wx.request({
            url: getApp().data.servsers + 'shop/shopInfoForCommissioner', //获取门店详情
            data: {
              token: token,
              id: that.data.storeDetailstorge.id
            },
            method: 'POST',
            success: function (res) {
              console.log(res)
              that.setData({
                storeDetailres: res.data.data,
                chargePerson: res.data.data.charge_person,
                businessList: res.data.data.sales
              })
              console.log(that.data.storeDetailres)
            }
          })
        }, 100)
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    var that =this
    that.setData({
      firstIn: false
    })
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