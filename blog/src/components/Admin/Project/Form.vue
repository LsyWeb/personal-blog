<template>
  <div class="form-container">
    <el-form :model="form" ref="form" :rules="rules">
      <el-form-item label="名称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="form.name" placeholder="请输入项目名称"></el-input>
      </el-form-item>
      <el-form-item
        label="描述"
        prop="description"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="form.description"
          type="textarea"
          autosize
          placeholder="请输入项目描述"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="github链接"
        prop="github"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="form.github"
          placeholder="请输入项目github链接"
        ></el-input>
      </el-form-item>
      <el-form-item label="展示链接" prop="url" :label-width="formLabelWidth">
        <el-input
          v-model="form.url"
          placeholder="请输入项目展示链接"
        ></el-input>
      </el-form-item>
      <el-form-item label="列表展示顺序" prop="order" :label-width="formLabelWidth">
        <el-input
          v-model.number="form.order"
          placeholder="请输入项目展示链接"
        ></el-input>
      </el-form-item>
      <el-form-item label="缩略图" prop="thumb" :label-width="formLabelWidth">
        <Upload :imgUrl="form.thumb" @uploadSuccess="uploadSuccess"></Upload>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth">
        <el-button class="btn" type="primary" size="default" @click="onSubmit"
          >提交</el-button
        >
      </el-form-item>
      <el-form-item :label-width="formLabelWidth">
        <el-button class="btn" type="default" size="default" @click="onClose"
          >取消</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Upload from "../Upload";
export default {
  components:{
    Upload
  },
  props: {
    editForm: Object,
  },
  data() {
    return {
      formLabelWidth:"80",
      form: {
        name: "",
        description: "",
        url: "",
        github: "",
        thumb:"",
        order:1
      },
      rules: {
        name: { required: true, message: "请填写项目名称", trigger: "blur" },
        description: {
          required: true,
          message: "请填写项目描述",
          trigger: "blur",
        },
        github: {
          required: true,
          message: "请填写项目github链接",
          trigger: "blur",
        },
        thumb: {
          required: true,
          message: "请上传项目缩略图",
          trigger: "blur",
        },
        order: {
          required: true,
          message: "请填写项目展示顺序",
          trigger: "blur",
        },
      },
    };
  },
  created(){
    if(this.editForm){
      this.form = this.editForm;
    }
  },
  methods: {
    
    // 表单提交
    onSubmit() {
      if(this.editForm){
        this.$emit("onEditSubmit",this.form);
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log(valid);
          this.$emit("onSubmit", this.form);
        }
      });
    },
    
    // 表单关闭
    onClose() {
      this.$emit("onClose");
    },
    // 上传图片成功事件
    uploadSuccess(url){
      this.form.thumb = url;
    },
  },
};
</script>

<style lang="less" scoped>
.form-container {
  width: 400px;
  margin: 0 auto;
  .btn {
    width: 100%;
  }
}
</style>