<template>
  <div class="header">
    <router-link to="/">
      <img src="@/assets/logo.png" alt="logo">
    </router-link>
    <div class="user-control" v-if="flag">
      <router-link :to="loginOrpersonalSpaceUrl">{{username}}</router-link>
      <button @click="quit" v-if="username!='您好，请登录'">注销</button>
    </div>
  </div>
</template>
<script>
import { setCookie, getCookie, delCookie } from "../assets/js/cookie";

export default {
  name: "Header",
  data() {
    return {
      username: "您好，请登录",
      loginOrpersonalSpaceUrl: "",
      flag: false
    };
  },
  mounted() {
    if (!getCookie("loginName")) {
      console.log("请先登录");
      this.loginOrpersonalSpaceUrl = "/login";
      this.$router.push({ path: "/login" });
    } else {
      this.username = getCookie("loginName");
      this.loginOrpersonalSpaceUrl = "/personspace";
      this.flag = !this.flag;
    }
  },
  methods: {
    quit() {
      var vm = this;
      if (getCookie("loginName")) {
        delCookie("loginName");
        console.log("cookie删除成功");
        setTimeout(function() {
          vm.$router.push({path:"/login"})
        }, 500);
      }
    }
  }
};
</script>
<style scoped>
a {
  text-decoration: none;
}
a:visited {
  color: #99cc99;
}
a:hover {
  color: #f00;
}
.header {
  width: 1536px;
  height: 95px;
  margin: 0 auto;
  padding-left: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
