// pages/addPerson/addPerson.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    token:'',
    storeId:0,
    phoneNumber:'',
    name:'',
    phonePrompt:'',
    promptColor:'',
    namePrompt:'',
    namePromptColor:'',
    disabled:true,
    nameDisabled:true,
    btnBackground:'',
    previewHidden:false,
    changeNamehidden:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var tokenRoles = wx.getStorageSync('tokenRoles')
    var storeDetail = wx.getStorageSync('storeDetail')
    that.setData({
      token: tokenRoles.token,
      title: options.title,
      storeId: storeDetail.id
    })
    wx.setNavigationBarTitle({
      title: that.data.title
    })
  },
 
  phoneVal(e){
    //console.log(e.detail.value)
    var that = this; 
    var telephone = e.detail.value;
    if (/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(telephone)){
      that.setData({
        phonePrompt:'输入正确',
        phoneNumber: telephone,
        promptColor:'green',
        disabled:false,
        btnBackground: 'linear-gradient(#018fe8,#0072b1)',
      })
    }else{
      that.setData({
        phonePrompt: '请输入正确的手机号码格式',
        promptColor: 'red',
        disabled: false,
        btnBackground: '#C7C7C7'
      })
    }
  },
  nameVal(e){
    var that = this;
    var name = e.detail.value;
    if (name.length>=2) {
      that.setData({
        namePrompt: '输入正确',
        name: name,
        namePromptColor: 'green',
        nameDisabled: false,
      })
    } else if (name.length < 2){
      that.setData({
        namePrompt: '姓名不能少于2位',
        namePromptColor: 'red',
        nameDisabled: false,
      })
    }
  },
  numberSubmit(){
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: getApp().data.servsers + 'shop/checkPhoneNumber',
      data: {
        token: that.data.token,
        phone_number: that.data.phoneNumber
      },
      method: 'POST',
      success: function (res) {
        wx.hideLoading()
        console.log(res)
        if (res.data.data.existed==0){
          that.setData({
            changeNamehidden:false
          })
        } else if (res.data.data.existed == 1){
          that.setData({
            name: res.data.data.name,
            previewHidden: true,
            changeNamehidden: true
          })
        }
        console.log(that.data.name)
      }
    })
  },
  nameSubmit(){
    var that = this
    console.log(this.data.name)
    that.setData({
      previewHidden: true,
      changeNamehidden: true
    })
  },
  refill(){
    var that = this;
    that.setData({
      phoneNumber: '',
      name: '',
      phonePrompt: '',
      namePrompt: '',
      disabled: true,
      nameDisabled: true,
      btnBackground: '',
      previewHidden: false,
      changeNamehidden: true
    })
  },
  confirm(){
    var that = this
    var chargePersonData = wx.getStorageSync('chargePersonData')
    if (that.data.title == '添加门店负责人' || that.data.title == '更换门店负责人'){
      wx.request({
        url: getApp().data.servsers + 'shop/deleteShopChargePerson',
        data: chargePersonData,
        method: 'POST',
        success: function (res) {
          console.log(res)
          wx.request({
            url: getApp().data.servsers + 'shop/addShopChargePerson',
            data: {
              token: that.data.token,
              id: that.data.storeId,
              name: that.data.name,
              phone_number: that.data.phoneNumber
            },
            method: 'POST',
            success: function (res) {
              console.log(res)
              if (res.data.code == 0) {
                wx.showToast({
                  title: '添加成功',
                  icon: 'none',
                  duration: 1000
                })
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 1000)
              } else if (res.data.code == 1) {
                wx.showModal({
                  title: '提示',
                  content: '添加门店负责人失败',
                  showCancel: false,
                  confirmText: '知道了',
                  success: function () {
                  }
                })
              }
            }
          })
        }
      })
    } else if (that.data.title == '添加门店销售员') {
      wx.request({
        url: getApp().data.servsers + 'shop/addShopSalesPerson',
        data: {
          token: that.data.token,
          id: that.data.storeId,
          name: that.data.name,
          phone_number: that.data.phoneNumber
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
          if (res.data.code == 0) {
            wx.showToast({
              title: '添加成功',
              icon: 'none',
              duration: 1000
            })
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 1000)
          } else if (res.data.code == 1) {
            wx.showModal({
              title: '提示',
              content: '添加门店销售员失败',
              showCancel: false,
              confirmText: '知道了',
              success: function () {
              }
            })
          } else if (res.data.code == 2) {
            wx.showModal({
              title: '提示',
              content: '该用户已是门店销售员',
              showCancel: false,
              confirmText: '知道了',
              success: function () {
                wx.navigateBack({
                  delta: 1
                })
              }
            })
          }
        }
      })
    }
  }
})