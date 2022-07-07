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
  editCategory,
  editItem1,
  editItem2,
  editHeroScore,
  editHeroUseTips,
  editHeroBattleTips,
  editHeroTeamTips
} from '../../pages/heroList/state';
import { deleteHeros } from '../../request/heros'
import { getEditCategoryId } from '../../request/category'
import { getEditGoodsId } from '../../request/goods';

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

    const getDataArr =  async (destArr: string[], getDataFun: Function) => {
      let defaultArr: string[] = destArr;
      let newArr: any[] = [];
      for(let i = 0; i < defaultArr.length; i++) {
        const { data } = await getDataFun(defaultArr[i])
        newArr.push(data);
      } 
      return newArr;
    }
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
    const [, setCateData] = useAtom(editCategory)
    const navigate = useNavigate();
    const [, setEditItem1] = useAtom(editItem1);
    const [, setEditItem2] = useAtom(editItem2);
    const [, setEditHeroScore] = useAtom(editHeroScore);
    const [, setEditHeroUseTips] = useAtom(editHeroUseTips);
    const [, setEditHeroBattleTips] = useAtom(editHeroBattleTips);
    const [, setEditHeroTeamTips] = useAtom(editHeroTeamTips);
    // binding event
    const editHerosData = async (record: DataType) => {
      const cateArr = await getDataArr(record.categories, getEditCategoryId);
      const item1Arr = await getDataArr(record.items1, getEditGoodsId);
      const item2Arr = await getDataArr(record.items2, getEditGoodsId);
      setCateData(cateArr);
      setEditItem1(item1Arr);
      setEditItem2(item2Arr);
      setEditHeroScore(record.scores);
      setEditHeroUseTips(record.usageTips);
      setEditHeroBattleTips(record.battleTips);
      setEditHeroTeamTips(record.teamTips)
      setHerosId(record.id); 
      navigate(`/home/heros/add/${ record.id }`);
    }

    return (
      <>
        <Table columns={columns} dataSource={data.tableData} />   
      </>
    )
})

export default HerosTable