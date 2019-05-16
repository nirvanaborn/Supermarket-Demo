<template>
  <div class="orders">
    <span v-if="this.orders.length == 0">
      暂无订单信息，请去<router-link to="/">购物</router-link>吧
    </span>
    <table v-if="this.orders.length != 0">
      <tr>
        <th>订单号</th>
        <th>商品名称</th>
        <th>数量</th>
        <th>总价</th>
        <th>状态</th>
        <th>操作</th>
      </tr>
      <tr v-for="(os, i) in orders" :key="i">
        <td>{{os.productId}}</td>
        <td>{{os.productName}}</td>
        <td>{{os.number}}</td>
        <td>{{os.totalSum.toFixed(2)}}</td>
        <td>{{os.status}}</td>
        <td>
          <button @click="deleteOrder(i)">删除</button>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import { setCookie, getCookie, delCookie } from "../assets/js/cookie";
export default {
  name: "Orders",
  data() {
    return {
      orders: []
    };
  },
  components: {},
  mounted() {
    var vm = this;
    // console.log(getCookie("loginName"));
    this.axios
      .get("/api/getAllOrders", {
        params: { userName: getCookie("loginName") }
      })
      .then(res => {
        vm.orders = res.data.result;
        // console.log(vm.orders.length);
      });
  },
  methods: {
    deleteOrder(i) {
      var vm = this;
      if (confirm("确认删除订单?")) {
        this.axios
          .post("/api/deleteOrder", { productId: vm.orders[i].productId })
          .then(res => {
            alert(res.data.message);
            location.reload();
          });
      }
    }
  }
};
</script>
<style scoped>
</style>
