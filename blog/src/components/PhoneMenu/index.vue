<template>
  <div class="phone-container">
    <div class="phone-header hidden-sm-and-up">
      <h1>刘帅洋的个人博客</h1>
      <div class="menu-phone-btn" @click="onMenuBtnClick">
        <!-- <i class="iconfont icon-ziyuan" style="font-size: 24px"></i> -->
        <i v-show="!isShowMenu" class="el-icon-s-fold" style="font-size: 24px"></i>
        <i v-show="isShowMenu" class="el-icon-s-unfold" style="font-size: 24px"></i>
      </div>
    </div>
    <transition name="menu">
      <Menu v-show="isShowMenu" @click.native="menuClick" class="menu-phone" />
    </transition>
  </div>
</template>

<script>
import Menu from "../SiteAside/Menu";
export default {
  components: {
    Menu,
  },
  data() {
    return {
      isShowMenu: false,
      menuHeight: "0px",
    };
  },
  watch:{
    $route(){
      if(this.isShowMenu)this.isShowMenu = false;
    }
  },
  methods: {
    onMenuBtnClick() {
      this.isShowMenu = !this.isShowMenu;
    },
    menuClick() {
      this.isShowMenu = false;
    },
  },
};
</script>

<style lang="less" scoped>
.phone-container{
  overflow: hidden;
}
.phone-header {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 10px 20px;
  box-sizing: border-box;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1);
  z-index: 10;
  h1 {
    font-size: 20px;
    padding: 0;
    margin: 0;
    font-weight: normal;
  }
  .menu-phone-btn {
    border-radius: 5px;
  }
}
.menu-phone {
  position: fixed;
  top: 60px;
  right: 0;
  z-index: 9;
  background: #333;
}
.menu-enter-active,
.menu-leave-active {
  transition: all 0.3s;
  opacity: 1;
}
.menu-enter, .menu-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(100%);
}
</style>