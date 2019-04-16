<template>
  <div class="home">
    <Header :msgUrl="loginOrpersonalSpaceUrl" :msgUsername="username" :quit="quit">
      <div class="user-control">
        <router-link :to="loginOrpersonalSpaceUrl">{{username}}</router-link>
        <button @click="quit" v-if="username!='您好，请登录'">注销</button>
      </div>
    </Header>
    <div class="main">
      <div class="m-t">
        <div class="side">我是侧边导航栏</div>
        <RotationImg></RotationImg>
        <div class="discount">我是右侧限时折扣</div>
      </div>
      <div class="item">A</div>
      <div class="item">B</div>
      <div class="item">C</div>
      <div class="item">D</div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import { setCookie, getCookie, delCookie } from "../assets/js/cookie";
import RotationImg from "@/components/RotationImg.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "home",
  data() {
    return {
      username: "您好，请登录",
      loginOrpersonalSpaceUrl: ""
    };
  },
  components: {
    RotationImg,
    Header,
    Footer
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
      if (getCookie("loginName")) {
        delCookie("loginName");
        console.log("cookie删除成功");
        setTimeout(function() {
          location.reload();
        }, 1000);
      }
    }
  }
};
</script>
<style scoped>
.main {
  width: 1536px;
  margin: 0 auto;
}
</style>
