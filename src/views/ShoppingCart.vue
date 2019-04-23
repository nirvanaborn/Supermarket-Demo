<template>
  <div class="shoppingCart">
    <Header></Header>i am shoppingCart page
    <router-link to="/" v-if="!orders.length">购物车是空的，快去购物吧</router-link>
    <table v-if="orders.length">
      <tr>
        <th>
          <input type="checkbox" v-model="checked" @click="chooseAll">
        </th>
        <th>订单编号</th>
        <th>商品名称</th>
        <th>数量</th>
        <th>总价</th>
        <th>状态</th>
        <th>操作</th>
      </tr>
      <tr v-for="(o, i) in orders" :key="i">
        <td>
          <input type="checkbox" v-model="checkedList" :value="o">
        </td>
        <td>{{o.productId}}</td>
        <td>{{o.productName}}</td>
        <td>
          <button>+</button>
          {{o.number}}
          <button>-</button>
        </td>
        <td>{{o.totalSum.toFixed(2)}}</td>
        <td>{{o.status}}</td>
        <td>
          <a href="javascript:void(0);">删除</a>
        </td>
      </tr>
    </table>
    <button @click="payment" v-if="orders.length">结算</button>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { setCookie, getCookie, delCookie } from "../assets/js/cookie";
export default {
  name: "ShoppingCart",
  data() {
    return {
      orders: [],
      checked: false,
      checkedList: []
    };
  },
  components: {
    Header,
    Footer
  },
  mounted() {
    this.axios
      .get("/api/getOrders", { params: { userName: getCookie("loginName") } })
      .then(res => {
        this.orders = res.data.result;
      });
  },
  watch: {
    checkedList(oldVal, newVal) {
      if (this.checkedList.length === this.orders.length) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    }
  },
  methods: {
    payment() {
      var vm = this;
      console.log(this.checkedList);
      if (this.checkedList.length === 0) {
        alert("请选择添加的商品");
        return;
      }
      if (confirm("确认订单并付款?")) {
        this.axios.post("/api/payment", vm.checkedList).then(res => {
          if (res.data.code == 200) {
            alert(res.data.message);
            vm.$router.push({ path: "/shoppingcart" });
          }
        });
      }
    },
    chooseAll() {
      if (this.checked) {
        this.checkedList = [];
      } else {
        this.checkedList = [];
        this.orders.forEach(item => {
          this.checkedList.push(item);
        });
      }
    }
  }
};
</script>
<style scoped>
table,
td,
th {
  border: 1px solid #000;
}
</style>
