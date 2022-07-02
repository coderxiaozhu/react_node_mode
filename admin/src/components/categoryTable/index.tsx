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

import { 
  modelValue, 
  modelTitle, 
  editCategoryId, 
  editCategoryName, 
  editCategoryUserId 
} from '../../pages/category/state';
import { deleteCategory } from '../../request/category'

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
    const confirm = (record: DataType) => {
      console.log(record.id);
      deleteCategory(record.id, {
        _id: record.id,
        userId: record.userId,
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
            <Popconfirm
              title="确认删除此分类?"
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
    // 弹出框的显示和隐藏
    const [, setIsModalVisible] = useAtom(modelValue);
    // 弹出框的标题
    const [, setModalTitle] = useAtom(modelTitle);
    // 编辑分类某一项的id
    const [, setCategoryId] = useAtom(editCategoryId);
    // 编辑分类某一项的值
    const [, setCategoryName] = useAtom(editCategoryName)
    // 编辑分类某一项的userId
    const [, setCategoryUserId] = useAtom(editCategoryUserId);
    // binding event
    const editCategoryData = (record: DataType) => {
      setCategoryUserId(record.userId)
      setCategoryId(record.id);
      setCategoryName(record.name);
      setIsModalVisible(true);
      setModalTitle("编辑")
    }

    return (
      <>
        <Table columns={columns} dataSource={data.tableData} />
        {/* 删除分类的弹出框 */}
        
      </>
    )
})

export default CategoryTable