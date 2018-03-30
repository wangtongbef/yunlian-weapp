var chooseLocation = require('../../utils/getLocation.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList:"../../img/photograph.svg",
    position: '',
    address:'所在位置',
    isShow: true,
    isToSignin:false,
    currentTab: 0,
    isShowListNum: 5,
    checkList:[],
    photoList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
      wx.request({
        url: getApp().data.servsers + 'sign_in/list',
        data: {
          page: 0,
          token: tokenRoles.token
        },
        method: 'POST',
        success: function (res) {
          var list = res.data.data.list
          var reverselist = []
          for (var i = list.length-1; i >=0;i--){
            list[i].image = 'https://' + list[i].image
            reverselist.push(list[i])
          }
          console.log(reverselist)
          that.setData({
            checkList: reverselist
          })
        }
      })
      that.setData({
        currentTab: 1,
        isShow: false
      })
    }
    // if (that.data.currentTab === e.target.dataset.current) {
    //   return false;
    // } else {
    //   var showMode = e.target.dataset.current == 0;
    //   that.setData({
    //     currentTab: e.target.dataset.current,
    //     isShow: showMode
    //   })
    // }
  },
  //拍照或者从相册选照片
  photo(){
    var tokenRoles = wx.getStorageSync('tokenRoles');
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(res)
        that.setData({
          imgList: tempFilePaths,
          isToSignin:true
        })
        
      }
    })
  },
  //预览图片
  // photograph(e){
  //   //console.log(e.target.dataset.src);
  //   var current = e.target.dataset.src;
  //   var that = this;
  //     wx.previewImage({
  //       current: current, // 当前显示图片的http链接
  //       urls: that.data.imgList // 需要预览的图片http链接列表
  //     })
  // },
  
  // signedImg(e){
  //   var that = this;
  //   var current = e.target.dataset.img;
  //   var index = e.target.dataset.id;
  //   var imgArr = [that.data.checkList[index].photo]
  //   wx.previewImage({
  //     current: current, // 当前显示图片的http链接
  //     urls: imgArr,
  //   })
    
  // },

  getadress() {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        that.setData({
          address: res.name,
          position: res.latitude + ',' + res.longitude
        })
        // console.log(that.data.address)
        // console.log(that.data.position)
      },
      fail: function (res) {
        wx.getSetting({
          success: (res) => {
            if (res.authSetting['scope.userLocation']) {
              return
            } else {
              wx.showModal({
                title: '温馨提示',
                showCancel: false,
                confirmText: '授权',
                //content: '需要授权您的位置信息后才能使用,我们不会将您的信息提供给第三方,请点击下方授权按钮重新开启权限',
                content: '您拒绝了授权,将无法正常使用,如需重新获取请点击下方授权按钮',
                success: (res) => {
                  console.log(res);
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
          console.log(res.data)
          var data = JSON.parse(res.data)
          console.log(data)
          if (data.code == 0){
            wx.showToast({
              title: '签到成功',
              icon: 'none',
              duration: 2000
            })
            that.setData({
              imgList: "../../img/photograph.svg",
              address: '所在位置'
            })
          }
          //do something
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    if (that.data.isShowListNum < that.data.checkList.length) {
      wx.showToast({
        icon: 'loading',
        duration: 2000
      })
    } else if (that.data.isShowListNum >= that.data.checkList.length){
      wx.showToast({
        title: '到底啦',
        duration: 2000
      })
    }
    var t = setTimeout(function () {
      var isShowListNum = that.data.isShowListNum + 5
      that.setData({
        isShowListNum: isShowListNum
      })
    }, 2000)
  }
})