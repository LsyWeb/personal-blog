import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber ,Button } from 'antd';
import Upload from '@/components/Upload'
import {projectFormDataType } from '@/types/projectFormDataType'
type IProps = {
  defaultFormData?: projectFormDataType;
  onSubmit: (formData: projectFormDataType) => void;
};
const ProjectForm = (props: IProps) => {
  const [buttonType, setButtonType] = useState<'default' | 'primary'>('default');
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);//提交按钮是否显示loading
  const [form] = Form.useForm();
  // 获取博客分类数据
  useEffect(() => {
    // 如果传入了默认值，则 设置为form的值,并设置按钮的颜色
    if(props.defaultFormData){
      form.setFieldsValue(props.defaultFormData);
      setButtonType('primary')
    }
  }, [props.defaultFormData]);

  /**
   * 表单提交事件
   * @param {object} value 所有字段的值
   */
  const onFinish = async (values:projectFormDataType) => {
    setIsButtonLoading(true);
    await props.onSubmit(values);
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
  return (
    <div className="blog-form-container">
     <Form
        form={form}
        name="project"
        initialValues={props.defaultFormData}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        onFinish={onFinish}
        onValuesChange={onValuesChange}
      >
        <Form.Item
          label="项目名称"
          name="name"
          rules={[{ required: true, message: '请输入项目名称!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="项目描述"
          name="description"
          rules={[{ required: true, message: '请输入项目描述!' }]}
        >
          <Input.TextArea autoSize />
        </Form.Item>
        <Form.Item
          label="访问链接"
          name="url"
          rules={[{ required: true, message: '请输入访问链接!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="github链接"
          name="github"
          rules={[{ required: true, message: '请输入github链接!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="展示顺序"
          name="order"
          rules={[{ required: true, message: '请输入展示顺序!' }]}
        >
          <InputNumber style={{width:'100%'}} min={1}/>
        </Form.Item>
        <Form.Item
          label="上传缩略图"
          name="thumb"
          rules={[{ required: true, message: '请上传缩略图!' }]}
        >
           <Upload
            onLoad={onLoad}
            defaultSrc={
              props.defaultFormData && (props.defaultFormData.thumb)
            }
          ></Upload>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Button type={buttonType} htmlType="submit" loading={isButtonLoading} style={{ width: '100%' }}>
            提交
          </Button>
        </Form.Item>
      </Form>

    </div>
  );
};

export default ProjectForm;
