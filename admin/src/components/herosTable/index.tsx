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
  editHerosId, 
  editHerosName, 
} from '../../pages/heroList/state';
import { deleteHeros } from '../../request/heros'

export interface DataType {
    key: string;
    name: string;
    id: string;
    avatar: string;
    title: string
}

export interface TableData {
    tableData: DataType[]
}

const HerosTable: React.FC<TableData> = memo((data: TableData) => {
    const confirm = (record: DataType) => {
      deleteHeros(record.id, {
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
        title: '称号',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: '英雄头像',
        key: 'avatar',
        render: (_, record) => (
          <div>
            <img src={record.avatar} alt={record.name} />
          </div>
        )
      },
      {
        title: '操作',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <Button onClick={ e => editHerosData(record) }>编辑</Button>
            <Popconfirm
              title="确认删除此英雄?"
              onConfirm={e => confirm(record)}
              onCancel={e => cancel}
              okText="确定"
              cancelText="取消"
            >
            <Button>删除</Button>
            </Popconfirm>
          </Space>
        ),
      },
    ];
    // 编辑英雄某一项的id
    const [, setHerosId] = useAtom(editHerosId);
    // 编辑英雄某一项的值
    const [, setHerosName] = useAtom(editHerosName);
    const navigate = useNavigate();
    // binding event
    const editHerosData = (record: DataType) => {
      setHerosId(record.id);
      setHerosName(record.name);
      navigate(`/home/heros/add/${ record.id }`);
    }

    return (
      <>
        <Table columns={columns} dataSource={data.tableData} />   
      </>
    )
})

export default HerosTable