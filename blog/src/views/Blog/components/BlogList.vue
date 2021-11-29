<template>
  <div class="blog-list-container" ref="container" v-loading="isLoading">
    <ul>
      <li v-for="item in data.rows" :key="item.id">
        <div class="thumb hidden-xs-only" v-if="item.thumb">
          <RouterLink
            :to="{
              name: 'BlogDetail',
              params: {
                id: item.id,
              },
            }"
          >
            <img v-lazy="item.thumb" :alt="item.title" :title="item.title" />
          </RouterLink>
        </div>
        <div class="main">
          <RouterLink
            :to="{
              name: 'BlogDetail',
              params: {
                id: item.id,
              },
            }"
          >
            <h2>{{ item.title }}</h2>
          </RouterLink>
          <div class="aside">
            <span>日期：{{ formatDate(item.createdAt) }}</span>
            <span>浏览：{{ item.scanNumber }}</span>
            <span>评论：{{ item.commentNumber }}</span>
            <RouterLink
              :to="{
                name: 'BlogCate',
                params: {
                  categoryid: item.category.id,
                },
              }"
              class=""
              >分类：{{item.category.name}}</RouterLink
            >
          </div>
          <div class="desc">
            {{ item.description }}
          </div>
        </div>
      </li>
    </ul>
    <Empty v-if="data.rows.length === 0 && !isLoading" />
    <!-- 分页放到这里 -->
    <Pager
      v-if="data.total"
      :total="data.total"
      :current="routeInfo.page"
      :limit="routeInfo.limit"
      @pageChange="handlePageChange"
    />
  </div>
</template>

<script>
import Pager from "@/components/Pager";
import { getBlogs } from "@/api/blog.js";
import fetchData from "@/mixin/fetchData.js";
import mainScroll from "@/mixin/mainScroll.js";
import formatDate from "@/utils/formatDate.js";
import Empty from "@/components/Empty";
export default {
  components: { Pager, Empty },
  mixins: [fetchData({ total: 0, rows: [] }), mainScroll("container")],
  computed: {
    routeInfo() {
      const categoryid = +this.$route.params.categoryid || -1;
      const page = +this.$route.query.page || 1;
      const limit = +this.$route.query.limit || 10;
      return {
        categoryid,
        page,
        limit,
      };
    },
  },
  methods: {
    formatDate,
    async fetchData() {
      return await getBlogs(this.routeInfo.page,this.routeInfo.limit,this.routeInfo.categoryid);
    },
    handlePageChange(newPage) {
      console.log("改变page", newPage);
      const query = {
        page: newPage,
        limit: this.routeInfo.limit,
      };
      // 跳转到当前的 分类id 当前的页容量 newPage的页码
      if (this.routeInfo.categoryid === -1) {
        // 当前没有分类，只需要改动page 和 limit
        this.$router.push({
          name: "Blog",
          query,
        });
      } else {
        this.$router.push({
          name: "BlogCate",
          query,
          params: {
            categoryid: this.routeInfo.categoryid,
          },
        });
      }
    },
  },
  watch: {
    async $route() {
      // 把滚动高度设为0,即：返回顶部
      this.$refs.container.scrollTop = 0;
      this.isLoading = true;
      this.data = await this.fetchData();
      this.isLoading = false;
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
@import "~@/styles/scroll.css";

.blog-list-container {
  line-height: 1.7;
  position: relative;
  padding: 20px;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  scroll-behavior: smooth;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
li {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid @gray;
  .thumb {
    flex: 0 0 auto;
    margin-right: 15px;
    img {
      display: block;
      width: 200px;
      min-height: 150px;
      border-radius: 5px;
    }
  }
  .main {
    flex: 1 1 auto;
    h2 {
      margin: 0;
      width: 100%;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }
  .aside {
    font-size: 12px;
    color: @gray;
    span {
      margin-right: 15px;
    }
  }
  .desc {
    margin: 15px 0;
    font-size: 14px;
    width: 100%;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
}
</style>
