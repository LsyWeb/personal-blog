<template>
  <form
    id="form-data-container"
    ref="container"
    @submit.prevent="handleSubmit"
    class="data-form-container"
  >
    <div class="form-item">
      <div class="input-area">
        <input type="text" v-model="formData.nickname" placeholder="用户昵称" />
        <span>{{ formData.nickname.length }}/10</span>
      </div>
      <div class="error">{{ error.nickname }}</div>
    </div>
    <div class="form-item">
      <div class="input-text">
        <textarea
          maxlength="300"
          v-model="formData.content"
          placeholder="输入内容"
        ></textarea>
        <span>{{ formData.content.length }}/300</span>
      </div>
      <div class="error">{{ error.content }}</div>
    </div>
    <div class="form-item">
      <div class="input-button">
        <button :disabled="isSubmitting">
          {{ isSubmitting ? "提交中..." : "提交" }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        nickname: "",
        content: "",
      },
      error: {
        nickname: "",
        content: "",
      },
      isSubmitting: false,
    };
  },
  methods: {
    handleSubmit() {
      // 如果传递的是空值，那么就提示错误信息
      this.error.nickname = this.formData.nickname ? "" : "请输入昵称";
      this.error.content = this.formData.content ? "" : "请输入评论内容";
      if (this.formData.nickname.length > 10) {
        this.error.nickname = "昵称过长";
      }
      if (this.error.nickname || this.error.content) {
        return;
      }
      this.isSubmitting = true;
      this.formData.avatar = this.getAvatar();
      this.$emit("submit", this.formData, (successMsg) => {
        this.$message({
          message: successMsg,
          type: 'success',
          duration: 3000,
          center:true
        });
        
        this.isSubmitting = false;
        this.formData.nickname = "";
        this.formData.content = "";
      });
    },
    // 获取一个随机头像
    getAvatar() {
      const avatarList = [
        "/img/avatar/1.png",
        "/img/avatar/2.png",
        "/img/avatar/3.png",
        "/img/avatar/4.png",
        "/img/avatar/5.png",
        "/img/avatar/6.png",
      ];
      const random = Math.floor(Math.random() * 4);
      console.log()
      return avatarList[random];
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.data-form-container {
  width: 100%;
  overflow: hidden;
  .form-item {
    margin-bottom: 10px;
    .input-area {
      position: relative;
      width: 50%;
    }
    .input-text {
      position: relative;
      span {
        top: 80%;
      }
    }
    input,
    textarea {
      width: 100%;
      outline: none;
      border: none;
      font-size: 14px;
      box-sizing: border-box;
      border: 1.5px dashed @gray;
      border-radius: 4px;
      &:focus {
        border-color: @success;
      }
    }
    textarea {
      height: 120px;
      padding: 8px 15px;
      resize: none;
    }
    input {
      height: 40px;
      padding: 0 15px;
    }
    span {
      color: @gray;
      font-size: 12px;
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
      right: 5px;
    }
    .error {
      margin-top: 6px;
      font-size: 14px;
      color: @danger;
      height: 20px;
      line-height: 20px;
    }
    button {
      background: @primary;
      cursor: pointer;
      border: none;
      outline: none;
      padding: 5px 30px;
      border-radius: 4px;
      color: #fff;
      &:hover {
        background: darken(@primary, 10%);
      }
      &:disabled {
        background: lighten(@primary, 20%);
        cursor: not-allowed;
      }
    }
  }
}
</style>