<template>
  <div class="blog-toc-container">
    <h2 >目录</h2>
    <RightList :list="toWithSelect" @select="handleSelect" />
  </div>
</template>

<script>
import RightList from "./RightList";
import { debounce } from "@/utils";
export default {
  props: {
    toc: {
      type: Array,
    },
  },
  data() {
    return {
      activeAnchor: "",
    };
  },
  components: {
    RightList,
  },
  computed: {
    toWithSelect() {
      // 根据toc属性以及 activeAnchor属性 得到 带有 isSelect属性的toc数组
      const getToc = (toc = []) => {
        return toc.map((t) => {
          return {
            ...t,
            isSelect: t.anchor == this.activeAnchor,
            children: getToc(t.children),
          };
        });
      };
      return getToc(this.toc);
    },
    getDoms() {
      // 根据toc数组 获取 dom元素
      const doms = [];
      const addDoms = (toc) => {
        for (const item of toc) {
          doms.push(document.querySelector(`#${item.anchor}`));
          if (item.children && item.children.length) {
            addDoms(item.children);
          }
        }
      };
      addDoms(this.toc);
      return doms;
    },
  },
  methods: {
    handleSelect(item) {
      location.hash = item.anchor;
    },
    setSelect(scrollDom) {
      // 如果没有传递需要滚动的元素则，不做处理
      if(!scrollDom){
        return;
      }
      console.log(1);
      this.activeAnchor = "";
      const change = 200;
      for (const dom of this.getDoms) {
        if (!dom) {
          continue;
        }
        const top = dom.getBoundingClientRect().top;
        if (top >= 0 && top < change) {
          this.activeAnchor = dom.id;
        } else if (top > change) {
          // 在规定范围的下方
          return;
        } else {
          // 在规定范围的上方
          this.activeAnchor = dom.id;
        }
      }
    },
  },
  created() {
    this.setSelectDebounce = debounce(this.setSelect,100);
    this.$bus.$on("mainScroll", this.setSelectDebounce);
  },
  destoryed() {
    this.$bus.$off("mainScroll", this.setSelectDebounce);
  },
};
</script>

<style lang="less" scoped>
.blog-toc-container {
  h2 {
    font-size: 1.2rem;
    font-weight: bold;
  }
}
</style>