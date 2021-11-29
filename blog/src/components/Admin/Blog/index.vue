<template>
  <div class="admin-blog-container">
    <Header
      type="博客"
      searchInputPlace="请输入文章标题"
      @onSearchClick="onSearch"
      @onAddClick="onAdd"
      @onSearchBack="onSearchBack"
    ></Header>
    <Table
      :tableData="blogData"
      :columns="blogColumns"
      @onEditClick="onEditClick"
      @onDelClick="onDelClick"
    ></Table>
    <!-- 分页 -->
    <el-pagination
      style="text-align:right;margin-top:10px;"
      background
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="limit"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
    <!-- 编辑博客的弹窗 -->
    <el-drawer
      title="编辑博客"
      size="40%"
      :visible.sync="isShowEditDialog"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <Form :key="editFormKey" :editForm="editForm" @onEditSubmit="onEditSubmit" @onClose="isShowEditDialog = false"></Form>
    </el-drawer>
    <!-- 新增博客的弹窗 -->
    <el-drawer
      title="新增博客"
      size="40%"
      :visible.sync="isShowAddDialog"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <Form  @onSubmit="onAddSubmit" @onClose="isShowAddDialog = false"></Form>
    </el-drawer>
  </div>
</template>

<script>
import { getBlogs, getBlog ,updateBlog, addBlog, deleteBlog} from "../../../api/blog";
import Header from "../Header";
import Table from "../Table";
import Form from "./Form.vue";
export default {
  components: {
    Header,
    Table,
    Form,
  },
  data() {
    return {
      blogData: [],
      blogColumns: [
        {
          prop: "id",
          label: "id",
        },
        {
          prop: "title",
          label: "标题",
        },
        {
          prop: "description",
          label: "描述",
        },
        {
          prop: "scanNumber",
          label: "浏览量",
        },
        {
          prop: "commentNumber",
          label: "评论数量",
        },
      ],
      total:0,
      limit: 10,
      currentPage: 1,
      categoryId:-1,
      searchValue:'',
      isShowEditDialog: false,
      isShowAddDialog: false,
      editFormKey:null,
      editForm:null
    };
  },
  async mounted() {
    // 获取博客数据
    this.getBlogData();
  },
  methods: {
    // 新增博客表单提交事件
    async onAddSubmit(form){
      const res = await addBlog(form);
      if(res){
        this.isShowAddDialog = false;
        this.getBlogData();
        this.$message({
          message: '新增成功',
          type: 'success',
          showClose: true,
          duration: 2000,
          center:true
        })
      }
    },
    // 编辑博客表单提交事件
    async onEditSubmit(form){
      const res = await updateBlog(form.id,form);
      if(res){
        this.$message({
          message: '修改成功',
          type: 'success',
          showClose: true,
          duration: 2000,
          center:true
        });
        this.isShowEditDialog = false;
        this.getBlogData();
      }
    },
    // 页码变化
    handleCurrentChange(page){
      this.currentPage = page;
      this.getBlogData()
    },
    // 编辑博客按钮
    async onEditClick(row) {
      const res = await getBlog(row.id);
      this.editForm = res;
      this.editFormKey = row.id;
      this.isShowEditDialog = true;
    },
    // 删除博客
    async onDelClick(row) {
      const res = await deleteBlog(row.id);
      if(res){
        this.$message({
          message: '删除成功',
          type: 'success',
          showClose: true,
          duration: 2000,
          center:true
        });
      }
      this.getBlogData();
    },
    // 获取最新博客数据
    async getBlogData() {
      const res = await getBlogs(this.currentPage, this.limit,this.categoryId,this.searchValue);
      this.blogData = res.rows;
      this.total = res.total;
    },
    // 搜索返回事件
    onSearchBack(){
      this.searchValue = '';
      this.getBlogData();
    },
    // 搜索事件
    onSearch(categoryId,searchValue) {
      this.searchValue = searchValue;
      this.categoryId = categoryId;
      console.log(categoryId,this.searchValue)
      this.getBlogData();
    },
    // 添加事件
    onAdd() {
      this.isShowAddDialog = true;
    },
  },
};
</script>

<style>
</style>