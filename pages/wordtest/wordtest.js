// pages/wordtest/wordtest.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    rightAnswers: 2,
    clikeID:'',
    w_data:[
      {
        word: "单词",
        isClick:'',
      },

      {
        word: "火灾",
        isClick: '',
      },

      {
        word: "从今往后", 
        isClick: '',
      },

      {
        word: "赛艇",
        isClick: '',
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
    var index = e.currentTarget.dataset.key;
    var arr = this.data.w_data;
    arr[index].isClick = '1'
    this.setData({
      clikeID:index,
      w_data : arr,
    })
  }
})