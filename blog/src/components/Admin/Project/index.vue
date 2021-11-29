<template>
  <div class="project-container">
    <Header
      type="项目"
      searchInputPlace="请输入项目名称"
      @onSearchClick="onSearch"
      @onAddClick="onAdd"
      @onSearchBack="onSearchBack"
    ></Header>
    <!-- 表格 -->
    <Table
      :tableData="projectData"
      :columns="projectColumns"
      :isShowDate="false"
      @onEditClick="onEditClick"
      @onDelClick="onDelClick"
    ></Table>
    <!-- 新增项目的弹窗 -->
    <el-drawer
      title="新增项目"
      size="40%"
      :visible.sync="isShowAddDialog"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <Form @onSubmit="onAddSubmit" @onClose="isShowAddDialog = false"></Form>
    </el-drawer>
    <!-- 编辑项目的弹窗 -->
    <el-drawer
      title="编辑项目"
      size="40%"
      :visible.sync="isShowEditDialog"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <Form :key="editFormKey" :editForm="editForm" @onEditSubmit="onEditSubmit" @onClose="isShowEditDialog = false"></Form>
    </el-drawer>
  </div>
</template>

<script>
import Header from "../Header";
import Table from "../Table";
import Form from "./Form.vue";
import { getProject,getProjectById,deleteProject, addProject, updateProject } from "../../../api/project";
export default {
  components: {
    Header,
    Table,
    Form,
  },
  data() {
    return {
      searchValue: "",
      projectData: [],
      projectColumns: [
        {
          prop: "id",
          label: "id",
        },
        {
          prop: "name",
          label: "项目名称",
        },
        {
          prop: "description",
          label: "项目描述",
        },
        {
          prop: "url",
          label: "项目展示连接",
        },
        {
          prop: "github",
          label: "项目github",
        },
        
      ],
      isShowAddDialog: false,
      isShowEditDialog: false,
      editFormKey:null,
      editForm:null,

    };
  },
  mounted(){
    this.getProjectData()
  },
  methods: {
    // 编辑项目表单提交 
    async onEditSubmit(form){
      console.log(form)
      const res = await updateProject(form.id,form);
      if(res){
        this.isShowEditDialog = false;
        this.getProjectData();
        this.$message({
          message: '修改成功',
          type: 'success',
          showClose: true,
          duration: 2000,
          center:true
        });
        
      }
    },
    // 新增项目表单提交
    async onAddSubmit(form){   
      const res = await addProject(form);
      if(res){
        this.getProjectData();
        this.isShowAddDialog = false;
        this.$message({
          message: '新增成功',
          type: 'success',
          showClose: true,
          duration: 2000,
          center:true
        });
      }else{
        this.$message({
          message: '新增失败',
          type: 'error',
          showClose: true,
          duration: 2000,
          center:true
        });
      }
    },
    // 编辑项目按钮
    async onEditClick(row) {
      const res = await getProjectById(row.id);
      this.editForm = res;
      this.editFormKey = row.id;
      this.isShowEditDialog = true;
    },
    // 删除项目
    async onDelClick(row) {
      const res = await deleteProject(row.id);
      if (res) {
        this.$message({
          message: "删除成功",
          type: "success",
          showClose: true,
          duration: 2000,
          center:true
        });
      }
      this.getProjectData();//获取最新数据
    },
    // 搜索返回事件
    onSearchBack() {
      this.searchValue = "";
      this.getProjectData();
    },
    // 搜索事件
    onSearch(searchValue) {
      this.searchValue = searchValue;
      this.getProjectData();
    },
    // 添加事件
    onAdd() {
      this.isShowAddDialog = true;
    },
    // 获取最新数据,并更新页面
    async getProjectData() {
      const res = await getProject(this.searchValue);
      this.projectData = res;
    },
  },
};
</script>

<style>
</style>