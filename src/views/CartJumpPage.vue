<template>
  <div class="cartjumppage">
    <Header></Header>
    <span>成功加入购物车，请转到购物车进行结算，或继续挑选喜欢的商品</span>
    <button @click="showCart">查看购物车</button>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "CartJumpPage",
  components: {
    Header,
    Footer
  },
  methods: {
    showCart() {
      this.$router.push({ path: "/shoppingcart" });
    }
  }
};
</script>
<style scoped>
</style>
