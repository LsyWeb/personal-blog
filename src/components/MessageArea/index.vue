<template>
  <div class="message-area-container">
    <DataFrom @submit="handleSubmit" />
    <h3>
      {{ title }}
      <span>{{ subTitle }}</span>
    </h3>
    <DataList :list="list" />
  </div>
</template>

<script>
import DataFrom from "./DataForm";
import DataList from "./DataList";
export default {
  props: {
    title: String,
    subTitle: Number,
    list: {
      type: Array,
      defaulted: [],
    },
    isListLoading: {
      type: Boolean,
      defaulted: false,
    },
  },
  components: {
    DataFrom,
    DataList,
  },
  methods: {
    handleSubmit(formData, callback) {
      this.$emit("submit", formData, callback);
    },
  },
};
</script>

<style>
.message-area-container {
  overflow: hidden;
}
</style>