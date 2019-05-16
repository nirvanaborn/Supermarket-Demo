<template>
  <div class="header">
    <router-link :to="logoUrl" class="logo" :class="{'animated swing':isAdd}">E购</router-link>
    <div class="searchbox" v-if="flag">
      <input type="text" id="search-input">
      <button @click="search" id="search-btn">Go</button>
    </div>
    <div class="user-control" v-if="flag" @mouseenter="show" @mouseleave="hide">
      <router-link :to="loginOrpersonalSpaceUrl">{{username}}</router-link>
      <div class="down" style="display:none;">
        <span @click="quit" v-if="username!='您好，请登录'">注销</span>
        <router-link to="/orders">订单</router-link>
        <router-link to="/shoppingcart">购物车</router-link>
      </div>
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
      flag: false,
      isAdd: false,
      logoUrl: "/"
    };
  },
  mounted() {
    this.setLogo();
    let url = window.location.href;
    url = "/" + url.split("/").pop();
    if (!getCookie("loginName")) {
      if (url != "/register") {
        console.log("请先登录");
        this.loginOrpersonalSpaceUrl = "/login";
        this.$router.push({ path: "/login" });
        this.logoUrl = "/login";
      }
    } else {
      if (url == "/register") {
        console.log("请注册");
        this.flag = false;
        return;
      }
      this.username = getCookie("loginName");
      if (this.username != "admin") {
        this.loginOrpersonalSpaceUrl = "/personspace";
        this.flag = !this.flag;
        this.logoUrl = "/";
        return;
      }
      this.loginOrpersonalSpaceUrl = "/managespace";
      this.flag = !this.flag;
      this.logoUrl = "/managepage";
      this.$router.push({ path: "/managepage" });
    }
  },
  methods: {
    quit() {
      var vm = this;
      if (getCookie("loginName")) {
        delCookie("loginName");
        console.log("cookie删除成功");
        this.flag = !this.flag;
        vm.$router.push({ path: "/login" });
      }
    },
    setLogo() {
      var vm = this;
      setInterval(function() {
        vm.isAdd = !vm.isAdd;
      }, 2000);
    },
    search() {
      var data = this.$(".searchbox input").val();
      this.axios.get("/api/search", { params: { data } }).then(res => {
        if (res.data.code != 200) {
          alert(res.data.message);
          return;
        }
        var data = this.$.parseJSON(JSON.stringify(res.data.result));
        this.$router.push({ path: "/list", query: { data } });
      });
    },
    show() {
      this.$(".down")
        .filter(":not(:animated)")
        .slideDown();
    },
    hide() {
      this.$(".down").stop();
      this.$(".down")
        .filter(":not(:animated)")
        .slideUp();
    }
  },
  destroyed() {
    this.hide();
  }
};
</script>
<style scoped>
@import "../assets/css/animate.css";
a {
  text-decoration: none;
}
a:visited {
  color: #fff;
}
.header {
  z-index: 10;
  width: 100%;
  height: 50px;
  line-height: 50px;
  margin: 0 auto;
  padding-left: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #000;
}
.logo {
  font-size: 20px;
  font-weight: 700;
}
.searchbox {
  display: flex;
  align-items: center;
}
#search-input {
  position: relative;
  width: 300px;
  height: 25px;
  border: 1px solid #000;
  text-align: center;
  border-radius: 15px;
  font-size: 16px;
  color: #000;
  caret-color: #999;
}
#search-btn {
  position: relative;
  width: 50px;
  height: 25px;
  line-height: 25px;
  left: -50px;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  background-color: #000;
  border: 1px solid #000;
  border-right: 2px solid #fff;
  border-radius: 15px;
}
.down {
  position: absolute;
  top: 48px;
  right: 25px;
  width: 100px;
  background-color: #000;
  text-align: center;
  color: #fff;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}
.down span,
.down a {
  display: block;
}
.user-control {
  width: 50px;
  text-align: center;
  margin-right: 50px;
  font-weight: 700;
}
</style>
