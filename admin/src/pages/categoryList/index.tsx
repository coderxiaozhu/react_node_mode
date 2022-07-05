import React, { memo, useEffect, } from 'react';
import { useAtom } from 'jotai';

import {
  CategoryWapper
} from './style';
import CategoryTable from '../../components/categoryTable'
import { getCategoryData } from '../../request/category'
import { CategoryTableType } from './state';

export const getCategoryTableData = async () => {
  const { data } = await getCategoryData();
  const newTableData = data.map((item: any) => {
    return {
      key: item._id,
      name: item.name,
      id: item._id,
      parents: item.parents ? item.parents : {},
      parentsName: item.parents ? item.parents.name : "",
    }
  })
  return newTableData;
}

const Categroy = memo(() => {
  // state hooks

  // other hooks
  const [tableData, setTableData] = useAtom(CategoryTableType);

  useEffect(() => {
    getCategoryTableData()
    .then(res => {
      setTableData({
        tableData: res
      })
    })
  }, [setTableData])

  // binding events
  return (
    <CategoryWapper>
      <div className='title'>
        分类列表
      </div>
      <div className='content'>
        <CategoryTable tableData={tableData.tableData} />
      </div>
    </CategoryWapper>
  )
})

export default Categroy