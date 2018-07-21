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
        console.log(that.data.imgList)
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

  submit: function(){ //传图片还有问题
    var that = this
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
    } else if (that.data.imgList.length == 0) {
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
            // for (var i = 0; i < that.data.imgList.length; i++) {
              wx.uploadFile({
                url: getApp().data.servsers + 'return_documents/uploadImg', //接口地址
                filePath: that.data.imgList[0],
                name: 'file',
                formData: {
                  token: that.data.token,
                  return_id: return_id
                },
                success: function (res) {
                  console.log(res)
                  var data = res.data
                }
              })
            // }
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
            // for (var i = 0; i < that.data.imgList.length; i++) {
            wx.uploadFile({
              url: getApp().data.servsers + 'return_documents/uploadImg', //接口地址
              filePath: that.data.imgList[0],
              name: 'file',
              formData: {
                token: that.data.token,
                return_id: return_id
              },
              success: function (res) {
                console.log(res)
                var data = res.data
              }
            })
            // }
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
            for (var i = 0; i < that.data.imgList.length; i++) {
              wx.uploadFile({
                url: getApp().data.servsers + 'return_documents/uploadImg',
                filePath: that.data.imgList[i],
                name: 'image',
                formData: {
                  token: that.data.token,
                  return_id: return_id
                },
                success: function (res) {
                  console.log(res)
                  var data = res.data
                }
              })
            }
          }
        })
      }
    }
  }
})