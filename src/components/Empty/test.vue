<template>
  <div class="test">
    <Empty />
  </div>
</template>

<script>
import Empty from "./index";
export default {
  components: {
    Empty,
  },
};
</script>

<style scoped>
.test {
  width: 1000px;
  height: 800px;
  /* background: #abc; */
  border: 1px solid;
  position: relative;
  margin: 100px auto;
}
</style>