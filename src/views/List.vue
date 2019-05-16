<template>
  <div class="list">
    <ul>
      <li v-for="(g,i) in goods" :key="i">
        <router-link :to="{path:'/detail',query:{id:g._id.toString()}}" target='_blank'>
          <img :src="g.imgUrl" :alt="g.name">
        </router-link>
        <span>{{g.name}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "List",
  data() {
    return {
      goods: []
    };
  },
  mounted() {
    this.goods = this.$route.query.data;
    console.log(this.$route.query.data);
  }
};
</script>
<style scoped>
.list img {
  width: 150px;
  height: 150px;
}
.list ul {
  display: flex;
}
.list ul li {
  display: flex;
  flex-direction: column;
}
</style>
