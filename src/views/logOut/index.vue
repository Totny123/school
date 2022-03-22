<template>
  <div></div>
</template>

<script>
export default {
  created() {
    this.$alert("确认退出系统吗？", "提示", {
      confirmButtonText: "确定",
      callback: async (action) => {
        if (action === "cancel") {
          this.$router.push("/");
        } else {
          await this.$store.dispatch("user/logout");
          this.$router.push(`/login`);
        }
      },
    });
  },
};
</script>

<style>
</style>