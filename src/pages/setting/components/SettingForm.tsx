import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Modal } from 'antd';
import Upload from '@/components/Upload';
import { settingFormDataType } from '@/types/settingFormDataType';

type IProps = {
  defaultFormData?: settingFormDataType;
  onSubmit: (formData: settingFormDataType) => void;
};
const SettingForm = (props: IProps) => {
  const [buttonType, setButtonType] = useState<'default' | 'primary'>('default');
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);//提交按钮是否显示loading
  const [form] = Form.useForm();
  // 获取博客分类数据
  useEffect(() => {
    // 如果传入了默认值，则 设置为form的值,并设置按钮的颜色
    if (props.defaultFormData) {
      form.setFieldsValue(props.defaultFormData);
      setButtonType('primary');
    }
  }, [props.defaultFormData]);

  /**
   * 表单提交事件
   * @param {object} value 所有字段的值
   */
  const onFinish = async (value: object) => {
    setIsButtonLoading(true);
    await props.onSubmit({
      ...value,
    } as settingFormDataType);
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
    <div className="setting-form-container">
      <Form
        form={form}
        name="setting"
        initialValues={props.defaultFormData}
        size="middle"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        onFinish={onFinish}
        onValuesChange={onValuesChange}
      >
        <Form.Item
          label="首页标题"
          name="siteTitle"
          rules={[{ required: true, message: '请输入首页标题!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="github用户名"
          name="githubName"
          rules={[{ required: true, message: '请输入github用户名!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="github主页地址"
          name="github"
          rules={[{ required: true, message: '请输入github主页地址!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="邮箱"
          name="email"
          rules={[{ required: true, message: '请输入email!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="qq号"
          name="qq"
          rules={[{ required: true, message: '请输入qq号!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="weixin号"
          name="weixin"
          rules={[{ required: true, message: '请输入微信号!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="icp备案号"
          name="icp"
          rules={[{ required: true, message: '请输入icp备案号!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="头像"
          name="avatar"
          rules={[{ required: true, message: '请上传博客缩略图!' }]}
        >
          <Upload
            onLoad={(url) => {
              form.setFieldsValue({ avatar: url });
            }}
            defaultSrc={
              props.defaultFormData && (props.defaultFormData.avatar)
            }
          ></Upload>
        </Form.Item>
        <Form.Item
          label="网页小图标"
          name="favicon"
          rules={[{ required: true, message: '请上传网页小图标!' }]}
        >
          <Upload
            onLoad={(url) => {
              form.setFieldsValue({ favicon: url });
            }}
            defaultSrc={props.defaultFormData && props.defaultFormData.favicon}
          ></Upload>
        </Form.Item>
        <Form.Item
          label="qq二维码"
          name="qqQrCode"
          rules={[{ required: true, message: '请上传qq二维码!' }]}
        >
          <Upload
            onLoad={(url) => {
              form.setFieldsValue({ qqQrCode: url });
            }}
            defaultSrc={
              props.defaultFormData && (props.defaultFormData.qqQrCode)
            }
          ></Upload>
        </Form.Item>
        <Form.Item
          label="微信二维码"
          name="weixinQrCode"
          rules={[{ required: true, message: '请上传微信二维码!' }]}
        >
          <Upload
            onLoad={(url) => {
              form.setFieldsValue({ weixinQrCode: url });
            }}
            defaultSrc={
              props.defaultFormData && (props.defaultFormData.weixinQrCode)
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

export default SettingForm;
