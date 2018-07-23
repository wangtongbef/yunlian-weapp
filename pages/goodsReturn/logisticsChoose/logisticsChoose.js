// pages/goodsSend/logisticsChoose/logisticsChoose.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:'',
    id:'',
    companylist:[],
    companyChecked: 1,
    maskshow:false,
    markedWords:'',
    inputValue:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      token: wx.getStorageSync('tokenRoles').token,
      id: options.id
    })
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: getApp().data.servsers + 'delivery/logisticsCompany', //获取快递公司列表
      data: {
        token: that.data.token
      },
      method: 'POST',
      success: function (res) {
        wx.hideLoading()
        if (res.data.code == -3) {
          wx.showToast({
            title: 'token过期',
            icon: 'none',
            duration: 1000
          })
          setTimeout(function () {
            wx.redirectTo({
              url: '../../login/login'
            })
          }, 1000)
        } else {
          that.setData({
            companylist: res.data.data
          })
        }
      }
    }) 
  },

  bindinput:function(event){
    var that = this
    var str = ''
    var value =''
    if (event.detail.value.length < that.data.inputValue.length){ //删除操作
      value = that.data.inputValue.replace(/ /g, "").slice(0, str.length - 1)
    } else if (event.detail.value.length > that.data.inputValue.length){ //输入操作
      value = event.detail.value.replace(/ /g, "")
    }
    for (var i = 0; i < value.length; i++) {
      if (i % 4 == 3 && i != value.length-1) {
        str = str + value[i] + ' '
      } else {
        str = str + value[i]
      }
    }
    that.setData({
      inputValue: str
    })
  },

  companycheck:function(e){
    var that = this
    that.setData({
      companyChecked: e.currentTarget.dataset.id
    })
  },

  confirm:function(){
    var that = this
    var inputValue = that.data.inputValue.replace(/ /g, "")
    console.log(inputValue, that.data.companyChecked, that.data.id)
    if (inputValue.length==0){
      that.setData({
        markedWords: '你还没输入运单号',
        maskshow: true
      })
      setTimeout(function () {
        that.setData({
          maskshow: false
        })
      }, 1000)
    } else if (inputValue.length < 8){
      that.setData({
        markedWords: '运单号不能少于8位',
        maskshow: true
      })
      setTimeout(function () {
        that.setData({
          maskshow: false
        })
      }, 1000)
    }else {
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: getApp().data.servsers + 'return_documents/sendOut', //退货单发货
        data: {
          token: that.data.token,
          return_id: that.data.id,
          logistics_company_id: that.data.companyChecked,
          waybill_number: inputValue
        },
        method: 'POST',
        success: function (res) {
          wx.hideLoading()
          if (res.data.code == -3) {
            wx.showToast({
              title: 'token过期',
              icon: 'none',
              duration: 1000
            })
            setTimeout(function () {
              wx.redirectTo({
                url: '../../login/login'
              })
            }, 1000)
          } else {
            console.log(res)
            that.setData({
              markedWords: res.data.msg,
              maskshow: true
            })
            setTimeout(function () {
              that.setData({
                maskshow: false
              })
              wx.navigateBack({
                delta: 1
              })
            }, 1000)
          }
        }
      })  
    }
  }
})