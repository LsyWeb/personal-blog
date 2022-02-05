import React from 'react';
import { Drawer } from 'antd'
import CategoryForm from './CategoryForm'
type IProps = {
  title:string,
  visible:boolean,
}

const CategoryDrawer = (props:IProps) => {

  const onSubmit = (formData:object)=>{
    console.log(formData);
  }

  return (<Drawer
    title={props.title}
    width={500}
    // onClose={props.onClose}
    visible={props.visible}
  >
    <CategoryForm onSubmit={onSubmit} />
  </Drawer>);
};

export default CategoryDrawer;
