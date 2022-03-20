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
    </avue-crud>
  </div>
</template>
<script>
import { getInfo, delAdmin, editAdmin, addAdmin } from "@/api/admin";

export default {
  data() {
    return {
      loading: false,
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        layout: "sizes,pager",
      },
      tableData: [],
      option: {
        border: true,
        align: "center",
        menuAlign: "center",
        column: [
          { label: "ID", prop: "id", editDisabled: true, addDisplay: false },
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
        ],
      },
    };
  },
  created() {
    this.getAdmins();
  },
  methods: {
    getAdmins() {
      this.loading = true;
      getInfo({
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
          delAdmin(form.id).then(() => {
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
      editAdmin(data).then((res) => {
        done();
        this.refreshChange();
        this.$message.success("编辑成功");
      });
    },
    rowSave(form, done, loading) {
      loading();
      const data = JSON.parse(JSON.stringify(form));
      addAdmin(data).then((res) => {
        done();
        this.$message.success("新增成功");
        this.refreshChange();
      });
    },
    searchChange(params, done) {
      const data = JSON.parse(JSON.stringify(params));
      this.loading = true;
      getInfo({
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
  },
};
</script>