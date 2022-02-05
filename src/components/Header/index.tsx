import React from 'react';
import { Button , message} from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import { connect,Dispatch, history, useStore} from 'umi'
import styles from './index.less'
type IProps = {
  onLoginOut:()=>void
}
const Header:React.FC<IProps> = (props) => {
  const userInfo = useStore().getState().userInfo;
  if(userInfo){
    return (
      <div className={styles.header}>
        <span className={styles.userName}>{userInfo.account}</span>
        <Button ghost icon={<LoginOutlined /> } style={{border:'none'}} onClick={()=>{
          props.onLoginOut && props.onLoginOut();
        }}>退出登录</Button>
      </div>
    );
  }else{
    return (
      <div className={styles.header}>
        <span className={styles.userName}>您还没有登录</span>
        <Button ghost style={{border:'none'}} onClick={()=>{
          props.onLoginOut && props.onLoginOut();
        }}>登录</Button>
      </div>
    )
  }
  
};

const mapDispatchToProps = (dispatch:Dispatch) => ({
  async onLoginOut(){
    await dispatch({
      type:'userInfo/loginOut'
    })
    message.success('已退出');
    history.push('/login');
  }
})
export default connect(null,mapDispatchToProps)(Header)