<template>
  <div class="blog-comment-container">
    <MessageArea
      title="文章评论"
      :subTitle="data.total"
      :list="data.rows"
      :isListLoading="isLoading"
      @submit="handleSubmit"
    />
    <div ref="laodingContainer" class="loading" v-loading="isLoading"></div>
    <div class="noMore" v-if="!hasMore">没有更多了...</div>
  </div>
</template>

<script>
import fetchData from "@/mixin/fetchData";
import MessageArea from "@/components/MessageArea";
import { getComments,postComment} from "@/api/blog";
export default {
  mixins: [fetchData({ total: 0, rows: [] })],
  components: {
    MessageArea,
  },
  props:{
    blogId:[String,Number]
  },
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  computed:{
    hasMore(){
      return this.data.rows.length < this.data.total;
    }
  },
  mounted(){
    this.$bus.$on('mainScroll',this.handleScroll)
  },
  destroyed(){
    this.$bus.$off('mainScroll',this.handleScroll)
  },
  methods: {
    async fetchData() {
      return await getComments( this.page, this.limit,this.$route.params.id);
    },
    handleScroll(dom){
      if(this.isLoading || !dom){
        return;
      }
      const range = 10;
      const des = Math.abs(( dom.clientHeight + dom.scrollTop ) - dom.scrollHeight);
      if(des <= range){
        this.fetchMore();
      }
    },
    //加载更多
    async fetchMore(){
      if(!this.hasMore){
        // 没有更多了
        return;
      }
      this.isLoading = true;
      this.page++;
      const resp = await this.fetchData();
      this.total = resp.total;
      this.data.rows =this.data.rows.concat(resp.rows)
      this.isLoading = false;
    },
    async handleSubmit(formData,callback){
      formData.blogId = +this.blogId;
      let resp = await postComment(formData)
      this.data.rows.unshift(resp);
      this.data.total = this.data.total + 1;
      callback('评论成功');
    }
    
  }
};
</script>

<style lang="less" scoped>
.blog-comment-container {
  padding: 30px;
  box-sizing: border-box;
  .loading {
    height: 100px;
    position: relative;
  }
  .noMore {
    margin-top: -60px;
    text-align: center;
    font-size: 14px;
    color: #999;
  }
}
</style>