<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div class="header">
      <router-link :to="loginOrpersonalSpaceUrl">{{username}}</router-link>
    </div>
    <div class="main">
      <div class="m-t">
        <div class="side">我是侧边导航栏</div>
        <div class="rotationImg">我是轮播图</div>
        <RotationImg></RotationImg>
        <div class="discount">我是右侧限时折扣</div>
      </div>
      <div class="item">A</div>
      <div class="item">B</div>
      <div class="item">C</div>
      <div class="item">D</div>
    </div>
    <div class="footer">我是底部</div>
    <button @click="quit">注销</button>
  </div>
</template>

<script>
// @ is an alias to /src
import { setCookie, getCookie, delCookie } from "../assets/js/cookie";
import RotationImg from "@/components/RotationImg.vue";

export default {
  name: "home",
  data() {
    return {
      username: "您好，请登录",
      loginOrpersonalSpaceUrl: ""
    };
  },
  components: {
    RotationImg
  },
  mounted() {
    if (!getCookie("loginName")) {
      console.log("请先登录");
      this.loginOrpersonalSpaceUrl = "/login";
      // this.$router.push({ path: "/login" });
    } else {
      this.username = getCookie("loginName");
      this.loginOrpersonalSpaceUrl = "/personspace";
    }
  },
  methods: {
    quit() {
      delCookie("loginName");
      console.log("cookie删除成功");
      setTimeout(function() {
        location.reload();
      }, 3000);
    }
  }
};
</script>
