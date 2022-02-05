import React, { ReactNode, useState } from 'react';
import { Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import {history, NavLink} from 'umi'
import style from './index.less';

type IProps = {
  onSearch: (searchValue: string) => void;
  onBack:() => void,
  addText:string,
  addLink:string,
  searchKey:string
};

const SearchBar: React.FC<IProps> = (props) => {
  useState();
  const [searchValue, setSearchValue] = useState<string>('');//搜索值
  const [buttonType, setButtonType] = useState<'default' | 'primary'>('default');//搜索按钮的 type 值
  const [isSearch, setIsSearch] = useState<boolean>(false); //是否搜索过，只有搜索过，清空输入框的时候才会重新加载数据，（避免在没有查询的前提前，输入几个字之后，没有进行查询，直接清空输入框的时候会 重新加载数据 ）
  const onSearch = () => {
    setIsSearch(true);
    props.onSearch && props.onSearch(searchValue);
  };
  
  return (
    <div className={style['search-bar-container']}>
      <div>
      <Input
        style={{ width: 300 ,marginRight:10}}
        placeholder={`输入${props.searchKey}进行搜索`}
        allowClear
        value={searchValue}
        onPressEnter={onSearch}
        onChange={(e) => {
          setSearchValue(e.target.value);
          if(e.target.value !== ''){
            setButtonType('primary');
          }else{
            setButtonType('default');
            isSearch && props.onBack();
            setIsSearch(false);
          }
        }}
      ></Input>
      <Button
        type={buttonType}
        icon={<SearchOutlined />}
        onClick={onSearch}
      >搜索</Button>
      {props.children}
      </div>
      <div className={style['search-add-button']}>
        <Button type='primary' onClick={()=>{history.push(props.addLink)}}> {props.addText}</Button>
      </div>
    </div>
  );
};

export default SearchBar;
