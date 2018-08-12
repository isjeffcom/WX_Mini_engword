//index.js
//获取应用实例

const app = getApp()
const md5_module = require("../../utils/md5.js");

const bd_api_appId = "20180523000164910"
const bd_api_key = "rmGG4lnuSXbI2nRSFRo6"
const bd_api_baseUrl = "https://fanyi-api.baidu.com/api/trans/vip/translate?q=";
const db_api_baseUrl_2 = "&from=en&to=zh&appid=" + bd_api_appId;


var boo_canSearch = false;
var boo_clickedSearch = false;

var addNewBtn_state = true;

var s_value;

var wordsData = wx.getStorageSync('local_words') || []


Page({
  data: {
    motto: 'Hello World',
    res_card_dst: '网络错误',
    userInfo: {},
    searchwhichWord:'',
    addBtnC_AnimationData: {},
    addBtnIcVec_AnimationData:{},
    addBtnIcHor_AnimationData:{},
    addBtnCircle_AnimationData:{},
    addBtnCSSBorder:"1px solid #888",
    hasUserInfo: false,
    canSearch: boo_canSearch,
    clickedSearch: boo_clickedSearch,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    //主要数据
    wordList:wordsData,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  //事件处理函数
  toTest: function () {
    wx.navigateTo({
      url: '../wordtest/wordtest'
    })
  },
  onLoad: function () {
    console.log(this.data.canSearch)
    /*if (app.globalData.userInfo) {
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
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }*/
  },
  getUserInfo: function(e) {
    //console.log(e)
    //app.globalData.userInfo = e.detail.userInfo
    /*this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })*/
  },

  //Display search button when input
  searchWord: function(e){
    boo_clickedSearch = false;
    s_value = e.detail.value;

    this.setData({
      searchwhichWord: s_value
    })
    if(s_value.length > 1){
      boo_canSearch = true;
      
    }else{
      boo_canSearch = false;
      //do nothing for now...
    }

    this.setData({
      canSearch: boo_canSearch,
      clickedSearch: boo_clickedSearch,
    })
  },

  //Search Function
  searchRequest: function(e){

    var that = this;
    var api_salt = Date.parse(new Date());
    var r_value = s_value;
    wx.showLoading({
      title: '正在查询中',
    })

    /*API Requirement: Convert string*/
    var r_sign_ready = bd_api_appId + r_value + api_salt + bd_api_key;
    var r_sign_finish = md5_module.md5(r_sign_ready);

    /*API Requirement: Convert Url*/
    var r_url = bd_api_baseUrl + r_value + db_api_baseUrl_2 + "&salt=" + api_salt + "&sign=" + r_sign_finish
    
    /*Request Data*/
    wx.request({
      url: r_url,
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res);
        //Return and display data
        var res_dst = res.data.trans_result[0].dst;
        boo_clickedSearch = true;

        that.setData({
          res_card_dst: res_dst,
          clickedSearch: boo_clickedSearch,
        })
        wx.hideLoading()
      }
    })

    
  },

  //Add new word click listener and animation
  addNewWord: function(e){

    if(addNewBtn_state == true){
      addNewBtn_state = false;
    }else{
      addNewBtn_state = true
    }
    

  },

  closeWord:function(e) {
    var index = e.currentTarget.dataset.key;
    this.data.wordList.splice(index,1)
    this.setData({
      wordList: this.data.wordList
    })
  },

  addToWordList:function() {
     var listLength = this.data.wordList;
     for (let i = 0, len = listLength.length; i < len; i++){
       if (listLength[i].englist == this.data.searchwhichWord){
          wx.showModal({
            title: '提示',
            content: '已经添加过这个单词了',
            showCancel:false,
          })
           return 
       }
     }

    //准备数据
    var newWord = {
        "englist": this.data.searchwhichWord,
        "chinese_short": this.data.res_card_dst,
        "status": '0'
    }

    //设置当页显示
    this.data.wordList.splice(0, 0, newWord)
    this.setData({
      wordList: this.data.wordList
    })

    //设置本地储存
    wordsData.push(newWord);
    wx.setStorageSync('local_words', wordsData)

  },

  showMore:function(e) {
    var index = e.currentTarget.dataset.key;
    this.data.wordList[index].status == 0 ? this.data.wordList[index].status = 1 : this.data.wordList[index].status = 0 ;
    this.setData ({
      wordList: this.data.wordList
    })
  }
})

