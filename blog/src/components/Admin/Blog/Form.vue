<template>
  <div class="form-container">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="标题" prop="title" :label-width="formLabelWidth">
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item
        label="描述"
        prop="description"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="form.description"
          autocomplete="off"
          placeholder="请输入描述"
        ></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content" :label-width="formLabelWidth">
        <el-input
        ref="contentInput"
          v-model="form.contentText"
          autocomplete="off"
          @focus="onEditContent"
          :placeholder="editForm ? '点击查看/编辑内容' : '点击编写内容'"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="分类"
        prop="categoryId"
        :label-width="formLabelWidth"
      >
        <el-select
          v-model="form.categoryId"
          placeholder="请选择分类"
          clearable
          filterable
        >
          <el-option
            v-for="item in categoryOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
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
    <el-dialog
      title="编辑博客内容"
      :visible.sync="editContentDialogVisible"
      width="60%"
      center
      append-to-body
      :close-on-click-modal="false"
    >
      <div id="editContent"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editContentDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editContentSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import E from "wangeditor";
import Upload from "../Upload";
import { getBlogCategory } from "@/api/blog";
export default {
  components: {
    Upload,
  },
  props: {
    editForm: Object,
  },
  data() {
    return {
      formLabelWidth: "80px",
      form: {
        title: "",
        description: "",
        content: "",
        contentText: "",
        categoryId: "",
        thumb: "",
        scanNumber: 0,
        commentNumber: 0,
      },
      rules: {
        title: { required: true, message: "请填写博客标题", trigger: "blur" },
        description: {
          required: true,
          message: "请填写博客描述",
          trigger: "blur",
        },
        content: { required: true, message: "请填写博客内容", trigger: "blur" },
        categoryId: { required: true, message: "请选择分类", trigger: "blur" },
        thumb: { required: true, message: "请上传图片", trigger: "blur" },
      },
      categoryOptions: [],
      editContentDialogVisible: false,
      ediotr: null,
    };
  },

  async created() {
    // 初始化数据
    if (this.editForm) {
      this.form = { ...this.form, ...this.editForm };
    }
    const res = await getBlogCategory(); //获取所有分类数据
    console.log(res);
    this.categoryOptions = res.rows.map((item) => {
      return {
        value: item.id,
        label: item.name,
      };
    });
  },
  methods: {
    // 编辑内容提交
    editContentSubmit() {
      const html = this.editor.txt.html();
      this.form.content = html;
      this.form.contentText = this.editor.txt.text();
      this.editContentDialogVisible = false;
    },
    // 上传图片成功
    uploadSuccess(url) {
      this.form.thumb = url;
    },
    // 编辑博客内容弹窗显示
    onEditContent() {
      this.editContentDialogVisible = true;
      if (this.editor) {
        return;
      }
      this.$nextTick(() => {
        // 以下全是富文本编辑器的配置
        this.editor = new E("#editContent");
        this.editor.config.height = 400;
        this.editor.config.uploadImgServer = "/api/upload";
        this.editor.config.uploadFileName = "img";
        this.editor.create();
        this.editor.config.uploadImgHooks = {
          customInsert(insertImgFn, result) {
            insertImgFn(result.data.url);
          },
        };
        if (this.editForm) {
          this.editor.txt.html(this.form.content);
        }
      });
    },
    // 表单提交按钮
    onSubmit() {
      if (this.editForm) {
        //如果是编辑则提交到编辑事件
        this.$emit("onEditSubmit", this.form);
        return;
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit("onSubmit", this.form);
        }
      });
    },
    // 取消按钮
    onClose() {
      this.$emit("onClose");
    },
  },
};
</script>

<style scoped lang="less">
.form-container {
  width: 400px;
  margin: 0 auto;
  .btn {
    width: 100%;
  }
}
</style>