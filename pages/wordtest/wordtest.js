var currentWid=1;
// pages/wordtest/wordtest.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    w_data:[
      {
        word: "单词",
        wid: 1,
      },

      {
        word: "火灾",
        wid: 2,
      },

      {
        word: "从今往后",
        wid: 3,
      },

      {
        word: "赛艇",
        wid: 4,
      },
    ],
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
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
  
  },

  checkWord: function(e){
    var wid = e.currentTarget.dataset.wid;
    this.setData({
      wtOS_cid: currentWid,
    })


    //绑定选定的id，用于前端样式变化的渲染

    if (wid == currentWid){

      console.log("Right" + " " +e.currentTarget.dataset.wid);
    }else{

      console.log(e.currentTarget.dataset.wid)
    }
  }
})