<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button @click="quit">注销</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { setCookie, getCookie, delCookie } from "../assets/js/cookie";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  mounted() {
    if (!getCookie("loginName")) {
      this.$router.push({ path: "/login" });
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
