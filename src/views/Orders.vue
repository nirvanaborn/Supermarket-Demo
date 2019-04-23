<template>
  <div class="orders">
    <Header></Header>

    <Footer></Footer>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { setCookie, getCookie, delCookie } from "../assets/js/cookie";
export default {
  name: "Orders",
  data() {
    return {
      orders: []
    };
  },
  components: {
    Header,
    Footer
  },
  mounted() {
    var vm = this;
    console.log(getCookie("loginName"))
    this.axios.get("/api/getAllOrders", {
      params: { userName: getCookie("loginName") }
    }).then((res)=>{
        vm.orders = res.data.result;
        console.log(vm.orders)
    });
  }
};
</script>
<style scoped>
</style>
