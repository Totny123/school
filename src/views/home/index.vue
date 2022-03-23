<template>
  <div class="home-container">
    <div class="home-text">欢迎您：{{ name }}</div>
    <avue-data-tabs :option="option"></avue-data-tabs>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapGetters(["name"]),
  },
  data() {
    return {
      option: {
        data: [
          {
            title: "楼宇统计",
            subtitle: "实时",
            count: 79,
            color: "rgb(27, 201, 142)",
          },
          {
            title: "宿舍统计",
            subtitle: "实时",
            count: 311,
            color: "rgb(230, 71, 88)",
          },
          {
            title: "学生统计",
            subtitle: "实时",
            count: 1342,
            color: "rgb(178, 159, 255)",
          },
        ],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.home {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
