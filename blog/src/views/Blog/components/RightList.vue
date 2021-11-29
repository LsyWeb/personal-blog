<template>
  <ul class="right-list-container">
    <li v-for="(item, i) in list" :key="i">
      <span @click="handleClick(item)" :class="{ active: item.isSelect }">{{
        item.name
      }}</span>
      <span
        @click="handleClick(item)"
        v-if="item.aside"
        class="aside"
        :class="{ active: item.isSelect }"
      >
        {{ item.aside }}
      </span>
      <RightList :list="item.children" @select="handleClick" />
    </li>
  </ul>
</template>

<script>
export default {
  name: "RightList",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleClick(item) {
      this.$emit("select", item);
    },
  }
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.right-list-container {
  .right-list-container {
    margin-left: 1em;
  }
  li {
    font-size: 1rem;
    min-height: 40px;
    line-height: 40px;
    cursor: pointer;
    .active {
      color: @warn;
    }
    .aside {
      font-size: 14px;
      color: @gray;
      margin-left: 1em;
      &.active {
        color: @warn;
      }
    }
  }
}
</style>