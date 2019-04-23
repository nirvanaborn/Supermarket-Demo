<template>
  <div class="home">
    <Header></Header>
    <div class="main">
      <div class="m-t">
        <Side @sendList="sendFromSide"></Side>
        <RotationImg></RotationImg>
        <Discount></Discount>
      </div>

      <div class="item" v-for="(g, i) in goods" :key="i">
        <h1>{{g.typeName}}</h1>
        <div class="item-content">
          <div v-for="(item,i) in g.items" :key="i" class="item-c-msg">
            <span>{{item.name}}</span>
            <router-link :to="{path:'/detail',query:{id:item._id.toString()}}">
              <img :src="item.imgUrl" :alt="item.commodityCode">
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import RotationImg from "@/components/RotationImg.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Side from "@/components/Side.vue";
import Discount from "@/components/Discount.vue";

export default {
  name: "home",
  data() {
    return {
      lists: [],
      goods: []
    };
  },
  components: {
    RotationImg,
    Header,
    Footer,
    Side,
    Discount
  },
  mounted() {
    this.getGoods();
  },
  methods: {
    getGoods() {
      var vm = this;
      this.axios.get("/api/getGoods").then(function(res) {
        vm.goods = res.data.result0;
        console.log(vm.goods);
      });
    },
    sendFromSide(data) {
      this.lists = data;
      console.log(this.lists);
    }
  }
};
</script>
<style scoped>
.main {
  width: 1519px;
  margin: 0 auto;
}
.m-t {
  display: flex;
  justify-content: space-around;
}
.user-control {
  padding: 0 50px;
}
.item {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.item .item-content {
  width: 800px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.item-c-msg {
  width: 150px;
}
.item-c-msg img {
  width: 150px;
  height: 130px;
}
</style>
