<template>
  <div class="admin-container">
    <el-tabs v-model="tabActiveName" tab-position="top" @tab-click="onTabClick">
      <el-tab-pane class="item" label="博客管理" name="blog">
        <Blog />
      </el-tab-pane>
      <el-tab-pane class="item" label="分类管理" name="category">
        <Category/>
      </el-tab-pane>
      <el-tab-pane class="item" label="项目管理" name="project">
        <Project/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Blog from "@/components/Admin/Blog";
import Category from "@/components/Admin/Category";
import Project from "@/components/Admin/Project";
export default {
  components: {
    Blog,
    Category,
    Project
  },
  data() {
    return {
      tabActiveName: "blog",
    };
  },
  methods: {
    onTabClick() {
      // console.log(tab);
    },
  },
};
</script>

<style lang="less">
.admin-container {
  width: 100%;
  padding: 20px;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
}
</style>