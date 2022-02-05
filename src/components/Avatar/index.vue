<template>
  <div class="avatar-container">
    <img
      v-show="show"
      class="avatar-img"
      :src="url"
      @load="onLoad"
      :style="{ width: size + 'px', height: size + 'px' }"
    />
    <div
      v-show="!show"
      class="avatar-bg"
      :style="{
        width: size + 'px',
        height: size + 'px',
        backgroundColor: 'rgba(190,190,190,.2)',
      }"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String, //属性必须是一个字符串
      required: true, //属性必须传入
    },
    size: {
      type: Number,
      default: 150,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    onLoad() {
      this.show = true;
    },
  },
};
</script>

<style>
.avatar-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-img {
  object-fit: cover;
}

.avatar-container,
.avatar-img,
.avatar-bg {
  border-radius: 50%;
}
</style>