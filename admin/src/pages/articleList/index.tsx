import React, { memo, useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import { useNavigate } from 'react-router-dom';

import { getArticleData, deleteArticleData } from '../../request/article'
import { ArticleListWapper } from './style';

const Articlelist = memo(() => {
  const [tableData, setTableData] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    getArticleData()
    .then(res => {
      setTableData(res.data)
    })
    
  }, [])

  const columns = [
    {
      title: "id",
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: '文章标题',
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
                  navigate(`/home/article/articleedit/${record._id}`);
                }}
              >
                修改
              </Button>
              <Popconfirm
                title="确定要删除此文章吗？"
                onCancel={() => message.info("取消删除")}
                onConfirm={async () => {
                  const res = await deleteArticleData(record._id);
                  if (res.data.success === true) {
                     message.success("删除成功！")
                     getArticleData().then(res => {
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
        文章列表
      </div>
      <div className='content'>
        <Table
        rowKey={"_id"}
        dataSource={tableData}
        columns={columns}
        >

        </Table>
      </div>
    </ArticleListWapper>
  )
})

export default Articlelist