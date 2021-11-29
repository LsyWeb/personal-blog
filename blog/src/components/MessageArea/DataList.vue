<template>
  <ul class="data-list-container">
    <li v-for="item in list" :key="item.id">
      <Avatar
        :url="item.avatar"
        :size="44"
      />
      <div class="text">
        <div class="name">{{item.nickname}}</div>
        <div class="content">{{item.content}}</div>
        <div class="time">{{formatDate(item.createdAt,true)}}</div>
      </div>
    </li>

  </ul>
</template>

<script>
import {formatDate} from '@/utils'
import Avatar from "@/components/Avatar";
export default {
  components: {
    Avatar,
  },
  props:{
      list:Array
  },
  methods:{
      formatDate
  }
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";

.data-list-container {
  width: 100%;
  li {
    width: 100%;
    display: flex;
    position: relative;
    border-bottom: 1px solid #eee;
    margin-bottom: 10px;
    padding: 10px 0;
    .text{
        margin-left: 10px;
        flex: 1 1 auto;
        .name{
            font-size: 16px;
            color: @success;
        }
        .content{
            color: @words;
            font-size: 14px;
            margin-top: 10px;
        }
        .time{
            position: absolute;
            right: 0;
            top: 0;
            font-size: 12px;
            color: @gray;
        }
    }
  }
}
</style>