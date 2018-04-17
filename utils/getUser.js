var getUser = function(){
  var that = this;
  wx.login({//登录
    success: function (res) {
      var code = res.code
      wx.getUserInfo({//获取用户信息
        success: function (res) {
          console.log('用户信息', res);
          var user = {};
          user.name = res.userInfo.nickName;
          user.img = res.userInfo.avatarUrl;
          wx.setStorageSync('user', user);
        },
        fail: function (err) {
          wx.showModal({
            title: '温馨提示',
            showCancel: true,
            confirmText: '授权',
            content: '需要授权您的公开信息(昵称、头像等)后才能使用,我们不会将您的信息提供给第三方,请点击下方授权按钮重新开启权限',
            //content: '您拒绝了授权,将无法正常使用,如需重新获取请点击下方授权按钮',
            success: (res) => {
              //开启授权
              if (res.confirm) {
                wx.openSetting({
                  success: (res) => {
                    if (res.authSetting['scope.userInfo']) {
                      wx.getUserInfo({//获取用户信息
                        success: function (res) {
                          console.log('用户信息', res);
                          var user = {};
                          user.name = res.userInfo.nickName;
                          user.img = res.userInfo.avatarUrl;
                          wx.setStorageSync('user', user);
                        }
                      })
                    } else {  //没有授权
                      getUser()
                    }
                  },
                })
              } else if (res.cancel) {
                wx.navigateBack({
                  delta: -1
                })
              }
            }
          })
        }
      })
    }
  })
}

module.exports = getUser;