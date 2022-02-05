<template>
  <div class="blog-category-container">
    <h2>文章分类</h2>
    <RightList v-if="data" :list="list" @select="handleSelect" />
  </div>
</template>

<script>
import RightList from "./RightList";
import { getBlogCategory } from "@/api/blog.js";
import fetchData from "@/mixin/fetchData.js";
export default {
  mixins: [fetchData([])],
  components: {
    RightList,
  },
  computed: {
    categoryid() {
      const categoryid = +this.$route.params.categoryid || -1;
      return categoryid;
    },
    limit() {
      const limit = +this.$route.query.limit || 10;
      return limit;
    },
    list() {
      let total = this.data.blogs || 0;
      if(!this.data.rows)return;
      const r = this.data.rows.map(item =>{
        item.articleCount = item.blogs.length;
        return item;
      })
      const result = [
        { name: "全部", id: -1, articleCount: total },
        ...r,
      ];
      console.log(result)
      return result.map((item) => {
        return {
          ...item,
          isSelect: item.id === this.categoryid,
          aside: `${item.articleCount}篇`,
        };
      });
    },
  },
  methods: {
    async fetchData() {
       return await getBlogCategory();
    },
    handleSelect(item) {
      console.log(item);
      if (item.id === -1) {
        this.$router.push({
          name: "Blog",
        });
      } else {
        this.$router.push({
          name: "BlogCate",
          params: {
            categoryid: item.id,
          },
          query: {
            page: 1,
            limit: this.limit,
          },
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/scroll.less";
.blog-category-container {
  width: 300px;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;

  h2 {
    font-size: 1.2rem;
    font-weight: bold;
  }
}
</style>