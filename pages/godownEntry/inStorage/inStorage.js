// pages/godownEntry/inStorage/inStorage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:'',
    productList:[],
    sendList:[],
    sendType:-1,
    courier:'',
    logistics_company:'',
    waybill_number:'',
    codedetail:true,
    codenumber:'',
    comfirmState:1,
    markedWords:'',
    maskshow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      token: wx.getStorageSync('tokenRoles').token
    })
    wx.scanCode({
      onlyFromCamera: false,
      success: (res) => {
        if (res.result.indexOf("code_type") >= 0 && res.result.indexOf("code_sn") >= 0) {
          var detail = res.result.split("?")[1].split("&")
          var obj = {'code_sn': detail[0].split("=")[1], 'code_type': detail[1].split("=")[1]}
          var arr = []
          arr.push(obj)
          that.setData({
            sendList: arr,
            codenumber: detail[0].split("=")[1],
            codedetail: true
          })
        } else {
          that.setData({
            codedetail: false
          })
        }
      },
      fail: function () {
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },

  Continue:function(){
    var that = this
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        if (res.result.indexOf("code_type") >= 0 && res.result.indexOf("code_sn") >= 0) {
          var detail = res.result.split("?")[1].split("&")
          var obj = { 'code_sn': detail[0].split("=")[1], 'code_type': detail[1].split("=")[1] }
          var arr = that.data.sendList
          arr.push(obj)
          that.setData({
            sendList: arr,
            codenumber: detail[0].split("=")[1],
            codedetail: true
          })
        } else {
          that.setData({
            codedetail: false
          })
        }
      }
    })
  },

  confirm: function(){ //确认产品数量
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: getApp().data.servsers + 'storage/storageInfo',
      data: {
        token: that.data.token,
        code_list: JSON.stringify(that.data.sendList)
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
              url: '../login/login'
            })
          }, 1000)
        } else {
          if (res.data.code == 0) {
            if (res.data.data.product_list.length == 0){
              that.setData({
                markedWords: '扫描结果没有对应的产品',
                maskshow: true
              })
              setTimeout(function () {
                that.setData({
                  maskshow: false
                })
                wx.navigateBack({
                  delta: 1
                })
              }, 2000)
            }else{
              that.setData({
                productList: res.data.data.product_list,
                sendType: res.data.data.from_type,
                comfirmState: 2
              })
              if (res.data.data.from_type == 1){
                that.setData({
                  courier: res.data.data.courier
                })
              } else if (res.data.data.from_type == 2){
                that.setData({
                  logistics_company: res.data.data.logistics_company,
                  waybill_number: res.data.data.waybill_number
                })
              }
            }
          } else if (res.data.code != 0){
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
            }, 2000)
          }
        }
      },
      fail: function(){
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },

  submit:function(){
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: getApp().data.servsers + 'storage/storage',
      data: {
        token: that.data.token,
        code_list: JSON.stringify(that.data.sendList)
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
              url: '../login/login'
            })
          }, 1000)
        } else {
          if (res.data.code == 0) {
            if (that.data.sendType==1){
              that.setData({
                markedWords: '入库单已提交，等待配送员确认',
                maskshow: true
              })
              setTimeout(function () {
                that.setData({
                  maskshow: false
                })
                wx.navigateBack({
                  delta: 1
                })
              }, 2000)
            } else {
              wx.navigateBack({
                delta: 1
              })
            }
          } else if (res.data.code != 0) {
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
            }, 2000)
          }
        }
      }
    })
  }
})