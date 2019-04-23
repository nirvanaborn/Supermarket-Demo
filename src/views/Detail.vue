<template>
  <div class="detail">
    <Header></Header>
    <span>商品名称：{{product.name}}</span>
    <br>
    <span>单价：{{product.unitPrice}}￥</span>
    <br>
    <span>库存：{{product.number}}</span>
    <br>
    <img :src="product.imgUrl" :alt="product.name">
    <div>
      <span>
        购买数量：
        <input type="text" id="number" value="1">
        <button @click="plus">+</button>
        <button @click="minus">-</button>
      </span>
      <button @click="addToShoppingCart">加入购物车</button>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { setCookie, getCookie, delCookie } from "../assets/js/cookie";
import { randomString } from "../assets/js/random";
export default {
  name: "Detail",
  data() {
    return {
      id: this.$route.query.id,
      product: []
    };
  },
  components: {
    Header,
    Footer
  },
  mounted() {
    var Id = this.id;
    this.axios.get(`/api/detail?id="${Id}"`).then(res => {
      this.product = res.data.result[0];
    });
  },
  methods: {
    plus() {
      let x = parseInt(this.$("#number").val());
      if (x >= this.product.number) {
        return;
      }
      x++;
      this.$("#number").val(x);
    },
    minus() {
      let x = parseInt(this.$("#number").val());
      if (x <= 0) {
        return;
      }
      x--;
      this.$("#number").val(x);
    },
    addToShoppingCart() {
      let data = {
        userName: getCookie("loginName"),
        number: parseInt(this.$("#number").val()),
        productName: this.product.name,
        unitPrice: this.product.unitPrice,
        productId: randomString(32),
        status: "未付款"
      };
      var judge = confirm("确定添加到购物车?");
      if (judge) {
        this.axios.post("/api/addToCart", data).then(res => {
          confirm(res.data.message);
          this.$router.push({ path: "/cartjumppage" });
        });
      }
    }
  }
};
</script>
<style scoped>
</style>
