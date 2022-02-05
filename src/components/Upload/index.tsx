import React, { useEffect, useState } from 'react';
import { Upload,message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
type IProps = {
  defaultSrc?:string,
  onLoad:(url:string)=>void
}
const UploadComp = (props:IProps) => {
  const [loading, setLoading] = useState<boolean>(false); //上传按钮的loading效果
  const [imageUrl, setImageUrl] = useState<string>(props.defaultSrc as string); //显示的图片的url
  // 上传图片按钮
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  );
  const onChange = ({ file, fileList }: any) => {
    if (file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (file.status === 'done') {
      setLoading(false);
      if(file.response.code === 0){
        const url:string = file.response.data.url;
        setImageUrl(url);
        message.success('上传成功')
        props.onLoad(url)
      }else{
        message.error('上传失败')
      }
    }
  };
  return (
    <Upload
      name="img"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action="/api/upload"
      onChange={onChange}
    >
      {imageUrl ? (
        <img src={imageUrl} alt="avatar" style={{ width: '100%',height:'100%' }} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};
export default UploadComp;
