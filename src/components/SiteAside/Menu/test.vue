<template>
  <div class="test">
    <Menu />
  </div>
</template>

<script>
import Menu from "./index";
import "@/styles/global.less";
export default {
  components: {
    Menu,
  },
};
</script>

<style scoped>
.test {
  width: 300px;
  background: #333;
}
</style>