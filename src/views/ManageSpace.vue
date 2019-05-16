<template>
  <div class="managespace">
    <table border="1">
      <tr>
        <th>序号</th>
        <th>用户名</th>
        <th>密码</th>
        <th>手机</th>
        <th>邮箱</th>
        <th>操作</th>
      </tr>
      <tr v-for="(p, i) in person" :key="i">
        <td>{{i}}</td>
        <td>{{p.loginName}}</td>
        <td>{{p.password}}</td>
        <td>{{p.phone}}</td>
        <td>{{p.email}}</td>
        <td>
          <button>删除</button>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  name: "ManageSpace",
  data() {
    return {
      person: []
    };
  },
  methods: {
    getUsers() {
      this.axios.get("/api/getUsers").then(res => {
        this.person = res.data.result;
      });
    }
  },
  mounted() {
    this.getUsers();
  }
};
</script>
<style scoped>
</style>
