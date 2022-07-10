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
  editCategoryId, 
  editCategoryName, 
  categoryFather
} from '../../pages/categoryList/state';
import { deleteCategory } from '../../request/category'

export interface DataType {
    key: string;
    name: string;
    id: string;
    parents: {
      name: string
      _id: string;
      __v: number
    };
    parentsName: string
}

export interface TableData {
    tableData: DataType[]
}

const CategoryTable: React.FC<TableData> = memo((data: TableData) => {
    const confirm = (record: DataType) => {
      deleteCategory(record.id, {
        _id: record.id,
        name: record.name,
        parents: record.parents.name,
        __v: 0
      })
      .then(res => {
        message.success('确认删除');
        window.location.reload();
      })
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
        title: '上级名称',
        dataIndex: 'parentsName',
        key: 'parentsName',
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
            <Button onClick={ e => editCategoryData(record)} type="primary">编辑</Button>
            <Popconfirm
              title="确认删除此分类?"
              onConfirm={e => confirm(record)}
              onCancel={e => cancel}
              okText="确定"
              cancelText="取消"
            >
            <Button
            danger
            style={{ margin: "0 10px" }}
            >删除</Button>
            </Popconfirm>
          </Space>
        ),
      },
    ];
    // 编辑分类某一项的id
    const [, setCategoryId] = useAtom(editCategoryId);
    // 编辑分类某一项的值
    const [, setCategoryName] = useAtom(editCategoryName)
    const [, setCategoryFather] = useAtom(categoryFather);
    const navigate = useNavigate();
    // binding event
    const editCategoryData = (record: DataType) => {
      setCategoryId(record.id);
      setCategoryName(record.name);
      setCategoryFather(record.parentsName);
      navigate(`/home/categories/add/${record.id}`);
    }

    return (
      <>
        <Table columns={columns} dataSource={data.tableData} />   
      </>
    )
})

export default CategoryTable