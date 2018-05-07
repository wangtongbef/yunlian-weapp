var chooseLocation = require('../../utils/getLocation.js');
Page({

  data: {
    imgList:"../../img/photograph.svg",
    position: '',
    address:'所在位置',
    isShow: true,
    isToSignin:false,
    currentTab: 0,
    isShowListNum: 5,
    checkList:[],
    checklistPage:0,
    checklistMore:0,
    photoList:[]
  },
  onLoad: function (options) {
    var that = this
    var tokenRoles = wx.getStorageSync('tokenRoles');
    wx.showLoading({
      title: '加载中',
    })
    that.getchecklist(that.data.checklistPage)
  },
  swichNav: function (e) {
    var that = this
    var tokenRoles = wx.getStorageSync('tokenRoles');
    if (e.target.dataset.current == that.data.currentTab) {
      return false;
    }else if (e.target.dataset.current == 0){
      that.setData({
        currentTab: 0,
        isShow: true
      })
    } else if (e.target.dataset.current == 1) {
      that.setData({
        currentTab: 1,
        isShow: false
      })
    }
  },

  getchecklist(checklistPage){
    var that = this
    var tokenRoles = wx.getStorageSync('tokenRoles');
    wx.request({
      url: getApp().data.servsers + 'sign_in/list',
      data: {
        page: checklistPage,
        token: tokenRoles.token
      },
      method: 'POST',
      success: function (res) {
        wx.hideLoading()
        if (res.code == -3) {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 1000
          })
          setTimeout(function () {
            wx.redirectTo({
              url: '../login/login'
            })
          }, 1000)
        }else{
          var list = res.data.data.list
          var addimglist = []
          for (var i = 0; i < list.length; i++) {
            list[i].image = 'https://' + list[i].image
            addimglist.push(list[i])
          }
          that.setData({
            checkList: addimglist,
            checklistMore: res.data.data.more
          })
        }
      }
    })
  },
  
  previewImage(e){
    var current = e.target.dataset.id;
    var that = this;
      wx.previewImage({
        urls: [that.data.checkList[current].image] // 当前显示图片的http链接
      })
  },
  //拍照或者从相册选照片
  photo(){
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], 
      sourceType: ['camera'], 
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        that.setData({
          imgList: tempFilePaths,
          isToSignin:true
        }) 
      }
    })
  },
  // 预览选中图片
  photoImg(e){
    console.log(e)
    var current = e.currentTarget.dataset.src[0];
    var that = this;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: that.data.imgList // 需要预览的图片http链接列表
    })
  },

  getadress() {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        wx.hideLoading()
        that.setData({
          address: res.address,
          position: res.latitude + ',' + res.longitude
        })
        //console.log(that.data.address)
      },
      fail: function (res) {
        wx.hideLoading()
        wx.getSetting({
          success: (res) => {
            if (res.authSetting['scope.userLocation']) {
              return
            } else {
              wx.showModal({
                title: '温馨提示',
                showCancel: false,
                confirmText: '授权',
                content: '需要授权您的位置信息后才能使用,我们不会将您的信息提供给第三方,请点击下方授权按钮重新开启权限',
                //content: '您拒绝了授权,将无法正常使用,如需重新获取请点击下方授权按钮',
                success: (res) => {
                  //开启授权
                  wx.openSetting({
                  })
                }
              })
            }
          }
        })
      }
    })
  },

  signIn(){
    var that = this;
    var tokenRoles = wx.getStorageSync('tokenRoles');
    if (that.data.isToSignin && that.data.address!=='所在位置'){
      wx.showLoading({
        title: '加载中',
      })
      wx.uploadFile({
        url: getApp().data.servsers + 'sign_in/mark', //接口地址
        filePath: that.data.imgList[0],
        name: 'image',
        formData: {
          token: tokenRoles.token,
          position: that.data.position,
          address: that.data.address
        },
        success: function (res) {
          wx.hideLoading()
          if (res.code == -3) {
            wx.showToast({
              title: res.msg,
              icon: 'none',
              duration: 1000
            })
            setTimeout(function () {
              wx.redirectTo({
                url: '../login/login'
              })
            }, 1000)
          }else{
            var data = JSON.parse(res.data)
            if (data.code == 0){
              wx.showToast({
                title: '签到成功',
                icon: 'none',
                duration: 1000
              })
              setTimeout(function(){
                wx.showLoading({
                  title: '加载中',
                })
                that.getchecklist(that.data.checklistPage)
                that.setData({
                  imgList: "../../img/photograph.svg",
                  isToSignin: false,
                  address: '所在位置',
                  currentTab: 1,
                  isShowListNum: 5,
                  checklistPage: 0,
                  isShow: false
                })
              },1000)
            } else if (data.code == 1){
              wx.showToast({
                title: '签到失败',
                icon: 'none',
                duration: 1000
              })
            }
          }
          //do something
        }
      })
    } else{
      wx.showToast({
        title: '请正确填写资料',
        icon: 'none',
        duration: 1000
      })
    }
  },
  
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () { //
    var that = this
    var isShowListNum
    wx.showLoading({
      title: '加载中',
    })
    if (that.data.checklistMore==1){
      if (that.data.isShowListNum < that.data.checkList.length) {
        var t = setTimeout(function () {
          wx.hideLoading()
          isShowListNum = that.data.isShowListNum + 5
          that.setData({
            isShowListNum: isShowListNum
          })
        }, 500)
      } else if (that.data.isShowListNum = that.data.checkList.length) {//请求数据并拼接
        var checklistPage = that.data.checklistPage + 1
        isShowListNum = that.data.isShowListNum + 5
        var tokenRoles = wx.getStorageSync('tokenRoles');
        wx.request({
          url: getApp().data.servsers + 'sign_in/list',
          data: {
            page: checklistPage,
            token: tokenRoles.token
          },
          method: 'POST',
          success: function (res) {
            if (res.code == -3) {
              wx.showToast({
                title: res.msg,
                icon: 'none',
                duration: 1000
              })
              setTimeout(function () {
                wx.redirectTo({
                  url: '../login/login'
                })
              }, 1000)
              wx.hideLoading()
            }else{
              var list = res.data.data.list
              var addimglist = []
              for (var i = 0; i < list.length; i++) {
                list[i].image = 'https://' + list[i].image
                addimglist.push(list[i])
              }
              addimglist = that.data.checkList.concat(addimglist)
              that.setData({
                checkList: addimglist,
                checklistMore: res.data.data.more,
                checklistPage: checklistPage,
                isShowListNum: isShowListNum
              })
              wx.hideLoading()
            }
          }
        })
      }
    }else if (that.data.checklistMore == 0){
      if (that.data.isShowListNum < that.data.checkList.length) {
        var t = setTimeout(function () {
          wx.hideLoading()
          isShowListNum = that.data.isShowListNum + 5
          that.setData({
            isShowListNum: isShowListNum
          })
        }, 500)
      }else if (that.data.isShowListNum >= that.data.checkList.length) {
        wx.hideLoading()
        //到底了
        wx.showToast({
          title: '到底啦',
          icon: 'success',
          duration: 1000
        })
      }
    }
  }
})