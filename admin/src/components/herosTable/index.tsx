import React, { memo, useEffect, useState } from 'react';
import { 
  Button, 
  Table,
  message, 
  Popconfirm
} from 'antd';
import { useNavigate } from 'react-router-dom';

import { deleteHeros, getHerosData } from '../../request/heros'
export interface DataType {
    key: string;
    name: string;
    id: string;
    avatar: string;
    title: string;
    categories: string[];
    battleTips: string;
    items1: string[];
    items2: string[];
    scores: {
      attack: number;
      difficult: number;
      survive: number;
      skill: number;
    }
    skills: [];
    teamTips: string;
    usageTips: string;
}

export interface TableData {
    tableData: DataType[]
}

const HerosTable: React.FC = memo(() => {
  const [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getHerosData().then(res => {
      setDataSource(res.data);
    });
  }, []);
  const showTotal = (total: number) => {
    return `共${total}条`
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      width: 200,
    },
    {
      title: "英雄名称",
      dataIndex: "name",
      width: 180,
    },
    {
      title: "英雄头像",
      dataIndex: "avatar",
      render: (record: any) => {
        return <img src={record} alt="" style={{width:'60px'}} />;
      }
    },
    {
      title: "操作",
      render: (record: any) => {
        return (
          <div>
            <Button
              type="primary"
              onClick={() => {
                navigate(`/home/heros/add/${record._id}`);
              }}
            >
              修改
            </Button>
            <Popconfirm
              title="确定要删除此英雄吗？"
              onCancel={() => message.info("取消删除")}
              onConfirm={async () => {
                const res = await deleteHeros(record._id);
                if (res.data.success === true) {
                  message.success("删除成功！");
                  getHerosData().then(res => {
                    setDataSource(res.data);
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
        );
      }
    }
  ];

  return (
    <Table
      rowKey="_id"
      columns={columns}
      dataSource={dataSource}
      pagination={{
        pageSize: 5,
        showTotal:showTotal,
        showQuickJumper: true,
      }}
      bordered
    />
  );
})

export default HerosTable