<template>
  <div class="side">
    <ul>
      <li v-for="(l,i) in lists" :key="i">{{l.name}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Side",
  data() {
    return {
      lists: []
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      var vm = this;
      this.axios.get("/api/list").then(function(res) {
        vm.lists = res.data.result;
        // console.log(vm.lists);
        vm.sendToHome();
      });
    },
    sendToHome(){
      this.$emit("sendList",this.lists);
    }
  }
};
</script>
<style scoped>
li {
  list-style: none;
}
.side ul {
  width: 150px;
  background-color: #99cc99;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  margin: 0;
}
.side ul li {
  padding: 10px;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
}
</style>
