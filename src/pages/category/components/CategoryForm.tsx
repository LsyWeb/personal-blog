import React, { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';

type IProps = {
  defaultFormData?: object;
  onSubmit: (formData: {name:string}) => void;
};
const BlogForm = (props: IProps) => {
  const [buttonType, setButtonType] = useState<'default' | 'primary'>('default');
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  
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
  const onFinish = async (value: {name:string}) => {
    setIsButtonLoading(true);
    await props.onSubmit(value);
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
          label="分类名称"
          name="name"
          rules={[{ required: true, message: '请输入分类名称!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
          <Button type={buttonType} htmlType="submit" loading={isButtonLoading} style={{ width: '100%' }}>
            提交
          </Button>
        </Form.Item>
      </Form>

    </div>
  );
};

export default BlogForm;
