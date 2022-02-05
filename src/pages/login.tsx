import React from 'react'
import { connect, Dispatch, history} from 'umi';
import { message , Button ,Form,Input,Checkbox} from 'antd';
import { dataType } from '@/types/apiDataType';

type Props = {
  onLogin:(account:string,password:string)=> any
}
const Login:React.FC<Props> = (props) => {
  
  const onFinish = (values: any) => {
    props.onLogin && props.onLogin(values.account,values.password);
  };

  const [form] = Form.useForm();
  
  return <div style={{margin:'0 auto',width:300}}>
    <h2 style={{textAlign:'center',}}>登录</h2>
    <Form
      name="lsy-loginForm"
      form={form}
      layout="vertical"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="true"
    >
      <Form.Item
        label="用户名"
        name="account"
        rules={[{ required: true, message: 'Please input your account!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{  span: 24 }}>
        <Button type="primary" htmlType="submit" style={{width:'100%'}}>
          登录
        </Button>
      </Form.Item>
    </Form>
  </div>;
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  async onLogin(account: string, password: string) {
    const res: dataType = await dispatch({
      type: 'userInfo/login',
      payload: { account, password },
    });
    if (res.code === 0) {
      message.success('登录成功');
      history.goBack();
    } else {
      message.error(res.msg);
    }
  },
});

const loginWrapper:any  = connect(null, mapDispatchToProps)(Login);

loginWrapper.title = '登录';
export default loginWrapper

