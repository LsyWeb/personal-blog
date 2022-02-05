import React, { useEffect, useRef, useState } from 'react';
import { Select ,Button} from 'antd';
const { Option } = Select;
import SearchBar from '@/components/SearchBar';
type IProps = {
  categoryList:Array<any>,
  onSearch:(value:string)=>void,
  onSelectChange:(value:number|string)=>void,
  onBack:() => void
}
const BlogSearchBar = (props:IProps) => {
  const [selectValue,setSelectValue] = useState<string>('全部');
  const [selectOpen ,setSelectOpen] = useState<boolean>(false);
  const asyncOptions = props.categoryList.map(item => (
    <Option value={item.id} key={item.id}>{item.name}</Option>
  ))
  const defaultOptions = [<Option vlaue={-1} key={-1}>全部</Option>].concat(asyncOptions);
  const onSelectChange = (value:number|string) =>{
    setSelectValue(value as string);
    props.onSelectChange && props.onSelectChange(value);
  }
  const onSearch = (value:string) =>{
    props.onSearch && props.onSearch(value);
  }
  const cateRef = useRef<any>(null);
  return (
    <div className="blog-search-bar-container">
      <SearchBar
        addLink='/blog/add'
        addText='新增博客'
        searchKey='标题'
        onSearch={onSearch}
        onBack={()=>{
          setSelectValue('全部')
          props.onBack();
        }}
      >
        <Button type="text"  onClick={()=>{
          cateRef.current && cateRef.current.focus();
          setSelectOpen(true);
        }}>分类:</Button>
        <Select style={{margin:'0 10px'}} ref={cateRef} open={selectOpen} onFocus={()=>setSelectOpen(true)} onBlur={()=>setSelectOpen(false)} placeholder="请选择分类" value={selectValue}  onChange={onSelectChange}>
          {defaultOptions}
        </Select>
      </SearchBar>
    </div>
  );
};

export default BlogSearchBar;
