<template>
  <div class="login-container">
    <h2>登录</h2>
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      label-width="60px"
      :inline="false"
      size="normal"
    >
      <el-form-item label="账号" prop="rootName">
        <el-input
          v-model="form.rootName"
          size="small"
          placeholder="请输入管理员账号"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="rootName">
        <el-input
          v-model="form.rootPwd"
          size="small"
          type="password"
          placeholder="请输入管理员密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="btn" type="primary" size="small" @click="onSubmit"
          >{{loading? '登录中' : '登录'}}</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      form: {
        rootName: "",
        rootPwd: "",
      },
      rules: {
        rootName: {
          required: true,
          message: "请输入管理员账号",
          trigger: "blur",
        },
        rootPwd: {
          required: true,
          message: "请输入管理员密码",
          trigger: "blur",
        },
      },
    };
  },
  computed:{
    ...mapState(['login','loading'])
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async(valid) => {
        if (valid) {
          if (
            this.form.rootName === "liushuaiyang" &&
            this.form.rootPwd === "lsy090017"
          ) {
            this.$message({
              message: '登录成功',
              type: 'success',
              showClose: true,
              duration: 2000,
            });
            await this.$store.dispatch('login/login',{...this.form});
            console.log(this.$store.state.login.user);
            this.$router.push('/admin');
          }else{
            this.$message({
              message: '用户名或密码错误',
              type: 'error',
              showClose: true,
              duration: 2000,
            });
            
          }
        }
      });
    },
  },
};
</script>

<style lang="less" spcoed>
.login-container {
  width: 300px;
  margin: 100px auto;
  h2{
    text-align: center;
  }
  .btn {
    width: 100%;
  }
}
</style>