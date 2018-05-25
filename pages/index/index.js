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


Page({
  data: {
    motto: 'Hello World',
    res_card_dst: '网络错误',
    userInfo: {},
    addBtnC_AnimationData: {},
    addBtnIcVec_AnimationData:{},
    addBtnIcHor_AnimationData:{},
    addBtnCircle_AnimationData:{},
    addBtnCSSBorder:"1px solid #888",
    hasUserInfo: false,
    canSearch: boo_canSearch,
    clickedSearch: boo_clickedSearch,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
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

  searchWord: function(e){
    boo_clickedSearch = false;
    s_value = e.detail.value;

    this.setData({
      
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

  searchRequest: function(e){

    var that = this;
    var api_salt = Date.parse(new Date());
    var r_value = s_value;

    /*CONVERT SIGN*/
    var r_sign_ready = bd_api_appId + r_value + api_salt + bd_api_key;
    var r_sign_finish = md5_module.md5(r_sign_ready);

    /*CONVERT URL*/
    var r_url = bd_api_baseUrl + r_value + db_api_baseUrl_2 + "&salt=" + api_salt + "&sign=" + r_sign_finish
    
    /*REQUEST*/
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
        var res_dst = res.data.trans_result[0].dst;

        boo_clickedSearch = true;

        that.setData({
          res_card_dst: res_dst,
          clickedSearch: boo_clickedSearch,
        })
      }
    })

    
  },

  addNewWord: function(e){
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
    })

    var animation_2 = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
    })

    this.animation = animation;

    if(addNewBtn_state == true){
      
      animation.scale(1.2, 1.2).rotate(60).step();

      this.setData({
        addBtnC_AnimationData: animation.export(),
      });

      setTimeout(function () {
        animation.width(6).rotate(180).step()
        this.setData({
          addBtnIcHor_AnimationData: animation.export(),
        })
        setTimeout(function () {
          animation.translateX(-3).translateY(-5).backgroundColor("#ffffff").step()
          this.setData({
            addBtnIcHor_AnimationData: animation.export(),
          })
          setTimeout(function () {
            animation.translateY(1).translateX(-1).width(2).backgroundColor("#ffffff").step()
            this.setData({
              addBtnIcVec_AnimationData: animation.export(),
            })
            setTimeout(function () {
              animation_2.backgroundColor("#62bbff").step()

              this.setData({
                addBtnCircle_AnimationData: animation_2.export(),
              })
            }.bind(this), 10)
          }.bind(this), 10)
        }.bind(this), 10)
      }.bind(this), 10)

      addNewBtn_state = false;

    }else{
      animation.scale(1, 1).rotate(0).step();

      this.setData({
        addBtnC_AnimationData: animation.export(),
      });

      setTimeout(function () {
        animation.width(6).rotate(180).step()
        this.setData({
          addBtnIcHor_AnimationData: animation.export(),
        })
        setTimeout(function () {
          animation.translateX(-1.5).translateY(1.5).width(15).backgroundColor("#888").step()
          this.setData({
            addBtnIcHor_AnimationData: animation.export(),
          })
          setTimeout(function () {
            animation.translateY(1).translateX(-1).width(2).backgroundColor("#888").step()
            this.setData({
              addBtnIcVec_AnimationData: animation.export(),
            })
            setTimeout(function () {
              animation_2.backgroundColor("#fff").step()

              this.setData({
                addBtnCircle_AnimationData: animation_2.export(),
              })
            }.bind(this), 10)
          }.bind(this), 10)
        }.bind(this), 10)
      }.bind(this), 10)

      addNewBtn_state = true
    }
    

  },
})

function addBtnTurnBack(){
  
}
