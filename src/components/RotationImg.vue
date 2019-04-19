<template>
  <div class="rotationimg">
    <ul class="pic">
      <li v-for="(p, i) in pictures" :key="i">
        <transition name="changePic">
          <img :src="p.url" :alt="p.name" v-if="i==chooseIndex">
        </transition>
      </li>
      <button class="directionArrow" id="leftArrow" @click="forward">&lt;</button>
      <button class="directionArrow" id="rightArrow" @click="backward">&gt;</button>
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
      chooseIndex: 0
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
    },
    forward() {
      this.chooseIndex -= 1;
      if (this.chooseIndex < 0) {
        this.chooseIndex = this.$(".pic li").length - 1;
      }
    },
    backward() {
      this.chooseIndex += 1;
      if (this.chooseIndex >= this.$(".pic li").length) {
        this.chooseIndex = 0;
      }
    }
  }
};
</script>
<style scoped>
img {
  width: 780px;
  height: 400px;
}
.pic {
  width: 780px;
  height: 400px;
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
  background-color: #99cc99;
}
.changePic-enter-active,
.changePic-leave-active {
  transition: opacity 1s;
}
.changePic-enter,
.changePic-leave-to {
  opacity: 0;
}
.directionArrow {
  width: 20px;
  height: 50px;
  line-height: 50px;
  background: rgba(0, 0, 0, 0.2);
  color: #fff;
  border: none;
  position: absolute;
  top: 50%;
  outline: none;
}
#leftArrow {
  left: 0;
}
#rightArrow {
  right: 0;
}
</style>
