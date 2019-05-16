<template>
  <div id="app">
    <Header></Header>
    <router-view/>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "App",
  data() {
    return {
      username: "您好，请登录",
      loginOrpersonalSpaceUrl: "",
      flag: false
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  components: {
    Header,
    Footer
  },
  methods: {
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop >= 300) {
        this.$(".header").addClass("fixed");
      }else{
        this.$(".header").removeClass("fixed")
      }
    }
  }
};
</script>
<style>
@import "./assets/css/reset.css";
.fixed {
  position: fixed;
  border-bottom: 2px solid #ffffff;
}
</style>
