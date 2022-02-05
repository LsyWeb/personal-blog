<template>
  <div class="message-container" ref="messageContainer">
    <MessageArea
      title="留言板"
      :subTitle="data.total"
      :list="data.rows"
      :isListLoading="isLoading"
      @submit="handleSubmit"
    />
    <div ref="laodingContainer" class="loading"  v-loading="isLoading"></div>
    <div class="noMore" v-if="!hasMore && !isLoading">没有更多了...</div>
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import fetchData from "@/mixin/fetchData";
import * as msgApi from "@/api/message.js";
import mainScroll from '@/mixin/mainScroll';

export default {
  mixins: [fetchData({rows:[]}),mainScroll('messageContainer')],
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  components: {
    MessageArea,
  },
  computed: {
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
      return await msgApi.getMessage(this.page, this.limit);
    },
    async handleSubmit(data,callback){
      let resp = await msgApi.postMessage({...data})
      console.log(data)
      this.data.rows.unshift(resp);
      this.data.total++;
      callback('感谢您的留言');
    },
    handleScroll(dom){
      if(this.isLoading || !dom){
        return;
      }
      const range = 10;
      const des = Math.abs( dom.clientHeight + dom.scrollTop  - dom.scrollHeight);
      if(des <= range){
        this.fetchMore();
      }
    },
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
    }
    
  },
};
</script>

<style lang="less" scoped>
.message-container {
  width: 100%;
  height: 100%;
  padding: 30px 20px;
  box-sizing: border-box;
  overflow-y: auto;
  scroll-behavior: smooth;
  
  .message-area-container {
    width: 90%;
    margin: 0 auto;
  }
  .loading{
    height: 100px;
    position: relative;
  }
  .noMore{
    margin-top: -80px;
    font-size: 16px;
    text-align: center;
  }
}
</style>