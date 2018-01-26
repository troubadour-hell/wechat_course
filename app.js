//app.js

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      },
      fail: res => {
        wx.navigateTo({
          "url": "../fail/fail"
        })
      }
    })

    // 登录
    wx.login({
      success: res => {
        var code = res.code;
        //console.log(code);
        wx.request({
          url: this.globalData.server + 'id/',
          method: "POST",
          header: {
            "content-type":"application/x-www-form-urlencoded"
          },
          data: { code: JSON.stringify(code)},
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
          success: res => {
            var isExist = res.data.exist;
            var message = res.data.message //返回openid\
            this.globalData.allInfo = message;
            this.globalData.userID = message["openid"]
            //console.log(this.globalData.userID )          
            //console.log(this.globalData.allInfo);            
            if(isExist){
              wx.navigateTo({
                  "url":"../share/share"
                })
            }
            else{
              wx.navigateTo({
                  "url": "../poll/poll"
                })
            }
          }
        })      
      },
      fail: res => {
        wx.navigateTo({
          "url": "../fail/fail"
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    userID: null,
    allInfo: null,
    server: "https://10.0.0.61/"
  }
})