<template>
  <div class="upload">
    <el-upload
      action="/api/upload"
      list-type="picture-card"
      name="img"
      :file-list="fileList"
      auto-upload
      :on-success="onUploadSuccess"
    >
      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{ file }">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in"></i>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  props:{
    imgUrl:String
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      fileList: [],
    };
  },
  mounted(){
    console.log(this.imgUrl)
    if(this.imgUrl){
      console.log(this.imgUrl)
      this.fileList.push({
        url:this.imgUrl,
      })
    }
  },
  methods: {
    // 删除已上传的图片
    handleRemove(file) {
      this.fileList = this.fileList.filter((item) => item !== file);
    },
    // 查看图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      
    },
    // 上传成功
    onUploadSuccess(file){
      this.$message({
        message: '上传图片成功',
        type: 'success',
        showClose: true,
        duration: 2000,
        center:true
      });
      this.$emit('uploadSuccess',file.data.url)
    }
  },
};
</script>

<style>
</style>