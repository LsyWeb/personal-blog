<template>
  <div class="form-container">
    <el-form :model="form" ref="form" :rules="rules">
      <el-form-item label="分类名称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="form.name" placeholder="请输入分类名称"></el-input>
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
export default {
  props:{
    editForm:Object
  },
  data(){
    return {
      formLabelWidth:'80',
      form:{
        name:''
      },
      rules:{
        name:{required:true,message:'请填写分类名称',trigger:'blur'}
      }
    }
  },
  mounted(){
    if(this.editForm){
      this.form = this.editForm;
    }
  },
  methods:{
    // 提交事件
    onSubmit(){
      if(this.editForm){
        this.$emit('onEditSubmit',this.form)
        return;
      }
      this.$refs.form.validate((valid,error)=>{
        if(valid){
          this.$emit('onSubmit',this.form)
        }else{
          console.log(error)
        }
      })
    },
    // 取消按钮点击事件
    onClose(){
      this.$emit('onClose')
    }
  }
}
</script>

<style scoped lang="less">
.form-container {
  width: 300px;
  margin: 0 auto;
  .btn {
    width: 100%;
  }
}
</style>