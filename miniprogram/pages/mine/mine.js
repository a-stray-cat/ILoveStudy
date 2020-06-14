  const app = getApp()
  const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:"",
    avatarUrl : "",
    nickName : ""
  },
  userinfo: function() {
    wx.redirectTo({
      url: '../mine/mine/userinfo',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        db.collection('userInfo').where({
          _openid: "res.result._openid"
        }).get().then((res) => {
          app.userInfo = Object.assign(app.userInfo , res.data);
          this.setData({
              openid: app.userInfo[0]._openid,
              avatarUrl: app.userInfo[0].avatarUrl,
              nickName: app.userInfo[0].nickName
          })
        })
      } 
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.cloud.callFunction({
      name : 'login',
      data : {}
    }).then((res) => {
        db.collection('userInfo').where(res.result._openid).get().then((res) => {
          app.userInfo = Object.assign(app.userInfo , res.data);
          // console.log(app.userInfo)
          this.setData({
              avatarUrl : app.userInfo.avatarUrl,
              nickName: app.userInfo.nickName
          })
        })
    })
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

  }
  
})