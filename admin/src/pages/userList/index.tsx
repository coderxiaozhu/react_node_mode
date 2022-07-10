import React, { memo, useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import { useNavigate } from 'react-router-dom';

import { deleteUserData, getUserData } from '../../request/user'
import { ArticleListWapper } from './style';

const Articlelist = memo(() => {
  const [tableData, setTableData] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    getUserData()
    .then(res => {
      let data = res.data.map((item: any) => {
        return {
          key: item._id,
          username: item.username,
          password: item.password,
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
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
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
                  navigate(`/home/user/useredit/${record.id}`);
                }}
              >
                修改
              </Button>
              <Popconfirm
                title="确定要删除此项吗？"
                onCancel={() => message.info("取消删除")}
                onConfirm={async () => {
                  const res = await deleteUserData(record.id);
                  if (res.data.success === true) {
                     message.success("删除成功！")
                     getUserData().then(res => {
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
    <ArticleListWapper>
      <div className='title'>
        管理员列表
      </div>
      <div className='content'>
        <Table
        dataSource={tableData}
        columns={columns}
        >
        </Table>
      </div>
    </ArticleListWapper>
  )
})

export default Articlelist