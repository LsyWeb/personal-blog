<template>
  <div class="app-container">
    <PhoneMenu></PhoneMenu>
    <Layout >
      <template #left>
        <div class="left">
          <SiteAside />
        </div>
      </template>
      <template #main>
        <RouterView />
      </template>
      <template #right>
        <div class="right"></div>
      </template>
    </Layout>
    <ToTop />
  </div>
</template>

<script>
import ToTop from "@/components/ToTop";
import Layout from "@/components/Layout";
import SiteAside from "@/components/SiteAside";
import PhoneMenu from "@/components/PhoneMenu";
export default {
  components: {
    Layout,
    SiteAside,
    ToTop,
    PhoneMenu
  },
};
</script>

<style lang="less" scoped>
.app-container {
  width: 100%;
  height: 100vh;
  .left {
    width: 250px;
    height: 100%;
  }
}
</style>