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
    console.log(options)
    var that = this
    that.setData({
      token: wx.getStorageSync('tokenRoles').token,
      id: options.id
    })
    wx.request({
      url: getApp().data.servsers + 'delivery/logisticsCompany', //获取快递公司列表
      data: {
        token: that.data.token
      },
      method: 'POST',
      success: function (res) {
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
            companylist: res.data.data
          })
        }
      }
    }) 
  },

  bindinput:function(event){
    var that = this
    // var str = ''
    // var value = event.detail.value.replace(" ", "")
    // for (var i = 0; i < value.length;i++){
    //   if (i%4==3){
    //     str = str+value[i]+' '
    //   }else{
    //     str = str + value[i]
    //   }
    // }
    that.setData({
      inputValue: event.detail.value
    })
    console.log(that.data.inputValue)
  },

  companycheck:function(e){
    var that = this
    that.setData({
      companyChecked: e.currentTarget.dataset.id
    })
  },

  confirm:function(){
    var that = this
    console.log(that.data.inputValue, that.data.companyChecked, that.data.id)
    if (that.data.inputValue.length==0){
      that.setData({
        markedWords: '你还没输入运单号',
        maskshow: true
      })
      setTimeout(function () {
        that.setData({
          maskshow: false
        })
      }, 1000)
    } else if (that.data.inputValue.length < 8){
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
      wx.request({
        url: getApp().data.servsers + 'return_documents/sendOut', //退货单发货
        data: {
          token: that.data.token,
          return_id: that.data.id,
          logistics_company_id: that.data.companyChecked,
          waybill_number: that.data.inputValue
        },
        method: 'POST',
        success: function (res) {
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