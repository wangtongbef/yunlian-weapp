var getUser = require('../../utils/getUser.js');

// Page({
//   data:{
//       nickName:'',
//       avatarUrl:'',
//       telephone:'',
//       flag:false,
//       phonePrompt:'',
//       codePrompt:'',
//       promptColor:'',
//       btnBackground:'',
//       codeText:'获取验证码',
//       time:60,
//       codeShow:false,
//       codeDis:true,
//       submitDis:true,
//       codeT:'',
//       submitBg:''
//   },
//   onLoad:function(){
//     getUser()
//   },
//   //手机号码验证
//   phoneVal:function(e){
//       var that = this; 
//       //console.log(e.detail.value);
//       var telephone = e.detail.value;
//       if (/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\\d{8}$/.test(telephone)){
//         console.log('手机验证通过啦')
//         that.setData({
//           flag: true,
//           phonePrompt: '输入正确',
//           promptColor:'green',
//           codeDis:false,
//           btnBackground: 'linear-gradient(#018fe8,#0072b1)',
//           telephone: telephone
//         })
//       }else{
//         that.setData({
//           flag:true,
//           phonePrompt:'请输入正确的手机号码格式',
//           promptColor: 'red',
//           codeDis: true,
//           btnBackground:'#C7C7C7',
//           submitBg: '',
//           submitDis: true
//         })
//       }
//   },
//   //发送验证码
//   sendCode:function(){
//     var code = (wx.getStorageSync('code'));
//     var that = this;
//     console.log(code)
//     wx.request({
//       url: 'http://dev2.lystrong.cn/api/weapp/v1/login/sendMsg/',
//       method: 'POST',
//       data:{
//         phone:this.data.telephone, 
//         token: 'abc'
//       },
//       success:function(e){
//         console.log(e)
//         that.setData({
//           btnBackground: '#C7C7C7',
//           codeShow: true,
//           codeDis: true
//         })
//         var time = that.data.time;
//         var timer = setInterval(function () {
//           time--;
//           that.setData({
//             time: time
//           })
//           if(time === 0){
//             clearInterval(timer)
//             that.setData({
//               time: 60,
//               codeShow:false,
//               codeDis:false,
//               btnBackground: 'linear-gradient(#018fe8,#0072b1)'
//             })
//             return;
//           }
//         }, 1000)
        
//       },
//       fail:function(e){
//         console.log(e)
//       }
//     })
//   },

//   codeVal(e){
//     var that = this;
//     var value = e.detail.value;
//     if(value.length > 5){
//       that.setData({
//         submitBg: 'linear-gradient(#018fe8,#0072b1)',
//         submitDis:false
//       })
//     }else{
//       that.setData({
//         submitBg: '',
//         submitDis: true
//       })
//     }
//   },
//   //登录
//   navigatorBtn(e){
//     console.log(e.detail.value)
//     /*wx.navigateTo({
//       url: '../index/index',
//     })*/
//   }
// })

Page({
  data:{
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
      isSendCode:false
      //isHiddenLogin:true
  },
  onLoad:function(){
    getUser();
    //this.getLogin();
  },
  //手机号码验证
  phoneVal:function(e){
      var that = this; 
      //console.log(e.detail.value);
      var telephone = e.detail.value;
      if (/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(telephone)){
        console.log('手机验证通过啦')
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
      url: getApp().data.servsers + 'login/login',
      method: 'POST',
      data:{
        phone_number:that.data.telephone, 
        token: 'abc123'
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
        } else if(e.data.code === -1){
          wx.showToast({
            title: '手机号码不存在',
            icon: 'loading',
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

  //登录
  login(e){
    var code = wx.getStorageSync('code');//code
    console.log('code信息',code);
    var that = this;
    var phone = that.data.telephone
    //console.log('电话号码',aa);
    wx.request({
      url: getApp().data.servsers + 'login/login',
      method: 'POST',
      data:{
        phone_number: phone,
        auth_code: that.data.codeVal,
        wx_code: code
      },
      success:function(e){
        var statusCode = e.data.code
        if (statusCode == 0){
          console.log(e)
          wx.setStorageSync('loginInfo', e.data.data);
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 1000
          });
          var t = setTimeout(function(){
            wx.redirectTo({
              url: '../rolesCheck/rolesCheck?token=' + e.data.data.token,
            })
          },1000)
        }
        if (statusCode == -1) {
          wx.showToast({
            title: '该手机已绑定其它微信,不可登录',
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
  },
  rolesCheck(token){
    wx.request({
      url: getApp().data.servsers + 'login/role',
      data: {
        token: token
      },
      success: function (res) {
        console.log(res)
      }
    })
  }
})