var getUser = require('../../utils/getUser.js');

Page({
  data:{
    token:'',
    nickName:'',
    avatarUrl:'',
    telephone:'',
    flag:false,
    phonePrompt:'',
    codePrompt:'',
    promptColor:'',
    btnBackground:'',
    codeText:'获取验证码',
    codeVal:'',
    time:10,
    codeShow:false,
    codeDis:true,
    submitDis:true,
    codeT:'',
    submitBg:'',
    isSendCode:false,
    isHiddenLogin:true
  },
  onLoad:function(){
    var that = this;
    getUser();
    wx.login({
      success: function (res) {
        console.log(res)
        if (res.code) {
          //发起网络请求
          wx.request({
            url: getApp().data.servsers + 'login/login',
            method: 'POST',
            data: {
              wx_code: res.code
            },
            success: function (res) {
              if (res.data.code === 0) {
                console.log(res)
                that.setData({
                  token: res.data.data.token
                }) 
                wx.setStorageSync('tokenRoles', res.data.data)// 存储token
                if (res.data.data.bind_phone === 1) { //res.data.data.bind_phone判定互换
                  that.setData({
                    isHiddenLogin: false
                  })
                } else if (res.data.data.bind_phone === 0){
                  if (res.data.data.roles.length === 1){
                    wx.setStorageSync('role', res.data.data.roles[0])
                    wx.navigateTo({
                      url: '../index/index'
                    })
                  } else if (res.data.data.roles.length > 1){
                    wx.navigateTo({
                      url: '../rolesCheck/rolesCheck'
                    })
                  }
                }
              } else if (res.data.code === 1){
                wx.showToast({
                  title: '此openid不存在',
                  icon: 'none',
                  duration: 2000
                })
                that.setData({
                  isHiddenLogin: true
                })
                var t = setTimeout(function () {
                  wx.redirectTo({
                  url: '../login/login'
                  })
                }, 3000);
                t
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
    //this.getLogin();
  },
  //手机号码验证
  phoneVal:function(e){
      var that = this; 
      //console.log(e.detail.value);
      var telephone = e.detail.value;
      if (/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(telephone)){
        console.log('手机验证通过啦',telephone)
        console.log(that.data.token)
        that.setData({
          flag: true,
          phonePrompt: '输入正确',
          promptColor:'green',
          codeDis:false,
          btnBackground: 'linear-gradient(#018fe8,#0072b1)',
          telephone: telephone
        })
      }else{
        that.setData({
          flag:true,
          phonePrompt:'请输入正确的手机号码格式',
          promptColor: 'red',
          codeDis: true,
          btnBackground:'#C7C7C7',
          submitBg: '',
          submitDis: true
        })
      }
  },
  //发送验证码
  sendCode:function(){
    var that = this;
    console.log(that.data.telephone)
    wx.request({
      url: getApp().data.servsers + 'login/message',
      method: 'POST',
      data:{
        phone_number:that.data.telephone, 
        token: that.data.token
      },
      success:function(e){
        clearInterval(timer)
        console.log('验证码发送',e)
        if(e.data.code===0){
          var time = that.data.time;
          that.setData({
            isSendCode: true,
            codeShow: true,
            submitDis: false,
            time: time
          })
          var timer = setInterval(function () {
            time--;
            that.setData({
              time: time,
              codeDis: true,
              btnBackground: '#C7C7C7'
            })
            if (time == 0) {
              clearInterval(timer)
              that.setData({
                codeShow: false,
                codeDis: false,
                btnBackground: 'linear-gradient(#018fe8,#0072b1)',
                time: 10
              })
            }
          }, 1000)
        } else if(e.data.code !== 0){
          wx.showToast({
            title: e.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },

  //验证码验证
  codeVal(e){
    var that = this;
    var value = e.detail.value;
    //console.log('验证码',value)
    if (value.length > 5 && that.data.isSendCode){
      that.setData({
        submitBg: 'linear-gradient(#018fe8,#0072b1)',
        submitDis:false,
        codeVal: value
      })
    }else{
      that.setData({
        submitBg: '',
        submitDis: true
      })
    }
  },
  //登录页面显示状态
  /*getLogin(){
    var loginInfo = wx.getStorageSync('loginInfo');
    console.log(loginInfo);
    if (loginInfo){
      wx.redirectTo({
        url: '../index/index',
      })
    }else{
      this.setData({isHiddenLogin:false})
    }
  },*/

  //登录并绑定手机号接口
  login(){
    var that = this;
    wx.request({
      url: getApp().data.servsers + 'login/bind',
      method: 'POST',
      data:{
        phone_number: that.data.telephone,
        auth_code: that.data.codeVal,
        token: that.data.token
      },
      success:function(res){
        var code = res.data.code
        if (code == 0){
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 1000
          });
          var t = setTimeout(function(){
            wx.redirectTo({
              url: 'login',
            })
          },1000)
        }
        if (statusCode !== 0) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
    console.log()
    /*wx.navigateTo({
      url: '../index/index',
    })*/
  }
})