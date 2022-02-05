import React from 'react'
import {Loading,useStore} from 'umi'
import {Spin} from 'antd'
const loading = (props:any) => {
  const loading:Loading = useStore().getState().loading;
  if(loading.global){
    return <Spin></Spin>
  }
  return (
    <div>
      {props.children}
    </div>
  )
}

export default loading;
