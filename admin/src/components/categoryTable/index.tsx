import React, { memo } from 'react';
import { Button, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { useAtom } from 'jotai';

import { modelValue, modelTitle, editCategoryId } from '../../pages/category/state';
export interface DataType {
    key: string;
    userId: string;
    name: string;
    id: string
}

export interface TableData {
    tableData: DataType[]
}

const CategoryTable: React.FC<TableData> = memo((data: TableData) => {
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
            <Button onClick={ e => editCategoryData(record) }>编辑</Button>
            <Button>删除</Button>
          </Space>
        ),
      },
    ];
    // 弹出框的显示和隐藏
    const [, setIsModalVisible] = useAtom(modelValue);
    // 弹出框的标题
    const [, setModalTitle] = useAtom(modelTitle);
    // 编辑分类的id
    const [, setCategoryId] = useAtom(editCategoryId);
    // binding event
    const editCategoryData = (record: DataType) => {
      setCategoryId(record.id);
      setIsModalVisible(true);
      setModalTitle("编辑")
    }

    return (
        <Table columns={columns} dataSource={data.tableData} />
    )
})

export default CategoryTable