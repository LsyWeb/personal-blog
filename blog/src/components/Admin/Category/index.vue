<template>
  <div class="category-container">
    <Header
      type="分类"
      searchInputPlace="请输入分类名称"
      @onSearchClick="onSearch"
      @onAddClick="onAdd"
      @onSearchBack="onSearchBack"
    ></Header>
    <!-- 表格 -->
    <Table
      :isShowDate="true"
      :tableData="categoryData"
      :columns="categoryColumns"
      @onEditClick="onEditClick"
      @onDelClick="onDelClick"
    ></Table>
    <!-- 分页 -->
    <el-pagination
      style="text-align: right; margin-top: 10px"
      background
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="limit"
      layout="total, prev, pager, next"
      :total="total"
    >
    </el-pagination>
    <!-- 新增分类的弹窗 -->
    <el-drawer
      title="新增分类"
      size="40%"
      :visible.sync="isShowAddDialog"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <Form @onSubmit="onAddSubmit" @onClose="isShowAddDialog = false"></Form>
    </el-drawer>
    <!-- 编辑分类的弹窗 -->
    <el-drawer
      title="编辑分类"
      size="40%"
      :visible.sync="isShowEditDialog"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <Form
        :key="editFormKey"
        :editForm="editForm"
        @onEditSubmit="onEditSubmit"
        @onClose="isShowEditDialog = false"
      ></Form>
    </el-drawer>
  </div>
</template>

<script>
import Header from "../Header";
import Table from "../Table";
import Form from "./Form.vue";
import {
  getCategory,
  getCategoryById,
  addCategory,
  deleteCategory,
  updateCategory,
} from "../../../api/category.js";
export default {
  components: {
    Header,
    Table,
    Form,
  },
  data() {
    return {
      searchValue: "",
      categoryData: [],
      categoryColumns: [
        {
          prop: "id",
          label: "id",
        },
        {
          prop: "name",
          label: "名称",
        },
        {
          prop: "blogNumber",
          label: "博客数量",
        },
      ],
      currentPage: 1,
      limit: 10,
      total: 0,
      isShowAddDialog: false,
      isShowEditDialog: false,
      editForm: null,
      editFormKey: null,
    };
  },
  async mounted() {
    this.getCategoryData();
  },
  methods: {
    // 新增表单提交
    async onAddSubmit(form) {
      const res = await addCategory(form);
      if (res) {
        this.isShowAddDialog = false;
        this.getCategoryData();
        this.$message({
          message: "新增成功",
          type: "success",
          showClose: true,
          duration: 2000,
          center:true
        });
      } else {
        this.$message({
          message: "新增失败",
          type: "error",
          showClose: true,
          duration: 2000,
          center:true
        });
      }
    },

    // 编辑提交按钮
    async onEditSubmit(form) {
      const res = await updateCategory(form.id, form);
      console.log(res);
      if (res) {
        this.isShowEditDialog = false; //关闭弹窗
        this.getCategoryData(); //获取最新数据
        this.$message({
          message: "修改成功",
          type: "success",
          showClose: true,
          duration: 2000,
          center:true
        });
      } else {
        this.$message({
          message: "修改失败",
          type: "success",
          showClose: true,
          duration: 2000,
          center:true
        });
      }
    },
    // 编辑分类按钮
    async onEditClick(row) {
      const res = await getCategoryById(row.id);
      this.editForm = res;
      this.editFormKey = row.id;
      this.isShowEditDialog = true;
    },
    // 删除分类
    async onDelClick(row) {
      const res = await deleteCategory(row.id);
      if (res) {
        this.$message({
          message: "删除成功",
          type: "success",
          showClose: true,
          duration: 2000,
          center:true
        });
      }
      this.getCategoryData(); //获取最新数据
    },
    // 页码变化
    handleCurrentChange(page) {
      this.currentPage = page;
      this.getCategoryData();
    },
    // 搜索返回事件
    onSearchBack() {
      this.searchValue = "";
      this.getCategoryData();
    },
    // 搜索事件
    onSearch(searchValue) {
      this.searchValue = searchValue;
      this.getCategoryData();
    },
    // 添加事件
    onAdd() {
      this.isShowAddDialog = true;
    },
    // 获取最新数据,并更新页面
    async getCategoryData() {
      const res = await getCategory(
        this.currentPage,
        this.limit,
        this.searchValue
      );
      this.total = res.total;
      this.categoryData = res.rows;
    },
  },
};
</script>

<style>
</style>