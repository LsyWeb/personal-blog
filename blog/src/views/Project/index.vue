<template>
  <div class="project-container" ref="projectContainer">
    <ul>
      <li v-for="item in data" :key="item.id">
        <a target="_blank" :href="item.url" class="hidden-xs-only">
          <img class="thumb" v-lazy="item.thumb" alt="" />
        </a>
        <a target="_blank" :href="item.url">
          <h2>{{ item.name }}</h2>
          <p >{{ item.description }}</p>
        </a>
      </li>
    </ul>
    <Empty v-if="data.length === 0 && !loading" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Empty from "@/components/Empty";
import mainScroll from "@/mixin/mainScroll";
export default {
  components: {
    Empty,
  },
  mixins: [mainScroll("projectContainer")],
  computed: {
    ...mapState("project", ["loading", "data"]),
  },
  created() {
    this.$store.dispatch("project/fetchProject");
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/scroll.less";
.project-container {
  width: 100%;
  height: 100%;
  padding: 20px 30px;
  padding-bottom: 40px;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: scroll;
  scroll-behavior: smooth;
  position: relative;
  li {
    min-height: 150px;
    padding: 20px;
    display: flex;
    transition: 0.2s;
    overflow: hidden;
    box-sizing: border-box;
    border-radius: 5px;
    &:hover {
      box-shadow: 0px 0px 10px 5px rgba(0,0,0,.1);
    }
    h2{
      margin: 0;
      padding: 0;
    }
    a {
      display: block;
    }
    p {
      overflow: hidden;
    }
    .thumb {
      width: 200px;
      height: 150px;
      margin-right: 20px;
      border-radius: 5px;
    }
  }
}
</style>