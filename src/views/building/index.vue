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
import { getList, del, add, edit } from "@/api/building";

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
            label: "楼宇名称",
            prop: "name",
            search: true,
          },
          {
            label: "楼宇类型",
            prop: "type",
          },
          {
            label: "管理员",
            prop: "fullname",
            bind: "manager.fullname",
            editDisplay: true,
            addDisplay: true,
            type: "select",
            props: {
              label: "fullname",
              value: "id",
            },
            dicUrl: `${process.env.VUE_APP_BASE_API}/admin`,
          },
          {
            label: "管理员手机号码",
            prop: "phone_number",
            bind: "manager.phone_number",
            editDisplay: false,
            addDisplay: false,
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
          del(form.id).then(() => {
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
      loading();
      const data = JSON.parse(JSON.stringify(form));
      console.log(data);
      edit({
        id: data.id,
        name: data.name,
        type: data.type,
        admin_id: data.fullname,
      }).then((res) => {
        done();
        this.$message.success("编辑成功");
        this.refreshChange();
      });
    },
    rowSave(form, done, loading) {
      loading();
      const {
        name,
        type,
        fullname: admin_id,
      } = JSON.parse(JSON.stringify(form));
      console.log(JSON.parse(JSON.stringify(form)));
      add({ name, type, admin_id }).then((res) => {
        done();
        this.$message.success("新增成功");
        this.refreshChange();
      });
    },
    searchChange(params, done) {
      const data = JSON.parse(JSON.stringify(params));
      this.loading = true;
      getList({
        currentPage: this.page.currentPage,
        pageSize: this.page.pageSize,
        name: data.name,
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