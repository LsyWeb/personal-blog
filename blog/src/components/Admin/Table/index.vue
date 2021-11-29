<template>
  <el-table :data="tableData" border stripe>
    <el-table-column
      v-for="col in columns"
      :prop="col.prop"
      :key="col.prop"
      :label="col.label"
      align="center"
    >
    </el-table-column>
    <el-table-column v-if="isShowDate" label="发布日期" align="center">
      <template slot-scope="scope">
        {{ formatDate(scope.row.createdAt) }}
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <el-button @click="editClick(scope.row)" type="primary" size="small"
          >编辑</el-button
        >
        <el-popconfirm
          style="margin-left: 10px"
          confirm-button-text="确定"
          cancel-button-text="取消"
          icon="el-icon-info"
          icon-color="red"
          title="确定删除吗？"
          @confirm="delClick(scope.row)"
        >
          <el-button
            slot="reference"
            type="danger"
            size="small"
            >删除</el-button
          >
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import formatDate from "@/utils/formatDate";
export default {
  props: {
    tableData: {
      type: Array,
      default() {
        return [];
      },
    },
    columns: {
      type: Array,
      default() {
        return [];
      },
    },
    isShowDate: {
      type: Boolean,
      default:false
    }
  },
  methods: {
    formatDate,
    // 编辑
    editClick(row) {
      this.$emit("onEditClick", row);
    },
    // 删除
    delClick(row) {
      this.$emit("onDelClick", row);
    },
  },
};
</script>

<style>
</style>