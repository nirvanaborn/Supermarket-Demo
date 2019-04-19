<template>
  <div class="login">
    <Header></Header>
    <div class="container">
      <div class="c-r">
        <h1>用户登录</h1>
        <div class="item">
          <label for="loginName">用户名：</label>
          <input type="text" id="loginName" v-model="loginName">
        </div>
        <div class="item">
          <label for="password">密&nbsp;&nbsp;&nbsp;码：</label>
          <input type="password" id="password" v-model="password">
        </div>
        <div class="item">
          <a href="javascript:void(0);">忘记密码</a>
          <router-link to="/register">立即注册</router-link>
        </div>
        <div class="item">
          <button id="btn-login" @click="login">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</button>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import { getCookie, setCookie } from "../assets/js/cookie";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "login",
  components: {
    Header,
    Footer
  },
  data() {
    return {
      loginName: "",
      password: ""
    };
  },
  mounted() {
    if (getCookie("loginName")) {
      this.$router.push({ path: "/" });
    }
  },
  methods: {
    login() {
      var vm = this;
      if (!this.loginName || !this.password) {
        alert("请输入用户名或密码");
        return;
      }
      let data = {
        loginName: this.loginName,
        password: this.password
      };
      this.axios.post("/api/login", data).then(function(res) {
        if (res.data.code != 200) {
          alert(res.data.message);
          return;
        }
        setCookie("loginName", vm.loginName, 1000 * 60);
        vm.$router.push({ path: "/" });
      });
    }
  }
};
</script>
<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  font-size: 14px;
  box-sizing: border-box;
  height: 100%;
}

a {
  text-decoration-line: none;
  color: #000;
}

.login {
  height: 721px;
}

.container {
  background-color: #99cc99;
  height: calc(100% - 175px);
  display: flex;
  justify-content: center;
  align-items: center;
}

.c-r {
  width: 300px;
  height: 300px;
  border: 2px solid transparent;
  border-radius: 10px;
  padding: 10px;
  background-color: #fff;
  align-items: center;
  color: #99cc99;
  font-weight: 700;
  -webkit-user-select: none;
}

.c-r h1 {
  padding-left: 10px;
  color: #99cc99;
}

.c-r .item {
  margin: 20px 0;
  padding-left: 10px;
  font-size: 16px;
}

.c-r .item input {
  width: 180px;
  height: 30px;
  padding-left: 10px;
  line-height: 30px;
  font-size: 16px;
  outline: none;
  border: 1px solid #99cc99;
}

.c-r .item:nth-of-type(3) {
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
}

.c-r .item:nth-of-type(3) a {
  display: block;
  margin: 0 5px;
  color: #99cc99;
}

.c-r .item:nth-of-type(4) {
  display: flex;
  justify-content: center;
}

.c-r button {
  color: #fff;
  width: 200px;
  height: 30px;
  text-align: center;
  background-color: #99cc99;
  border: 1px solid #ccc;
  border-radius: 14px;
  outline: none;
  margin: 0 auto;
  font-weight: 700;
}
</style>
