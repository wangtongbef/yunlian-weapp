var getUser = function(){
  var that = this;
    wx.login({//登录
      success: function (res) {
        var code = res.code
        console.log('code信息', code);
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
                      wx.getUserInfo({//获取用户信息
                        success: function (res) {
                          console.log('用户信息', res);
                          var user = {};
                          user.name = res.userInfo.nickName;
                          user.img = res.userInfo.avatarUrl;
                          console.log(user);
                          wx.setStorageSync('user', user);
                        }
                      })
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