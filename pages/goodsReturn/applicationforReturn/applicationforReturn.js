// pages/goodsReturn/applicationforReturn/applicationforReturn.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productsList: [],
    code_list:[],
    imgList: [],
    productType: 2,
    token:'',
    des:'',
    markedWords: '',
    maskshow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      token: wx.getStorageSync('tokenRoles').token,
      productsList: JSON.parse(options.productlist),
      code_list: options.returnList
    }) 
  },

  chooseProducttype:function(e){
    var type = e.currentTarget.dataset.type
    if (this.data.productType == type){
      this.setData({
        productType: 0
      }) 
    }else{
      this.setData({
        productType: e.currentTarget.dataset.type
      })
    }
    console.log(this.data.productType)
  },

  getdes:function(e){
    this.setData({
      des: e.detail.value
    })
  },

  addImage:function (){
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFiles = res.tempFiles
        var list = that.data.imgList
        list.push(tempFiles[0].path)
        that.setData({
          imgList: list
        }) 
      }
    })
  },

  delImage:function(e){
    var that = this
    var list = that.data.imgList
    list.splice(e.currentTarget.dataset.index, 1)
    that.setData({
      imgList: list
    })
  },

  submit: function(){
    var that = this
    var uploadImglist = function (return_id, imglist) {
      console.log(return_id, imglist)
      var unUploadimglist = []
      var count = 0
      var i = 0
      var uploadimg = function (){
        wx.uploadFile({
          url: getApp().data.servsers + 'return_documents/uploadImg', //接口地址
          filePath: imglist[i],
          name: 'image',
          formData: {
            token: that.data.token,
            return_id: return_id
          },
          success: function (res) {
            count++
            if (i == imglist.length - 1) {
              wx:wx.hideLoading()
              console.log(count, imglist.length)
              if (count == imglist.length) {
                wx.hideLoading()
                that.setData({
                  maskshow: true,
                  markedWords: '操作成功'
                })
                setTimeout(function () {
                  that.setData({
                    maskshow: false
                  })
                  wx.navigateBack({
                    delta: 2
                  })
                }, 1000)
              } else {
                wx.showModal({
                  title: '提示',
                  content: imglist.length - count + '张图片未上传',
                  showCancel: false,
                  confirmText: '继续上传',
                  success: function (res) {
                    if (res.confirm) {
                      uploadImglist(return_id, unUploadimglist)
                    }
                  }
                })
              }
            }else{
              i++
              uploadimg()
            }
          },
          fail: function () {
            unUploadimglist.push(imglist[i])
            if (i == imglist.length - 1) {
              if (count != imglist.length) {
                wx.showModal({
                  title: '提示',
                  content: imglist.length - count + '张图片未上传',
                  showCancel: false,
                  confirmText: '继续上传',
                  success: function (res) {
                    if (res.confirm) {
                      uploadImglist(return_id, unUploadimglist)
                    }
                  }
                })
              }
            } else {
              i++
              uploadimg()
            }
          }
        })
      }
      uploadimg()
    }
    if (that.data.des.length==0){
      that.setData({
        maskshow: true,
        markedWords: '备注不能为空'
      })
      setTimeout(function () {
        that.setData({
          maskshow: false
        })
      }, 1000)
    } else if (that.data.productType == 0) {
      that.setData({
        maskshow: true,
        markedWords: '请选择质量类型'
      })
      setTimeout(function () {
        that.setData({
          maskshow: false
        })
      }, 1000)
    }else if (that.data.des.length <= 4) {
      that.setData({
        maskshow: true,
        markedWords: '备注不能少于四位'
      })
      setTimeout(function () {
        that.setData({
          maskshow: false
        })
      }, 1000)
    } else if (that.data.productType==2 && that.data.imgList.length == 0) {
      that.setData({
        maskshow: true,
        markedWords: '你还没上传照片'
      })
      setTimeout(function () {
        that.setData({
          maskshow: false
        })
      }, 1000)
    }else{
      wx.showLoading({
        title: '提交中',
      })
      if (wx.getStorageSync('role').role_name=='仓管员'){
        wx.request({
          url: getApp().data.servsers + 'return_documents/returnSubmit',
          data: {
            quality: that.data.productType-1,
            token: that.data.token,
            des: that.data.des,
            code_list: that.data.code_list
          },
          method: 'POST',
          success: function (res) {
            console.log(res)
            var return_id = res.data.data.return_id
            if (that.data.productType == 2){
              uploadImglist(return_id, that.data.imgList)
            } else {
              wx.hideLoading()
              that.setData({
                maskshow: true,
                markedWords: '操作成功'
              })
              setTimeout(function () {
                that.setData({
                  maskshow: false
                })
                wx.navigateBack({
                  delta: 2
                })
              }, 1000)
            }
          }
        })
      } else if (wx.getStorageSync('role').role_name == '门店负责人'){
        wx.request({
          url: getApp().data.servsers + 'return_documents/returnSubmitShop',
          data: {
            quality: that.data.productType - 1,
            token: that.data.token,
            des: that.data.des,
            shop_id: wx.getStorageSync('storeDetail').id,
            code_list: that.data.code_list
          },
          method: 'POST',
          success: function (res) {
            console.log(res)
            var return_id = res.data.data.return_id
            if (that.data.productType == 2) {
              uploadImglist(return_id, that.data.imgList)
            } else {
              wx.hideLoading()
              that.setData({
                maskshow: true,
                markedWords: '操作成功'
              })
              setTimeout(function () {
                that.setData({
                  maskshow: false
                })
                wx.navigateBack({
                  delta: 2
                })
              }, 1000)
            }
          }
        })
      } else if (wx.getStorageSync('role').role_name == '门店销售员') {
        wx.request({
          url: getApp().data.servsers + 'return_documents/returnSubmitSales',
          data: {
            quality: that.data.productType - 1,
            token: that.data.token,
            des: that.data.des,
            code_list: that.data.code_list
          },
          method: 'POST',
          success: function (res) {
            console.log(res)
            var return_id = res.data.data.return_id
            if (that.data.productType == 2) {
              uploadImglist(return_id, that.data.imgList)
            } else {
              wx.hideLoading()
              that.setData({
                maskshow: true,
                markedWords: '操作成功'
              })
              setTimeout(function () {
                that.setData({
                  maskshow: false
                })
                wx.navigateBack({
                  delta: 2
                })
              }, 1000)
            }
          }
        })
      }
    }
  }
})