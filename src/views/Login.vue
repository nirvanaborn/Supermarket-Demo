<template>
  <div class="login">
    <div class="c-r">
      <h1>登录</h1>
      <div class="item">
        <label for="loginName">
          <img src="/images/icons/userName.png" alt="username-img">
        </label>
        <input type="text" id="loginName" v-model="loginName" spellcheck="false">
      </div>
      <div class="item">
        <label for="password">
          <img src="/images/icons/password.png" alt="password">
        </label>
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
</template>
<script>
import { getCookie, setCookie } from "../assets/js/cookie";
export default {
  name: "login",
  components: {},
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
        location.reload();
      });
    }
  }
};
</script>
<style scoped>
a:visited {
  color: #fff;
}

.login {
  width: 100%;
  height: 571px;
  background-color: #e9eef2;
  display: flex;
  justify-content: center;
  align-items: center;
}

.c-r {
  width: 400px;
  height: 400px;
  border: 2px solid transparent;
  border-radius: 10px;
  padding: 10px;
  background-color: #fff;
  align-items: center;
  color: #000;
  font-weight: 700;
  -webkit-user-select: none;
}

.c-r h1 {
  padding-left: 10px;
  color: #000;
}

.c-r .item {
  margin: 35px 0;
  padding-left: 10px;
  font-size: 16px;
  height: 40px;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.c-r .item label {
  display: flex;
  align-items: center;
}

.c-r .item input {
  width: 250px;
  height: 30px;
  margin-right: 50px;
  line-height: 30px;
  font-size: 16px;
  outline: none;
  border: 0;
  border-bottom: 1px solid #999;
  text-align: center;
  caret-color: #999;
}

input:-webkit-autofill {
  box-shadow: 0 0 0px 1000px white inset !important;
}

.c-r .item:nth-of-type(3) {
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
}

.c-r .item:nth-of-type(3) a {
  display: block;
  margin: 0 5px;
  color: #000;
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
  background-color: #000;
  border: 1px solid #000;
  border-radius: 14px;
  outline: none;
  margin: 0 auto;
  font-weight: 700;
}
@media screen and (max-width: 992px) {
  .c-r {
    background-color: green;
  }
}
@media screen and (max-width: 768px) {
  .c-r {
    background-color: red;
  }
}
</style>
