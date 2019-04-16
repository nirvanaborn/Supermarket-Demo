<template>
  <div class="register">
    <Header></Header>
    <div class="container">
      <div class="c-r">
        <h1>用户注册</h1>
        <div class="item">
          <label for="loginName">用户名：</label>
          <input type="text" id="loginName" v-model="loginName">
        </div>
        <div class="item">
          <label for="password">密&nbsp;&nbsp;&nbsp;码：</label>
          <input type="password" id="password" v-model="password">
        </div>
        <div class="item">
          <label for="checkpassword">确认密码：</label>
          <input type="password" id="checkpassword" v-model="checkpassword">
        </div>
        <div class="item">
          <label for="email">邮箱：</label>
          <input type="email" id="email" v-model="email">
        </div>
        <div class="item">
          <label for="phone">手机：</label>
          <input type="phone" id="phone" v-model="phone">
        </div>
        <div class="item">
          <label for="yzm">验证码：</label>
          <input type="text" id="input" value v-model="yzm">
          <input type="button" id="code" @click="create">
          <input type="button" id="btn-check" value="验" @click="inspect">
        </div>
        <div class="item">
          <button id="btn-registe" @click="register">注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</button>
        </div>
      </div>
      <img src="../../public/images/flower.png" alt="left background-image" class="l-bgimg">
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import { createCode, validate } from "../assets/js/captcha";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "register",
  components: {
    Header,
    Footer
  },
  data() {
    return {
      loginName: "",
      password: "",
      checkpassword: "",
      email: "",
      phone: "",
      yzm: "",
      flag: false
    };
  },
  mounted() {
    createCode();
  },
  methods: {
    create() {
      createCode();
    },
    inspect() {
      validate();
      let a = this.$(input)
        .val()
        .toLowerCase();
      let b = this.$(code)
        .val()
        .toLowerCase();
      console.log(this.yzm);
      if (a == b) {
        this.flag = !this.flag;
      }
    },
    register() {
      var vm = this;
      if (!this.loginName || !this.password) {
        alert("请输入用户名或密码");
        return;
      }
      if (!this.checkpassword) {
        alert("请再次输入密码");
        return;
      }
      if (this.password != this.checkpassword) {
        alert("两次输入密码不一致");
        return;
      }
      if (!this.email) {
        alert("请输入邮箱");
        return;
      }
      if (!this.phone) {
        alert("请输入手机号");
        return;
      }
      if (!this.yzm) {
        alert("请输入验证码");
        return;
      }
      if (!this.flag) {
        alert("请确认验证码");
        return;
      }
      let data = {
        loginName: this.loginName,
        password: this.password,
        email: this.email,
        phone: this.phone
      };
      this.axios
        .post("/api/register", data)
        .then(function(res) {
          if (res.data.code != 200) {
            alert(res.data.message);
            this.$(".register input:lt(5)").val("");
            return;
          }
          vm.$router.push({ path: "/login" });
        })
        .catch(function(error) {
          console.log(error);
          return;
        });
    }
  }
};
</script>
<style scoped>
a {
  text-decoration-line: none;
  color: #000;
}

.register{
  height: 721px;
  display: flex;
  flex-direction: column;
}

.container {
  background-color: #99cc99;
  height: calc(100% - 180px);
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}

.l-bgimg {
  width: 500px;
  height: 470px;
  position: absolute;
  left: 250px;
}

.c-r {
  border: 2px solid transparent;
  border-radius: 10px;
  padding: 10px;
  background-color: #fff;
  margin-right: 200px;
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

#code {
  border: none;
  outline: none;
  width: 50px;
  text-align: center;
  height: 25px;
  line-height: 25px;
}

#btn-check {
  border: none;
  outline: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  line-height: 30ox;
  text-align: center;
  background-color: #99cc99;
  font-weight: 700;
  color: #fff;
}

.c-r .item:last-of-type {
  text-align: center;
}

.footer {
  padding: 10px 0;
  height: 60px;
  text-align: center;
  color: #99cc99;
  font-weight: 700;
}
</style>
