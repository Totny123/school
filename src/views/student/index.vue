<template>
  <div style="padding: 20px">
    <avue-crud
      :table-loading="loading"
      :data="tableData"
      :option="option"
      :page.sync="page"
      @size-change="sizeChange"
      @current-change="currentChange"
      @refresh-change="refreshChange"
      @row-del="rowDel"
      @row-update="rowUpdate"
      @row-save="rowSave"
      @search-change="searchChange"
    >
      <template slot-scope="{ row, type, size }" slot="menu">
        <el-button
          icon="el-icon-check"
          :size="size"
          :type="type"
          @click="checkIn(row)"
          >入住</el-button
        >
        <el-button
          icon="el-icon-close"
          :size="size"
          :type="type"
          @click="out(row)"
          >迁出</el-button
        >
      </template>
    </avue-crud>
    <el-dialog title="入住登记" :visible.sync="inVisible" width="30%">
      <el-form ref="form" label-width="80px" size="mini">
        <el-form-item label="宿舍列表">
          <el-select
            v-model="selectDormitory"
            placeholder="请选择宿舍"
            style="width: 100%"
          >
            <el-option
              v-for="item in dormitoryList"
              :key="item.id"
              :value="item.id"
              :label="
                '楼宇：' +
                item.building.name +
                ' 宿舍：' +
                item.dormitory_number
              "
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="inVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleIn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getStu, delStu, editStu, addStu, stuIn, stuOut } from "@/api/student";
import { getList } from "@/api/dormitory";

export default {
  data() {
    return {
      dormitoryList: [],
      selectDormitory: "",
      inOrOut: {
        student_id: "",
        dormitory_id: "",
      },
      inVisible: false,
      outVisible: false,
      loading: false,
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        layout: "sizes,pager",
      },
      tableData: [],
      option: {
        menuWidth: 300,
        border: true,
        align: "center",
        menuAlign: "center",
        column: [
          { label: "ID", prop: "id", editDisabled: true, addDisplay: false },
          { label: "学号", prop: "student_id", editDisabled: true },
          {
            label: "用户名",
            prop: "name",
          },
          {
            label: "姓名",
            prop: "fullname",
            search: true,
          },
          {
            label: "性别",
            prop: "gender",
          },
          {
            label: "手机号码",
            prop: "phone_number",
          },
          {
            label: "密码",
            prop: "password",
            showColumn: false,
          },
          {
            label: "所在宿舍",
            prop: "dormitory_number",
            editDisplay: false,
            addDisplay: false,
          },
        ],
      },
    };
  },
  created() {
    this.getAdmins();
    getList().then((res) => {
      this.dormitoryList = res.data;
    });
  },
  methods: {
    getAdmins() {
      this.loading = true;
      getStu({
        currentPage: this.page.currentPage,
        pageSize: this.page.pageSize,
      }).then((res) => {
        this.loading = false;
        this.tableData = res.data;
        this.page.total = res.total;
      });
    },
    sizeChange(val) {
      this.page.currentPage = 1;
      this.page.pageSize = val;
      this.getAdmins();
    },
    currentChange(val) {
      this.page.currentPage = val;
      this.getAdmins();
    },
    refreshChange() {
      this.getAdmins();
    },
    rowDel(form, index) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delStu(form.id).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.refreshChange();
          });
        })
        .catch(() => {});
    },
    rowUpdate(form, index, done, loading) {
      const data = JSON.parse(JSON.stringify(form));
      loading();
      editStu(data).then((res) => {
        done();
        this.refreshChange();
        this.$message.success("编辑成功");
      });
    },
    rowSave(form, done, loading) {
      loading();
      const data = JSON.parse(JSON.stringify(form));
      addStu(data).then((res) => {
        done();
        this.$message.success("新增成功");
        this.refreshChange();
      });
    },
    searchChange(params, done) {
      const data = JSON.parse(JSON.stringify(params));
      this.loading = true;
      getStu({
        currentPage: this.page.currentPage,
        pageSize: this.page.pageSize,
        fullname: data.fullname,
      }).then((res) => {
        done();
        this.loading = false;
        this.tableData = res.data;
        this.page.total = res.total;
      });
    },
    checkIn(row) {
      this.inOrOut.student_id = row.id;
      this.inVisible = true;
    },
    out(row) {
      this.inOrOut.student_id = row.id;
      this.$confirm("是否迁出该学生？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          stuOut(this.inOrOut)
            .then((res) => {
              this.$message.success("迁出成功");
              this.refreshChange();
            })
            .catch((err) => {});
        })
        .catch(() => {});
    },
    handleIn() {
      this.inVisible = false;
      this.inOrOut.dormitory_id = this.selectDormitory;
      stuIn(this.inOrOut)
        .then((res) => {
          this.$message.success("入住成功");
          this.refreshChange();
        })
        .catch((err) => {});
    },
    handleOut() {
      this.outVisible = false;
      this.inOrOut.dormitory_id = this.selectDormitory;
      stuOut(this.inOrOut)
        .then((res) => {
          this.$message.success("迁出成功");
          this.refreshChange();
        })
        .catch((err) => {});
    },
  },
};
</script>