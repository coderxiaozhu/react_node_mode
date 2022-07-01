import React, { memo, useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { 
  Button
} from 'antd';

import {
  CategoryWapper
} from './style';
import CategoryTable from '../../components/categoryTable'
import { TableData } from '../../components/categoryTable';
import BaseModel from '../../components/baseModel';
import { getCategoryData } from '../../request/category'
import { modelValue, modelTitle } from './state'

const Categroy = memo(() => {
  // state hooks
  const [tableData, setTableData] = useState<TableData>({
    tableData: []
  });

  // other hooks
  useEffect(() => {
    getCategoryData()
    .then(res => {
      const newTableData = res.data.map((item: any) => {
        return {
          key: item.userId,
          userId: item.userId,
          name: item.name,
          id: item._id
        }
      })
      setTableData({
        tableData: newTableData
      });
    })
  }, [])
  // 管理模态框的显示隐藏
  const [, setIsModalVisible] = useAtom(modelValue);
  // 管理模态框的标题
  const [, setModalTitleValue] = useAtom(modelTitle);

  // binding events
  const showModal = () => {
    setModalTitleValue("添加");
    setIsModalVisible(true);
  }

  return (
    <CategoryWapper>
      <div className='title'>
        分类列表
      </div>
      <div className='content'>
        <Button type="primary" size='large' onClick={ e => showModal() } className={"add_btn"}>添加分类</Button>
        <BaseModel />
        <CategoryTable tableData={tableData.tableData} />
      </div>
    </CategoryWapper>
  )
})

export default Categroy