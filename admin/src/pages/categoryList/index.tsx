import React, { memo, useEffect, useState, } from 'react';
import { 
  Button, 
  Space, 
  Table,
  message, 
  Popconfirm
} from 'antd';
import { useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/lib/table';
import { DataType } from './types'

import {
  CategoryWapper
} from './style';
import { deleteCategory, getCategoryData } from '../../request/category'

const Categroy = memo(() => {
  // state hooks
  const [tableData, setTableData] = useState([])
  const navigate = useNavigate();
  const columns: ColumnsType<DataType> = [
    {
      title: "id",
      dataIndex: "_id"
    },
    {
      title: "上级分类",
      dataIndex:"parents",
      render: (text, record, index) => {
        if(record.parents){
          return record.parents.name
        }else return
      }
    },
    {
      title: "名称",
      dataIndex: "name"
    },
    {
      title: "操作",
      render: (txt, record, index) => {
        return (
          <div>
            <Button
              type="primary"
              onClick={() => {
                navigate(`/home/categories/add/${record._id}`)
              }}
            >
              修改
            </Button>
            <Popconfirm
              title="确认删除此分类?"
              onCancel={() => message.info("取消删除")}
              onConfirm={async () => {
                const res = await deleteCategory(record._id);
                if(res.status === 200) {
                  message.success("删除成功");
                  getCategoryData()
                  .then(res => {
                    setTableData(res.data);
                  })
                }
              }}
            >
              <Button
                danger
                style={{ margin: "0 10px" }}
              >
                删除
              </Button>
            </Popconfirm>
          </div>
        );
      }
    }
  ];
  useEffect(() => {
    getCategoryData()
    .then(res => {
      setTableData(res.data);
    })
  }, [setTableData])

  // binding events
  return (
    <CategoryWapper>
      <div className='title'>
        分类列表
      </div>
      <div className='content'>
        <Table 
        rowKey={"_id"}
        dataSource={tableData}
        columns={columns}
         />
      </div>
    </CategoryWapper>
  )
})

export default Categroy