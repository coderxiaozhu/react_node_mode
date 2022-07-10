import React, { memo } from 'react';
import { 
  Button, 
  Space, 
  Table,
  message, 
  Popconfirm
} from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

import {
  editGoodsId, 
  editGoodsName, 
} from '../../pages/goods/state';
import { deleteGoods } from '../../request/goods'

export interface DataType {
    key: string;
    name: string;
    id: string;
    icon: string
}

export interface TableData {
    tableData: DataType[]
}

const GoodsTable: React.FC<TableData> = memo((data: TableData) => {
    const confirm = (record: DataType) => {
      deleteGoods(record.id, {
        _id: record.id,
        name: record.name,
        __v: 0
      })
      .then(res => {
        message.success('确认删除');
      })
      window.location.reload();
    };
    
    const cancel = () => {
      message.error('取消删除');
    };
    const columns: ColumnsType<DataType> = [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
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
            <Button onClick={ e => editGoodsData(record) } type="primary">编辑</Button>
            <Popconfirm
              title="确认删除此英雄?"
              onConfirm={e => confirm(record)}
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
    // 编辑英雄某一项的id
    const [, setGoodsId] = useAtom(editGoodsId);
    // 编辑英雄某一项的值
    const [, setGoodsName] = useAtom(editGoodsName);
    const navigate = useNavigate();
    // binding event
    const editGoodsData = (record: DataType) => {
      setGoodsId(record.id);
      setGoodsName(record.name);
      navigate(`/home/goods/add/${ record.id }`);
    }

    return (
      <>
        <Table columns={columns} dataSource={data.tableData} />   
      </>
    )
})

export default GoodsTable