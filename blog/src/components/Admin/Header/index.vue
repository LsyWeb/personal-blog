<template>
  <div class="admin-header-container">
    <div>
      <el-input
        class="search-input mr"
        :placeholder="searchInputPlace"
        size="small"
        v-model="searchValue"
      ></el-input>
      <el-select
        v-if="type === '博客'"
        class="mr"
        v-model="categoryId"
        size="small"
        placeholder="请选择分类"
        clearable
        filterable
      >
        <el-option
          v-for="item in categoryOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button
        type="primary"
        icon="el-icon-search"
        size="small"
        @click="onSearch"
        >搜索</el-button
      >
      <el-button
        v-if="searchValue"
        type="default"
        size="small"
        @click="onSearchBack"
        >返回</el-button
      >
    </div>
    <el-button class="add-btn" type="primary" size="small" @click="onAddClick"
      >新增{{ type }}</el-button
    >
  </div>
</template>

<script>
import { getBlogCategory } from "@/api/blog";
export default {
  props: {
    type: String,
    searchInputPlace: String,
  },
  data() {
    return {
      searchValue: "",
      categoryId: "",
      categoryOptions: [],
    };
  },
  async mounted() {
    const data = await getBlogCategory();
    const result = data.rows.map((item) => ({
      value: item.id,
      label: item.name,
    }));
    this.categoryOptions = [
      {
        value: -1,
        label: "全部",
      },
      ...result,
    ];
  },
  methods: {
    // 返回按钮
    onSearchBack(){
      this.searchValue = '';
      this.$emit('onSearchBack')
    },
    // 搜索按钮点击事件
    onSearch() {
      // 如果不是博客，就不需要选择分类
      if (this.type !== "博客") {
        if (this.searchValue.trim() === "") {
          this.$message({
            message: "请输入关键字",
            type: "error",
            showClose: true,
            duration: 3000,
            center:true
          });
          return;
        }
        this.$emit("onSearchClick", this.searchValue);
        return;
      }
      if (!this.categoryId) {
        this.$message({
          message: "请选择分类",
          type: "error",
          showClose: true,
          duration: 3000,
          center:true
        });
        return;
      } else if (this.searchValue.trim() === "" && !this.categoryId) {
        this.$message({
          message: "请输入关键字",
          type: "error",
          showClose: true,
          duration: 3000,
          center:true
        });
        return;
      }

      this.$emit("onSearchClick", this.categoryId, this.searchValue);
    },
    // 新增按钮点击
    onAddClick() {
      this.$emit("onAddClick");
    },
  },
};
</script>

<style lang="less" scoped>
.admin-header-container {
  width: 100%;
  padding-bottom: 15px;
  display: flex;
  justify-content: space-between;
  .search-input {
    width: 250px;
  }
  .mr {
    margin-right: 5px;
  }
}
</style>