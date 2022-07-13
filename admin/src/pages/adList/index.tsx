import React, { memo, useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import { useNavigate } from 'react-router-dom';

import { getItemData, deleteItemData } from '../../request/ad'
import { AdListWapper } from './style';

const AdList = memo(() => {
  const [tableData, setTableData] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    getItemData()
    .then(res => {
      let data = res.data.map((item: any) => {
        return {
          key: item._id,
          name: item.name,
          id: item._id
        }
      })
      setTableData(data)
    })
    
  }, [])

  const columns = [
    {
      title: "id",
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '广告位标题',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: "操作",
      key: "action",
      render: (record: any) => {
        return (
          <div>
              <Button
                type="primary"
                onClick={() => {
                  navigate(`/home/ad/adEdit/${record.id}`);
                }}
              >
                修改
              </Button>
              <Popconfirm
                title="确定要删除此广告位吗？"
                onCancel={() => message.info("取消删除")}
                onConfirm={async () => {
                  const res = await deleteItemData(record.id);
                  if (res.data.success === true) {
                     message.success("删除成功！")
                     getItemData().then(res => {
                      setTableData(res.data);
                    });
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
        )
      }
    }
  ]

  return (
    <AdListWapper>
      <div className='title'>
        广告位列表
      </div>
      <div className='content'>
        <Table
        dataSource={tableData}
        columns={columns}
        >
        </Table>
      </div>
    </AdListWapper>
  )
})

export default AdList