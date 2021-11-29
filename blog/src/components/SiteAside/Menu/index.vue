<template>
  <nav class="menu-container">
    <RouterLink
      v-for="item in items"
      :to="{ name: item.name }"
      :key="item.link"
      :exact="item.exact"
      exact-active-class=""
    >
      <div class="icon">
        <Icon :type="item.icon" />
      </div>
      <span>{{ item.title }}</span>
    </RouterLink>
  </nav>
</template>

<script>
import Icon from "@/components/Icon";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      items: [
        {
          name: "Home",
          icon: "home",
          title: "首页",
          exact: true,
        },
        {
          name: "Blog",
          icon: "blog",
          title: "文章",
          exact: true,
        },
        {
          name: "About",
          icon: "about",
          title: "关于我",
          exact: true,
        },
        {
          name: "Project",
          icon: "code",
          title: "项目&效果",
          exact: true,
        },
        {
          name: "Message",
          icon: "chat",
          title: "留言板",
          exact: true,
        },
        {
          name: "Admin",
          icon: "admin",
          title: "管理",
          exact: true,
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.menu-container {
  list-style: none;
  padding: 10px 0;
  box-sizing: border-box;
  a {
    display: block;
    width: 100%;
    font-size: 16px;
    line-height: 30px;
    padding: 10px 50px;
    box-sizing: border-box;
    color: #999;
    &.router-link-active {
      background: rgba(255, 255, 255, 0.08);
      color: #fff;
    }
    &:hover {
      color: #fff;
    }
    .icon {
      display: inline-block;
      width: 30px;
    }
  }
}
</style>