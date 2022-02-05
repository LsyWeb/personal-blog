import { editSetting, getSetting } from '@/api/setting';
import { settingFormDataType } from '@/types/settingFormDataType';
import React, { useEffect, useState } from 'react';
import { message, Spin } from 'antd';
import SettingForm from './components/SettingForm';
import getDate from '@/utils/getDate';

const setting = () => {
  const [settingData, setSettingData] = useState<any>();//获取全局设置数据
  const onSubmit = async (formData: settingFormDataType) => {
    const res = await editSetting(settingData.id,formData);
    if(res.code === 0){
      message.success(res.msg);
    }
    else{
      message.error(res.msg);
    }
  };
  const fetchData = async () => {
    const res = await getSetting();
    if (res.code === 0 && res.data) {
      setSettingData(res.data);
    } else {
      message.error('获取数据失败');
    }
  };
  useEffect(() => {
    fetchData();

    return () => {};
  }, []);

  return (
    <div className="setting-container" style={{ width: 500, margin: '0 auto' }}>
      {settingData ? (
        <>
          <SettingForm onSubmit={onSubmit} defaultFormData={settingData}  />
          <span style={{ color: '#999', fontSize: 12 ,textAlign:'right',display:'block'}}>
            上一次修改时间：{settingData && getDate(settingData.updatedAt)}
          </span>
        </>
      ) : (
        <Spin
          style={{
            width: 500,
            minHeight: 300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        ></Spin>
      )}
    </div>
  );
};

setting.title = '全局设置';
setting.wrappers = ['@/wrappers/auth'];
export default setting;
