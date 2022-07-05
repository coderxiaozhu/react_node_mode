import React, { memo, useEffect, } from 'react';
import { useAtom } from 'jotai';
import { 
  Button
} from 'antd';

import {
  GoodsWapper
} from './style';
import GoodsTable from '../../components/goodsTable';
import { getGoodsData } from '../../request/goods'
import { goodsTableType } from './state';

export const getGoodsTableData = async () => {
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
    getGoodsTableData()
    .then(res => {
      setTableData({
        tableData: res
      })
    })
  }, [setTableData])

  // binding events

  return (
    <GoodsWapper>
      <div className='title'>
        物品列表
      </div>
      <div className='content'>
        <GoodsTable tableData={tableData.tableData} />
      </div>
    </GoodsWapper>
  )
})

export default Categroy