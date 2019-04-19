<template>
  <div class="discount">
    <ul>
      <li v-for="(d, i) in discountGoods" :key="i">
        <img :src="d.imgUrl" :alt="d.commodityCode">
        <!-- <span>{{d.name}}</span> -->
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Discount",
  data() {
    return {
      discountGoods: []
    };
  },
  mounted() {
    this.getDiscount();
  },
  methods: {
    getDiscount() {
      var vm = this;
      this.axios.get("/api/getDiscount").then(function(res) {
        vm.discountGoods = res.data.result;
      });
    }
  }
};
</script>
<style scoped>
ul,
li {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
.discount ul {
  width: 400px;
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  flex-wrap: wrap;
}
.discount ul li {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.discount ul li img {
  width: 200px;
  height: 150px;
}
</style>
