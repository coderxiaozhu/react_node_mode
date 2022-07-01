import React, { memo } from 'react';
import { Button, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';

export interface DataType {
    key: string;
    userId: string;
    name: string;
}

export interface TableData {
    tableData: DataType[]
}

const columns: ColumnsType<DataType> = [
    {
      title: '序号',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: '分类名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button>编辑</Button>
          <Button>删除</Button>
        </Space>
      ),
    },
];

const CategoryTable: React.FC<TableData> = memo((data: TableData) => {
    return (
        <Table columns={columns} dataSource={data.tableData} />
    )
})

export default CategoryTable