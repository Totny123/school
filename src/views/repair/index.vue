<template>
  <div class="box">
    <div class="main">
      <el-form size="medium">
        <el-form-item label="请输入具体维修信息" prop="desc">
          <el-input
            v-model="text"
            type="textarea"
            :rows="13"
            placeholder="请输入内容"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="float: right" @click="send">
            提 交
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { repair } from "@/api/repair";

export default {
  data() {
    return {
      text: "",
    };
  },
  methods: {
    send() {
      repair({ message: this.text }).then((res) => {
        this.$message.success("提交成功！");
        this.text = "";
      });
    },
  },
};
</script>

<style scoped>
.box {
  display: flex;
  justify-content: center;
  align-items: center;
}
.main {
  margin-top: 150px;
  width: 50%;
}
</style>