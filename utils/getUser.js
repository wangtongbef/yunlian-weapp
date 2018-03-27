/*var getUser = function (page) {
  var that = this;
  wx.login({
    success: function (res) {
      console.log(res);
      //获取用户信息
      wx.getUserInfo({
        success: (res) => {
          var userInfo = res.rawData;
          //var nickName = userInfo.nickName;
          //var avatarUrl = userInfo.avatarUrl;
          console.log(userInfo);
          if(res.code){
            /*wx.request({
              url: '',
              data:{

              },
              success:(res) => {
                //缓存用户头像和用户名
              }
            })*/
          /*}
        },
        fail: function (err) {
          wx.showModal({
            title: '温馨提示',
            showCancel: false,
            confirmText: '授权',
            //content: '需要授权您的公开信息(昵称、头像等)后才能使用,我们不会将您的信息提供给第三方,请点击下方授权按钮重新开启权限',
            content: '您拒绝了授权,将无法正常使用,如需重新获取请点击下方授权按钮',
            success: (res) => {
              console.log(res);
              //开启授权
              wx.openSetting({
                success: (res) => {
                  //console.log(res);                
                  if (res.authSetting['scope.userInfo']) {
                    //console.log('授权啦')
                  } else {  //用户仍然拒绝的情况
                    //console.log('未授权');
                    getUser();
                  }
                },
                fail: function () {
                  //that.getUserInfo()
                  console.log('失败啦')
                }
              })

            },
            fail: function () {
              //that.getUserInfo()
              console.log('jdkajksa')
            }
          })
        }
      })
    },
    fail: function () {

    }
  })
}*/

   
// var getUser = function(){
//   var setStorage = (wx.getStorageSync('user'));
//   console.log(setStorage)
//   var that = this;
//   if (setStorage) {
//     wx.getUserInfo({
//       success: function (res) {
//         /*that.setData({
//           nickName: res.userInfo.nickName,
//           avatarUrl: res.userInfo.avatarUrl,
//         })*/
//       },
//       fail: function () {
//         console.log("获取失败！")
//       }
//     })
//   } else {
//     wx.login({//登录
//       success: function (res) {
//         console.log('登录信息', res.code);
//         var code = res.code
//         wx.setStorageSync('code', code)
//         if (code) {
//           wx.request({
//             url: 'http://dev2.lystrong.cn/api/weapp/v1/login/sendMsg',
//             data: {
//               token: code
//               //要传给后台的参数，比如code
//             },
//             success: function (e) {
//               console.log('把code传给了后台' + e)
//               //缓存用户信息
//               //wx.setStorageSync('user', user);
//             },
//             fail: function () {
//               console.log('失败了')
//             }
//           })
//         }
//         wx.getUserInfo({//获取用户信息
//           success: function (res) {
//             console.log('用户信息', res);
//             var user = {};
//             user.name = res.userInfo.nickName;
//             user.img = res.userInfo.avatarUrl;
//             console.log(user);
//             wx.setStorageSync(
//               'user', user
//             );
            
//           },
//           fail: function (err) {
//             wx.showModal({
//               title: '温馨提示',
//               showCancel: false,
//               confirmText: '授权',
//               //content: '需要授权您的公开信息(昵称、头像等)后才能使用,我们不会将您的信息提供给第三方,请点击下方授权按钮重新开启权限',
//               content: '您拒绝了授权,将无法正常使用,如需重新获取请点击下方授权按钮',
//               success: (res) => {
//                 console.log(res);
//                 //开启授权
//                 wx.openSetting({
//                   success: (res) => {
//                     //console.log(res);                
//                     if (res.authSetting['scope.userInfo']) {
//                       //console.log('授权啦')
//                     } else {  //用户仍然拒绝的情况
//                       //console.log('未授权');
//                       getUser();
//                     }
//                   },
//                 })

//               }
//             })
//           }
//         })
//       }
//     })
//   }
// }
var getUser = function(){
  var that = this;
    wx.login({//登录
      success: function (res) {
        var code = res.code
        console.log('code信息', code);
        wx.setStorageSync('code', code)
        wx.getUserInfo({//获取用户信息
          success: function (res) {
            console.log('用户信息', res);
            var user = {};
            user.name = res.userInfo.nickName;
            user.img = res.userInfo.avatarUrl;
            console.log(user);
            wx.setStorageSync('user', user);
          },
          fail: function (err) {
            wx.showModal({
              // 少了一个判断，确定用户是否授权
              title: '温馨提示',
              showCancel: false,
              confirmText: '授权',
              //content: '需要授权您的公开信息(昵称、头像等)后才能使用,我们不会将您的信息提供给第三方,请点击下方授权按钮重新开启权限',
              content: '您拒绝了授权,将无法正常使用,如需重新获取请点击下方授权按钮',
              success: (res) => {
                console.log(res);
                //开启授权
                wx.openSetting({
                  success: (res) => {
                    //console.log(res);                
                    if (res.authSetting['scope.userInfo']) {
                      //console.log('授权啦')
                    } else {  //用户仍然拒绝的情况
                      //console.log('未授权');
                      getUser();
                    }
                  },
                })

              }
            })
          }
        })
      }
    })  
  //}
}

module.exports = getUser;