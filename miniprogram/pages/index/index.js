const app = getApp()
const db = wx.cloud.database()
const db1 = db.command

Page({
  data:{
    openid: false
  },
  bindtaphp: function() {
    if (this.data.openid) {
      wx.switchTab({
        url: '../homepage/homepage',
      })
    } else {
      wx.showActionSheet({
        itemList: ['游客模式','微信登陆'],
        success (res) {
          if(res.tapIndex===0) {
             wx.switchTab({
              url: '../homepage/homepage',
              })
          } else if(res.tapIndex===1) {
            wx.redirectTo({
             url: '../login/login',
            })
          }
        }
      })
    }
  },
  onLoad: function (options) {
    wx.cloud.callFunction({
        name: 'login',//函数名
        complete: res => {
          db.collection('userInfo').where({
            _openid: "res.result._openid"
          }).get().then((res) => {
            if(res.data.length !== 0) {
              this.setData({
                openid: true
            })
            }
          })
        } 
      })
    }
})
