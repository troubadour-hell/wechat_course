//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    tip: "",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'), 
    yDSA: "2017",
    yDM: "2017",
    yEH: "2017",
    yVR: "2017",
    ySD: "2017",
    ySS: "2017",
    cDSA: false,
    cDM: false,
    cEH: false,
    cVR: false,
    cSD: false,
    cSS: false,
    allCourse:["DSA","DM","EH","VR","SD", "SS"]
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } 
    else{}
    if (!this.hasUserInfo) {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        },
        fail: res => {
          wx.navigateTo({
            "url": "../fail/fail"
          })
        }
      })
    }
  }, 
  formBindsubmit: function (e) {
    if (e.detail.value["course"].length == 0){
      this.setData({
        tip: "这学期快选一门吧!"
      })
      return
    }
    else{
      var years={
        DSA: this.data.yDSA,
        DM: this.data.yDM,
        EH: this.data.yEH,
        VR: this.data.yVR,
        SD: this.data.ySD,
        SS: this.data.ySS,
      }
      wx.request({
        url: app.globalData.server,
        method: "POST",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        }, 
        data: { 
          course: JSON.stringify(e.detail.value.course),
          userInfo: JSON.stringify(app.globalData.userInfo),
          userID: JSON.stringify(app.globalData.userID),
          years: JSON.stringify(years)
        },
        success: res => { 
          //console.log('已经提交数据到数据库') 
          app.globalData.allInfo = res.data.message
          //console.log(app.globalData.allInfo)
          wx.navigateTo(
            {
              "url": "../share/share"
            })
        },
        fail: res => {
          wx.navigateTo({
            "url": "../fail/fail"
          })
        }
      })
    }
  //console.log(e.detail.value["course"], app.globalData.userInfo)  
  },
  checkChange: function (e){
    this.setData({
      tip: ""
    })
    var select = []
    for(var x in e.detail.value){
      select.push(e.detail.value[x])  
    }
    for(var x in this.data.allCourse){
      if (select.indexOf(this.data.allCourse[x])>=0)
      {
        if(this.data.allCourse[x]=="DSA"){
          this.setData({
            cDSA: true
          })
        }
        if (this.data.allCourse[x] == "DM") {
          this.setData({
            cDM: true
          })
        } 
        if (this.data.allCourse[x] == "EH") {
          this.setData({
            cEH: true
          })
        }                 
        if (this.data.allCourse[x] == "VR") {
          this.setData({
            cVR: true
          })
        }
        if (this.data.allCourse[x] == "SD") {
          this.setData({
            cSD: true
          })
        }   
        if (this.data.allCourse[x] == "SS") {
          this.setData({
            cSS: true
          })
        }            
      }
      else{
        if (this.data.allCourse[x] == "DSA") {
          this.setData({
            cDSA: false
          })
        } 
        if (this.data.allCourse[x] == "DM") {
          this.setData({
            cDM: false
          })
        }
        if (this.data.allCourse[x] == "EH") {
          this.setData({
            cEH: false
          })
        }
        if (this.data.allCourse[x] == "VR") {
          this.setData({
            cVR: false
          })
        }
        if (this.data.allCourse[x] == "SD") {
          this.setData({
            cSD: false
          })
        }
        if (this.data.allCourse[x] == "SS") {
          this.setData({
            cSS: false
          })
        }   
      }
    }  
  },
  yDSAChange: function (e) {
    this.setData({
      yDSA: e.detail.value
    })
  },
  yDMChange: function (e) {
    this.setData({
      yDM: e.detail.value
    })
  },
  yEHChange: function (e) {
    this.setData({
      yEH: e.detail.value
    })
  },
  yVRChange: function (e) {
    this.setData({
      yVR: e.detail.value
    })
  },
  ySDChange: function (e) {
    this.setData({
      ySD: e.detail.value
    })
  },
  ySSChange: function (e) {
    this.setData({
      ySS: e.detail.value
    })
  },
})
