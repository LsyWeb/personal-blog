import React, { useEffect, useState } from 'react';
import { Form, Input ,Button ,Select} from 'antd';
import {messageFormDataType } from '@/types/messageFormDataType'
type IProps = {
  defaultFormData?: messageFormDataType;
  onSubmit: (formData: messageFormDataType) => void;
};
const MessageForm = (props: IProps) => {
  const [buttonType, setButtonType] = useState<'default' | 'primary'>('default');
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  let avatarSelect:any = [1,2,3,4,5,6,7];
  avatarSelect = avatarSelect.map((item:any,i:number)=>{
    return (
      <Select.Option value={`/img/avatar/${i+1}.png`} key={i}>{i+1}.png</Select.Option>
    )
  })
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
  const onFinish = async (values:messageFormDataType) => {
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
  return (
    <div className="message-form-container">
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
          label="用户名"
          name="nickname"
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="内容"
          name="content"
          rules={[{ required: true, message: '请输入留言内容!' }]}
        >
          <Input.TextArea autoSize />
        </Form.Item>
        <Form.Item
          label="头像路径"
          name="avatar"
          rules={[{ required: true, message: '请输入头像路径!' }]}
        >
           <Select >{avatarSelect}</Select>
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

export default MessageForm;
