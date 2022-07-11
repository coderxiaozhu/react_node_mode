import React, { memo, useEffect, useState } from 'react';
import { 
  Button, 
  Space, 
  Table,
  message, 
  Popconfirm
} from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { useNavigate } from 'react-router-dom';

import {
  GoodsWapper
} from './style';
import { DataType } from './types'
import { getGoodsData, deleteGoods } from '../../request/goods';

const Goods = memo(() => {
  // state hooks
  const [tableData, setTableData] = useState<DataType[]>([]);

  const navigator = useNavigate();
  useEffect(() => {
    getGoodsData()
    .then(res => {
      setTableData(res.data);
    })
  }, [setTableData])

  // binding events
  const cancel = () => {
    message.error('取消删除');
  };
  const columns: ColumnsType<DataType> = [
    {
      title: 'id',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: '英雄名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '英雄图标',
      key: 'icon',
      render: (_, record) => (
        <div>
          <img src={record.icon} alt={record.name} style={{width:'60px'}} />
        </div>
      )
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={ e => {
            navigator(`/home/goods/add/${ record._id }`)
          } } type="primary">编辑</Button>
          <Popconfirm
            title="确认删除此物品?"
            onConfirm={async() => {
              const res = await deleteGoods(record._id);
              if(res.data.success === true) {
                message.success("删除成功！");
                getGoodsData()
                .then(res => {
                  setTableData(res.data);
                })
              }
            }}
            onCancel={e => cancel}
            okText="确定"
            cancelText="取消"
          >
          <Button 
            danger
            style={{ margin: "0 10px" }}>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <GoodsWapper>
      <div className='title'>
        物品列表
      </div>
      <div className='content'>
      <Table rowKey="_id" columns={columns} dataSource={tableData} />   
      </div>
    </GoodsWapper>
  )
})

export default Goods