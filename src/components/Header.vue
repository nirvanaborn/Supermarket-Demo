<template>
  <div class="header">
    <router-link to="/">
      <img src="@/assets/logo.png" alt="logo">
    </router-link>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "Header"
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
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
