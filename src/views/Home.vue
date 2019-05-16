<template>
  <div class="home">
    <div class="m-t">
      <Side @sendList="sendFromSide"></Side>
      <RotationImg></RotationImg>
      <Discount></Discount>
    </div>

    <div class="item" v-for="(g, i) in goods" :key="i">
      <div class="middle-line">
        <span class="line-text">{{g.typeName}}</span>
      </div>
      <div class="item-content">
        <div v-for="(item,i) in g.items" :key="i" class="item-c-msg">
          <router-link :to="{path:'/detail',query:{id:item._id.toString()}}">
            <img :src="item.imgUrl" :alt="item.commodityCode" :title="item.name">
          </router-link>
          <span class="good-name" :title="item.name">{{item.name}}</span>
          <span class="good-description">{{item.description}}</span>
          <span class="good-price">￥{{item.unitPrice}}</span>
          <span
            class="outDate"
            v-if="handleDate(item.productionDate,item.shelfLife) == '已过期'"
          >{{handleDate(item.productionDate,item.shelfLife)}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RotationImg from "@/components/RotationImg.vue";
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
      });
    },
    sendFromSide(data) {
      this.lists = data;
    }
  }
};
</script>
<style scoped>
.home {
  width: 1519px;
  margin: 0 auto;
  padding: 10px 0;
  background-color: #e9eef2;
}
.m-t {
  padding-top: 30px;
  margin-bottom: 50px;
  display: flex;
  justify-content: space-around;
}
.user-control {
  padding: 0 50px;
}
.item {
  width: 1000px;
  margin: 50px auto;
  padding-top: 50px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.middle-line {
  width: 400px;
  margin: 20px auto;
  border-top: 4px solid #000;
  position: relative;
}

.line-text {
  width: 200px;
  height: 50px;
  background: #fff;
  text-align: center;
  line-height: 50px;
  font-size: 25px;
  color: #000;
  font-weight: 700;
  position: absolute;
  top: -25px;
  left: 100px;
}

.item .item-content {
  width: 1000px;
  height: 580px;
  /* margin: 50px; */
  /* background-color: #fff; */
  overflow: hidden;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.item-c-msg {
  width: 180px;
  height: 280px;
  display: flex;
  margin: 0 30px;
  flex-direction: column;
  /* align-items: center; */
  justify-content: space-between;
  padding: 20px;
  position: relative;
}
.item-c-msg img {
  width: 160px;
  height: 160px;
  box-shadow: 15px 10px 20px #999;
}

.good-name {
  overflow: hidden;
  display: -webkit-box;
  font-size: 16px;
  font-weight: 700;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  white-space: normal;
}

.good-price {
  width: 60px;
  font-size: 14px;
  background-color: #e6382f;
  color: #fff;
  font-weight: 700;
  text-align: center;
}
.good-description {
  overflow: hidden;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  white-space: normal;
}
.searchbox {
  width: 100px;
  margin: 0 auto;
}
.outDate {
  position: absolute;
  top: 35%;
  width: 160px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.3);
  font-weight: 700;
}
</style>
