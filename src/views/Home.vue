<template>
  <div class="home">
    <Header :msgUrl="loginOrpersonalSpaceUrl" :msgUsername="username" :quit="quit">
      <div class="user-control">
        <router-link :to="loginOrpersonalSpaceUrl">{{username}}</router-link>
        <button @click="quit" v-if="username!='您好，请登录'">注销</button>
      </div>
    </Header>
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
            <img :src="item.imgUrl" :alt="item.commodityCode">
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import { setCookie, getCookie, delCookie } from "../assets/js/cookie";
import RotationImg from "@/components/RotationImg.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Side from "@/components/Side.vue";
import Discount from "@/components/Discount.vue";

export default {
  name: "home",
  data() {
    return {
      username: "您好，请登录",
      loginOrpersonalSpaceUrl: "",
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
    if (!getCookie("loginName")) {
      console.log("请先登录");
      this.loginOrpersonalSpaceUrl = "/login";
      // this.$router.push({ path: "/login" });
    } else {
      this.username = getCookie("loginName");
      this.loginOrpersonalSpaceUrl = "/personspace";
    }
    this.getGoods();
  },
  methods: {
    quit() {
      if (getCookie("loginName")) {
        delCookie("loginName");
        console.log("cookie删除成功");
        setTimeout(function() {
          location.reload();
        }, 500);
      }
    },
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
.item{
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.item .item-content{
  width: 800px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.item-c-msg{
  width: 150px;
}
.item-c-msg img{
  width: 150px;
  height: 130px;
}
</style>
