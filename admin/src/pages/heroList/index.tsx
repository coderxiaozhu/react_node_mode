import React, { memo, useEffect, } from 'react';
import { useAtom } from 'jotai';

import {
  HerosWapper
} from './style';
import HerosTable from '../../components/herosTable';
import { getHerosData } from '../../request/heros'
import { herosTableType } from './state';

export const getHerosTableData = async () => {
  const { data } = await getHerosData();
  const newTableData = data.map((item: any) => {
    return {
      key: item._id,
      name: item.name,
      id: item._id,
      avatar: item.avatar
    }
  })
  return newTableData;
}

const Heros = memo(() => {
  // state hooks

  // other hooks
  const [tableData, setTableData] = useAtom(herosTableType);

  useEffect(() => {
    getHerosTableData()
    .then(res => {
      setTableData({
        tableData: res
      })
    })
  }, [setTableData])

  // binding events

  return (
    <HerosWapper>
      <div className='title'>
        英雄列表
      </div>
      <div className='content'>
        <HerosTable tableData={tableData.tableData} />
      </div>
    </HerosWapper>
  )
})

export default Heros