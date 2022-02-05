import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select,Modal } from 'antd';
import { getAllCategory } from '@/api/category';
import Upload from '@/components/Upload';
import { blogFormDataType } from '@/types/blogFormDataType';
import axios from '@/api/request';
import Editor from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

type IProps = {
  defaultFormData?: blogFormDataType;
  onSubmit: (formData: blogFormDataType) => void;
};
const BlogForm = (props: IProps) => {
  const [categoryData, setCategoryData] = useState<Array<any>>([]); //博客分类数据
  const [buttonType, setButtonType] = useState<'default' | 'primary'>('default');
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);//提交按钮是否显示loading
  const [contentModalVisible , setContentModalVisible] = useState<boolean>(false);//博客内容编辑器是否显示
  const [contentValue , setContentValue] = useState<string>(props.defaultFormData && props.defaultFormData.content || '');//博客内容md格式
  const [form] = Form.useForm();
  // 获取博客分类数据
  useEffect(() => {
    getAllCategory().then((res) => {
      if ( res.data && !(res.data instanceof Array) ) {
        setCategoryData(res.data.rows as any );
      }
    });
    // 如果传入了默认值，则 设置为form的值,并设置按钮的颜色
    if(props.defaultFormData){
      form.setFieldsValue(props.defaultFormData);
      
      setButtonType('primary');
    }
  }, [props.defaultFormData]);
  // 分类选择框
  const categorySelect = categoryData.map((item) => (
    <Select.Option key={item.id} value={item.id}>
      {item.name}
    </Select.Option>
  ));

  /**
   * 表单提交事件
   * @param {object} value 所有字段的值
   */
  const onFinish = async (value: object) => {
    setIsButtonLoading(true);
    await props.onSubmit({
      ...value,
      scanNumber: 0,
      commentNumber: 0,
    } as blogFormDataType);
    setIsButtonLoading(false);
  };
  /**
   * 表单字段的值变化事件
   * @param changedValues 变化的字段的值
   * @param allValues 所有字段的值
   */
  const onValuesChange = (changedValues: any, allValues: object) => {
    for (const prop in allValues) {
      const value = allValues[prop];
      if (value === undefined || value === '') {
        setButtonType('default');
        return;
      }
    }
    setButtonType('primary');
  };
  // 图片上传事件
  const onLoad = (url: string) => {
    form.setFieldsValue({
      thumb: url,
    });
  };
  // 文章内容编辑确定
  const onEditor = () =>{
    
    form.setFieldsValue({
      content:contentValue
    })
    setContentModalVisible(false);
  }
  // markdown编辑器的图片上传
  const  onUploadImg = async (files: FileList, callback: (urls: string[]) => void) =>  {
    const res = await Promise.all(
      Array.from(files).map((file) => {
        return new Promise((revsolve, reject) => {
          const form = new FormData();
          form.append('img', file);
  
          axios
            .post('/api/upload', form, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            .then((res) => revsolve(res))
            .catch((error) => reject(error));
        });
      })
    );
  
    callback(res.map((item: any) => item.data.url));
  }
  
  return (
    <div className="blog-form-container">
     <Form
        form={form}
        name="blog"
        initialValues={props.defaultFormData}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
        onFinish={onFinish}
        onValuesChange={onValuesChange}
      >
        <Form.Item
          label="标题"
          name="title"
          rules={[{ required: true, message: '请输入博客标题!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="描述"
          name="description"
          rules={[{ required: true, message: '请输入博客描述!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="分类"
          name="categoryId"
          rules={[{ required: true, message: '请选择博客分类!' }]}
        >
          <Select loading={categoryData.length === 0} >{categorySelect}</Select>
        </Form.Item>
        <Form.Item
          label="内容"
          name="content"
          rules={[{ required: true, message: '请编写博客内容!' }]}
        >
          <Button style={{ width: '100%' }} onClick={()=>setContentModalVisible(true)}>查看博客内容</Button>
        </Form.Item>
        <Form.Item
          label="缩略图"
          name="thumb"
          rules={[{ required: true, message: '请上传博客缩略图!' }]}
        >
          <Upload
            onLoad={onLoad}
            defaultSrc={
              props.defaultFormData && (props.defaultFormData.thumb as string)
            }
          ></Upload>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
          <Button type={buttonType} htmlType="submit" loading={isButtonLoading} style={{ width: '100%' }}>
            提交
          </Button>
        </Form.Item>
      </Form>
      <Modal
        title="博客内容"
        centered
        destroyOnClose
        visible={contentModalVisible}
        onOk={onEditor}
        onCancel={() => setContentModalVisible(false)}
        width={1000}
      >
        <Editor modelValue={contentValue} onChange={(value:any)=>setContentValue(value)} onUploadImg={onUploadImg}/>
      </Modal>
    </div>
  );
};

export default BlogForm;
