<template>
  <div class="rotationimg">
    <ul class="pic">
      <li v-for="(p, i) in pictures" :key="i">
        <transition name="changePic">
          <img :src="p.url" :alt="p.name" v-if="i==chooseIndex">
        </transition>
      </li>
    </ul>
    <ul class="points">
      <li
        v-for="(p, i) in pictures"
        :key="i"
        @click="change($event)"
        :class="{choose:i==chooseIndex}"
      ></li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "RotationImg",
  data() {
    return {
      pictures: [],
      chooseIndex: "0"
    };
  },
  mounted() {
    this.getPictures();
  },
  methods: {
    getPictures() {
      var vm = this;
      this.axios.get("/api/getPictures").then(function(res) {
        vm.pictures = res.data.result;
      });
    },
    change(e) {
      this.chooseIndex = this.$(e.target).index();
    }
  }
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
img {
  width: 400px;
  height: 300px;
}
.pic {
  width: 400px;
  height: 300px;
  overflow: hidden;
  display: flex;
  margin: 0 auto;
  position: relative;
}
.pic li {
  position: absolute;
}
.points {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
  width: 100px;
  height: 20px;
}
.points li {
  width: 8px;
  height: 8px;
  border: 1px solid #000;
  border-radius: 50%;
}
.choose {
  background-color: #f00;
}
.changePic-enter-active,
.changePic-leave-active {
  transition: opacity 1s;
}
.changePic-enter,
.changePic-leave-to {
  opacity: 0;
}
</style>
