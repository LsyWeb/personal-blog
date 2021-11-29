<template>
  <Layout>
    <template #main>
      <div ref="mainContainer" class="main-container" v-loading="isLoading">
        <BlogDetail :blog="data" v-if="data" />
        <BlogComment :blogId="$route.params.id" v-if="!isLoading" />
      </div>
    </template>
    <template v-if="false" #right>
      <div class="right-container" v-loading="isLoading">
        <BlogTOC :toc="data.toc" v-if="data" />
      </div>
    </template>
  </Layout>
</template>

<script>

import BlogComment from "./components/BlogComment";
import Layout from "@/components/Layout";
import BlogDetail from "./components/BlogDetail";
// import BlogTOC from "./components/BlogTOC";
import { getBlog } from "@/api/blog.js";
import fetchData from "@/mixin/fetchData";
import mainScroll from "@/mixin/mainScroll.js";

export default {
  mixins: [fetchData(null),mainScroll('mainContainer')],
  components: {
    Layout,
    BlogDetail,
    // BlogTOC,
    BlogComment,
  },
  methods: {
    async fetchData() {
      return await getBlog(this.$route.params.id);
    }
  },
  mounted() {
    const hash = location.hash;
    location.hash = "";
    setTimeout(() => {
      location.hash = hash;
    }, 1500);
  }
};
</script>

<style lang="less" scoped>
.main-container {
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  overflow-x: hidden;
  scroll-behavior: smooth;
}
.right-container {
  overflow-y: scroll;
  width: 300px;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
}
</style>