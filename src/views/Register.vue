<template>
  <div class="register">
    <div class="c-r">
      <h1>注册</h1>
      <div class="item">
        <label for="loginName">
          <img src="/images/icons/userName.png" alt="username-img">
        </label>
        <input type="text" id="loginName" v-model="loginName">
      </div>
      <div class="item">
        <label for="password">
          <img src="/images/icons/password.png" alt="password-img">
        </label>
        <input type="password" id="password" v-model="password">
      </div>
      <div class="item">
        <label for="checkpassword">
          <img src="/images/icons/checkpassword.png" alt="checkpassword-img">
        </label>
        <input type="password" id="checkpassword" v-model="checkpassword">
      </div>
      <div class="item">
        <label for="email">
          <img src="/images/icons/email.png" alt="email-img">
        </label>
        <input type="email" id="email" v-model="email">
      </div>
      <div class="item">
        <label for="phone">
          <img src="/images/icons/phone.png" alt="phone-img">
        </label>
        <input type="phone" id="phone" v-model="phone">
      </div>
      <div class="item">
        <label for="input">
          <img src="/images/icons/yzm.png" alt="yzm-img">
        </label>
        <input type="text" id="input" value v-model="yzm" @blur="inspect">
        <input type="button" id="code" @click="create" v-if="!flag">
        <span v-if="flag">
          <img
            class="isPass"
            src="/images/icons/yes.png"
            alt="yzm Pass"
            style="width:16px;height:16px;"
          >
        </span>
      </div>
      <div class="item">
        <button id="btn-registe" @click="register">注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</button>
      </div>
    </div>
  </div>
</template>
<script>
import { createCode, validate } from "../assets/js/captcha";

export default {
  name: "register",
  components: {},
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
        this.isPassUrl = "/images/icons/yes.png";
        this.isPassAlt = "yzm Pass";
        this.$(input).attr("readonly", "readonly");
      } else {
        this.$("#input").val("");
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
        alert("验证码有误");
        this.$("#input").val("");
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
.register {
  height: 571px;
  display: flex;
  background-color: #e9eef2;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.l-bgimg {
  width: 500px;
  height: 470px;
}

.c-r {
  border: 2px solid transparent;
  border-radius: 10px;
  padding: 10px;
  background-color: #fff;
  align-items: center;
  color: #000;
  font-weight: 700;
  -webkit-user-select: none;
}

.c-r .item:nth-child(-n + 7) input {
  width: 180px;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  margin-right: 20px;
  padding: 0 0 0 10px;
  outline: none;
  border: 0;
  border-bottom: 1px solid #999;
  text-align: center;
  caret-color: #999;
}

input:-webkit-autofill {
  box-shadow: 0 0 0px 1000px white inset !important;
}

.c-r h1 {
  padding-left: 10px;
  color: #000;
}

.c-r .item {
  height: 30px;
  line-height: 30px;
  margin: 20px 0;
  padding-left: 10px;
  font-size: 16px;
  display: flex;
}

.c-r .item label {
  width: 80px;
  line-height: 34px;
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

#code {
  border: none;
  outline: none;
  width: 50px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  padding: 0;
  background-color: #000;
  color: #fff;
  font-weight: 700;
}

#btn-check {
  border: none;
  outline: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  line-height: 30ox;
  text-align: center;
  background-color: #000;
  font-weight: 700;
  color: #fff;
  padding: 0;
  margin: 0;
}

.c-r .item:last-of-type {
  text-align: center;
}

.isPass {
  width: 16px;
  height: 16px;
  margin: 0 27px;
}
</style>
