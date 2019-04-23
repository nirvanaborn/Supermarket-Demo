<template>
  <div class="personspace">
    <Header></Header>
    <router-link to="/shoppingcart">查看购物车</router-link>
    <router-link to="/orders">查看订单</router-link>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "PersonSpace",
  components: {
    Header,
    Footer
  }
};
</script>
<style scoped>
</style>
