  const app = getApp()
  const db = wx.cloud.database()

Page({
  data: {
      //判断小程序的API，回调，参数，组件等是否在当前版本可用。
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      
        avatarUrl: "",
        nickName: ""
      
  },
  onLoad: function () {

  },
  bindGetUserInfo: function(e) {
    // wx.cloud.callFunction({
    //   name: 'login',//函数名
    //   complete: res => {
    //     console.log('callFunction test result: ', res)
    //   }
    // })
      db.collection('userInfo').add ({
        data : {
          avatarUrl : e.detail.userInfo.avatarUrl,
          nickName : e.detail.userInfo.nickName
        }
      }).then((res) => {
        // console.log(res._id)
        db.collection('userInfo').doc(res._id).get().then((res) => {
          app.userInfo = Object.assign(app.userInfo , res.data);
          // console.log(app.userInfo)
          this.setData({
              avatarUrl : app.userInfo.avatarUrl,
              nickName: app.userInfo.nickName
          })
        })
      })
      wx.switchTab({
        url: '../homepage/homepage',
      })
  },
  
})