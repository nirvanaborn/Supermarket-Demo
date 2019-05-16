<template>
  <div class="changePersonalInfo">
    <label for="loginName">用户名：</label>
    <input type="text" :value="info.loginName" id="loginName" name="loginName">
    <br>
    <label for="email">修改邮箱：</label>
    <input type="email" :value="info.email" id="email" name="email">
    <br>
    <label for="password">修改密码：</label>
    <input type="password" :value="info.password" id="password" name="password">
    <br>
    <label for="phone">修改手机：</label>
    <input type="phone" :value="info.phone" id="phone" name="phone">
    <!-- <div style="width:50px;height:50px;border-radius:50%;overflow:hidden;display:flex;justify-content:center;align-item:center;"> -->
      <img :src="headUrl" style="width:50px;height:50px;">
      <input type="file" accept="image/*" @change="handleFile" class="hiddenInput"/>
    <!-- </div> -->
    <button @click="submitNewInfo">提交</button>
  </div>
</template>
<script>
import { setCookie, getCookie, delCookie } from "../assets/js/cookie";
export default {
  name: "ChangePersonalInfo",
  data() {
    return {
      oldUserName: "",
      info: [],
      headUrl:""
    };
  },
  mounted() {
    this.axios
      .get("/api/getPersonInfo", {
        params: { userName: getCookie("loginName") }
      })
      .then(res => {
        this.info = res.data.result[0];
        this.oldUserName = res.data.result[0].loginName;
        this.headUrl = res.data.result[0].headUrl;
      });
  },
  methods: {
    submitNewInfo() {
      let data = {
        oldUserName: this.oldUserName,
        userName: this.$("#loginName").val(),
        email: this.$("#email").val(),
        password: this.$("#password").val(),
        phone: this.$("#phone").val()
      };
      this.axios.post("/api/submitNewInfo", data).then(res => {
        console.log(res);
      });
    },
    uploadHeadImg: function () {
      this.$.querySelector('.hiddenInput').click()
    },
    handleFile: function (e) {
      let $target = e.target || e.srcElement
      let file = $target.files[0]
      var reader = new FileReader()
      reader.onload = (data) => {
        let res = data.target || data.srcElement
        this.headUrl = res.result
        console.log(this.headUrl)
      }
      reader.readAsDataURL(file)
    },
  }
};
</script>
<style scoped>
</style>
