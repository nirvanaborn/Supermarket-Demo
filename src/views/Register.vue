<template>
  <div>
    <div class="header">
      <img src="../assets/logo.png" alt="logo" id="logo">
    </div>
    <div class="container">
      <div class="c-r">
        <h1>用户注册</h1>
        <form action>
          <div class="item">
            <label>用户类型：</label>
            <input type="radio" name="user-type" id="admin">
            <label for="admin">超市管理员</label>
            <input type="radio" name="user-type" id="personal-user">
            <label for="personal-user">个人用户</label>
          </div>
          <div class="item">
            <label for="loginName">用户名：</label>
            <input type="text" id="loginName">
          </div>
          <div class="item">
            <label for="password">密&nbsp;&nbsp;&nbsp;码：</label>
            <input type="password" id="password">
          </div>
          <div class="item">
            <label for="password">确认密码：</label>
            <input type="password" id="password">
          </div>
          <div class="item">
            <label for="email">邮箱：</label>
            <input type="email" id="email">
          </div>
          <div class="item">
            <label for="phone">手机：</label>
            <input type="phone" id="phone">
          </div>
          <div class="item">
            <label for="yzm">验证码：</label>
            <input type="text" id="input" value>
            <input type="button" id="code" onclick="createCode()">
            <input type="button" id="btn-check" value="验" onclick="validate()">
          </div>

          <div class="item">
            <button id="btn-registe">注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</button>
          </div>
        </form>
      </div>
      <img src="../../public/images/flower.png" alt="left background-image" class="l-bgimg">
    </div>
    <div class="footer">
      By：North University of China 郭继隆
      <br>email：1846055905@qq.com
      <br>phone：18306897726
    </div>
  </div>
</template>
<script>
export default {
    name:'register'
};
</script>
<style scoped>
</style>
