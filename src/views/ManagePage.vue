<template>
  <div class="managepage">
    <ul>
      <li @click="isShow = true">显示过期商品</li>
      <li @click="isShow = false">显示全部商品</li>
    </ul>
    <ul v-show="!isShow">
      <li v-for="(g, i) in goods" :key="i">
        <span>{{g.typeName}}</span>
        <table border="1">
          <tr>
            <th>商品名称</th>
            <th>库存</th>
            <th>单价(元)</th>
            <th>是否促销</th>
            <th>商品种类</th>
            <th>商品编码</th>
            <th>是否过期</th>
          </tr>
          <tr v-for="(gi, j) in g.items" :key="j">
            <td>{{gi.name}}</td>
            <td>{{gi.number}}</td>
            <td>{{gi.unitPrice}}</td>
            <td>{{gi.discount}}</td>
            <td>{{gi.category}}</td>
            <td>{{gi.commodityCode}}</td>
            <td>{{handleDate(gi.productionDate,gi.shelfLife)}}</td>
          </tr>
        </table>
      </li>
    </ul>
    <ul v-show="isShow">
      <li>
        <table border="1">
          <tr>
            <th>商品名称</th>
            <th>库存</th>
            <th>单价(元)</th>
            <th>是否促销</th>
            <th>商品种类</th>
            <th>商品编码</th>
            <th>是否过期</th>
            <th>操作</th>
          </tr>
          <tr v-for="(odg, j) in outDateGoods" :key="j">
            <td>{{odg.name}}</td>
            <td>{{odg.number}}</td>
            <td>{{odg.unitPrice}}</td>
            <td>{{odg.discount}}</td>
            <td>{{odg.category}}</td>
            <td>{{odg.commodityCode}}</td>
            <td>
              <span class="isOutDate">{{handleDate(odg.productionDate,odg.shelfLife)}}</span>
            </td>
            <td>
              <!-- <button>删除</button>
              <button>更新货物信息</button>-->
              <button @click="updateOutDate(odg)">过期更新</button>
            </td>
          </tr>
        </table>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "ManagePage",
  data() {
    return {
      goods: [],
      isShow: true,
      outDateGoods: []
    };
  },
  methods: {
    getGoods() {
      this.axios.get("/api/getGoods").then(res => {
        this.goods = res.data.result0;
        this.getOutDateGoods();
      });
    },
    getOutDateGoods() {
      this.goods.forEach((g, i) => {
        g.items.forEach((gi, j) => {
          if (this.handleDate(gi.productionDate, gi.shelfLife) === "已过期") {
            this.outDateGoods.push(gi);
            return;
          }
        });
      });
    },
    updateOutDate(msg) {
      let date = new Date();
      let y = date.getFullYear().toString();
      let m = (date.getMonth() + 1).toString();
      let d = date.getDate().toString();
      let newDate = y + "-" + m + "-" + d;
      let data = {
        id: msg._id,
        newDate
      };
      this.axios.post("/api/updateOutDate", { data }).then(res => {
        if (res.data.code != 200) {
          alert(res.data.message);
          return;
        }
        window.location.reload();
      });
    }
  },
  mounted() {
    this.getGoods();
  }
};
</script>
<style scoped>
.managepage {
  display: flex;
}
</style>
