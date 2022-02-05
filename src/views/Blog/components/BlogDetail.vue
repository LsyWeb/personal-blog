<template>
  <div class="blog-detail-container">
    <h1>{{ blog.title }}</h1>
    <div class="aside">
      <span>日期：{{ formatDate(blog.createdAt) }}</span>
      <span>浏览：{{ blog.scanNumber }}</span>
      <a href="#form-data-container">评论：{{ blog.commentNumber }}</a>
      <a>分类：{{ blog.category.name }}</a>
    </div>
    <div class="markdown-body" v-highlight v-html="articleText"></div>
  </div>
</template>

<script>
import { formatDate } from "@/utils";
import { updateBlog } from '@/api/blog'
import {marked} from 'marked'
// import hljs from 'highlightjs'
// import "highlight.js/styles/monokai-sublime.css";
export default {
  props: {
    blog: {
      type: Object,
      required: true,
    },
    
  },
  computed:{
    articleText(){
      console.log(this.blog.content)
      return marked.parse(this.blog.content);
    }
  },
  async mounted(){
    await updateBlog(this.blog.id,{scanNumber:++this.blog.scanNumber});
  
  },
  methods: {
    formatDate,
  },
  
};
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';
.blog-detail-container {
  padding: 10px 30px;
  box-sizing: border-box;
  .aside {
    font-size: 14px;
    margin: 20px 0;
    span,
    a {
      margin-right: 15px;
      color: @gray;
    }
  }
  .markdown-body{
    padding: 5px 0;
  }
}
</style>