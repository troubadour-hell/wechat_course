// pages/share/share.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
    wx.showLoading({
      title: '请稍等',
      mask:true
    })   
    if (app.globalData.allInfo){       
      wx.showToast({
        title: "加载成功"
      })
    }
    else{
      wx.redirectTo({
        url: '../fail/fail',
      })         
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var res = wx.getSystemInfoSync()
    var width = res.windowWidth
    var height = res.windowWidth 
    const ctx = wx.createCanvasContext('myCanvas')
    ctx.setFillStyle('white')
    ctx.fillRect(0, 0, 1000, 1000)
    ctx.setFillStyle("#000000")
    ctx.setTextAlign("center")
    ctx.setFontSize(13)
    ctx.drawImage("../../image/code.jpg", width * 0.05, height * 1.37, 100, 100) 
    ctx.fillText("长按识别小程序，你选过陈斌老师哪些课？", width * 0.65, height * 1.47)
    ctx.drawImage("https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJrXLyZGmib8HWuicB62WKUoicHYxDII5QTomAyDkDuInuPWwJUKQP7rRGcia6eibibQMw9QAqZ9bwoIfHQ/0",width*0.4,height*0.16,width*0.2,width*0.2)
    ctx.setFontSize(15)
    ctx.fillText(app.globalData.allInfo.nickname+"的选课记录", width * 0.5, height*0.4)
    ctx.setFontSize(20)
    ctx.fillText("陈斌老师的课程", width * 0.5, 30)
    ctx.setFontSize(10)
    var num = 0
    var add = "未点亮"
    var pic = "g"
    var row_1 = ["DSA", "DM", "EH"]
    var dic_1 = {
      "DSA":"数据结构与算法-",
      "DM":"离散数学-",
      "EH":"地球与人类文明-"
    }
    for(var x in row_1)
    {
      if (app.globalData.allInfo[row_1[x]]) {
        add = app.globalData.allInfo["y"+row_1[x]]
        pic = ""
      }
      ctx.drawImage("../../image/"+row_1[x]+pic+".png", width * 0.05 + num * width * 0.31, height * 0.5, width * 0.27, width * 0.27)
      ctx.fillText(dic_1[row_1[x]] + add, width * 0.18+width*0.32*num, height * 0.5 + width * 0.32)
      num+=1
      add = "未点亮"
      pic = "g"
    }
    num = 0
    var row_2= ["VR", "SD", "SS"]
    var dic_2={
      "VR":"虚拟仿真创新应用与实践-",
      "SD":"空间数据库-",
      "SS":"开源空间信息软件-",
    }
    for (var x in row_2) {
      if (app.globalData.allInfo[row_2[x]]) {
        add = app.globalData.allInfo["y" + row_2[x]]
        pic = ""
      }
      ctx.drawImage("../../image/" + row_2[x]+pic+ ".png", width * 0.05 + num * width * 0.31, height * 0.5 + width * 0.4, width * 0.27, width * 0.27)
      ctx.fillText(dic_2[row_2[x]] + add, width * 0.18 + width * 0.32 * num, height * 0.5 + width * 0.72)
      num += 1
      add = "未点亮"
      pic = "g"
    }
    ctx.draw()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () { 
    return {
      title: '我选了陈斌老师的课',
      path: wx.canvasToTempFilePath({
        canvasId: 'myCanvas',
      }),
      success: res => {
        // 转发成功
        setTimeout(function () {
          wx.hideLoading()
        }, 1000)
        wx.showToast({
          title: '转发成功',
          mask: true
        })
      },
      fail: res => {
        wx.navigateTo({
          "url": "../fail/fail"
        })
      }
    }
  },
  save : function () {
    wx.canvasToTempFilePath({
      canvasId: 'myCanvas',
      success: res => {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: res => {
            setTimeout(function () {
              wx.hideLoading()
            }, 1000)
            wx.showToast({
              title: '保存成功',
              mask: true
            })
          },
          fail: res => {
            wx.navigateTo({
              "url": "../fail/fail"
            })
          }
        })
      },
    })
  },
  redo: function(){
    //console.log("redo", app.globalData.userID)
    wx.request({
      url: app.globalData.server + 'delete/',
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: { userID: JSON.stringify(app.globalData.userID) },
      success: res => {
        if (res.data.message=="Done"){
          wx.navigateTo({
            "url": "../poll/poll"
          })
        }
        else{
          wx.navigateTo({
            "url": "../fail/fail"
          })
        }
      },
      fail: res => {
        wx.navigateTo({
          "url": "../fail/fail"
        })
      }
    })
  }
})