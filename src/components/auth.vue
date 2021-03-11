<template>
  <div>
    <div>用户登录授权页面</div>
    <div @click="toAbout">跳转到about页面</div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      code: ""
    };
  },
  mounted(){
    if(!window.localStorage.getItem('openid')){ // 如果缓存localStorage中没有微信openId，则需用code去后台获取
        this.getCode()
    } else {
        // 别的业务逻辑
    }
  },
  methods: {
    getCode() {
      // 非静默授权，第一次有弹框
      this.code = "";
      const local = window.location.href; // 获取页面url
      const secret = "3c9a16b96a275b6b63b1e5217a4d46b4";
      const appid = "wx759d76de3a757afa";
      this.code = this.getUrlCode().code; // 截取codec
      console.log(local);
      if (this.code == null || this.code === "") {
        // 如果没有code，则去请求
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(
          local
        )}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`;
      } else {
        // 你自己的业务逻辑
        console.log("执行业务逻辑", this.code, appid);
        // 网页授权的access_token
        axios
          .get(
            ` /api/sns/oauth2/access_token?appid=${appid}&secret=${secret}&code=${this.code}&grant_type=authorization_code`
          )
          .then(res => {
            console.log(res, "网页授权的access_token");
            if (res.status == 200) {
              this.$cookies.set("webAccessToken", res.data.access_token);
              this.$cookies.set("webrefresh_token", res.data.refresh_token);
              this.$cookies.set("openId", res.data.openid);
              axios
                .get(
                  `/api/sns/userinfo?access_token=${this.$cookies.get(
                    "webAccessToken"
                  )}&openid=${this.$cookies.get("openId")}&lang=zh_CN`
                )
                .then(res => {
                  console.log(res, "拉取用户的基本信息");
                  this.$cookies.set("headimgurl", res.data.headimgurl);
                  this.$cookies.set("webrefresh_token", res.data.refresh_token);
                  this.$cookies.set("openId", res.data.openid);
                });
            }
          })
          .catch(err => {
            return err;
          });
      }
    },
    getUrlCode() {
      // 截取code
      var url = location.search;
      this.winUrl = url;
      var theRequest = new Object();
      if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
        }
      }
      return theRequest;
    },
    toAbout() {
      this.$router.push("/about");
    },
    // 获取基础的access_token
    async getAssessToken() {
      let res = await axios.get(
        "/api/cgi-bin/token?grant_type=client_credential&appid=wx759d76de3a757afa&secret=3c9a16b96a275b6b63b1e5217a4d46b4"
      );
      this.$cookies.set("assess_token", res.data.access_token);
    }
  },
  created() {
    // this.getCode();
    this.getAssessToken();

    //     {
    //     "button": [
    // {
    //             "name": "我的",
    //             "sub_button": [
    //                 {
    //                     "type": "view",
    //                     "name": "积分",
    //                     "url": "http://djrivt.natappfree.cc/about"
    //                 },
    //                 {
    //                     "type": "click",
    //                     "name": "我的订单",
    //                     "key": "myorder"
    //                 }
    //             ]
    //         },
    //         {
    //             "type": "click",
    //             "name": "学知识",
    //             "key": "learnKnowleage"
    //         },
    //
    //     ]
    // }
  }
};
</script>

<style lang="less" scoped></style>
