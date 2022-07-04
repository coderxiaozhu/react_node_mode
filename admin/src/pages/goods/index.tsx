import React, { memo, useEffect, } from 'react';
import { useAtom } from 'jotai';
import { 
  Button
} from 'antd';

import {
  GoodsWapper
} from './style';
import GoodsTable from '../../components/goodsTable';
import BaseGoodsModel from '../../components/baseGoodsModel';
import { getGoodsData } from '../../request/goods'
import { modelValue, modelTitle, goodsTableType } from './state';

export const getCategoryTableData = async () => {
  const { data } = await getGoodsData();
  const newTableData = data.map((item: any) => {
    return {
      key: item._id,
      name: item.name,
      id: item._id,
      icon: item.icon
    }
  })
  return newTableData;
}

const Categroy = memo(() => {
  // state hooks

  // other hooks
  const [tableData, setTableData] = useAtom(goodsTableType);

  useEffect(() => {
    getCategoryTableData()
    .then(res => {
      setTableData({
        tableData: res
      })
    })
  }, [setTableData])
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
    <GoodsWapper>
      <div className='title'>
        物品列表
      </div>
      <div className='content'>
        <Button type="primary" size='large' onClick={ e => showModal() } className={"add_btn"}>添加物品</Button>
        <BaseGoodsModel />
        <GoodsTable tableData={tableData.tableData} />
      </div>
    </GoodsWapper>
  )
})

export default Categroy