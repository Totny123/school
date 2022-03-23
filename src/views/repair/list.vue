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
import { getList } from "@/api/repair";

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
        menu: false,
        viewBtn: false,
        addBtn: false,
        column: [
          { label: "ID", prop: "id", editDisabled: true, addDisplay: false },
          {
            label: "维修信息",
            prop: "message",
          },
          {
            label: "学生名",
            prop: "fullname",
            bind: "student.fullname",
          },
          {
            label: "学生所处宿舍",
            prop: "dormitory_number",
            bind: "student.dormitory_number",
          },
        ],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      getList({
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
      this.getList();
    },
    currentChange(val) {
      this.page.currentPage = val;
      this.getList();
    },
    refreshChange() {
      this.getList();
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