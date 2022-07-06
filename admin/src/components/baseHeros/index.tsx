import React, { memo, useCallback, useEffect, useState } from 'react';
import {
  Input,
  Form,
  message,
  Upload,
  Button,
  Select,
  Rate
} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useAtom } from 'jotai';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { useParams, useNavigate } from 'react-router-dom';

import { 
  addHerosData, 
  getEditHerosId, 
  saveEditHeros,
} from '../../request/heros';
import { getCategoryData } from '../../request/category';
import { getGoodsData } from '../../request/goods';
import { baseUrl } from '../../request';
import { 
  modelTitle, 
  editHerosId,
  herosTableType,
  editHerosAvatar
} from '../../pages/heroList/state';
import { getHerosTableData } from '../../pages/heroList'
import {
  BaseHerosWapper
} from './style';
import {
  OptionData,
} from './heroTypes'
const { Option } = Select;
const { TextArea } = Input;

const BaseHerosModel = memo(() => {
    const [loading, ] = useState(false);
    // 英雄名称
    const [herosName, setHerosName] = useState<string>("");
    // 英雄称号
    const [herosTitle, setHerosTitle] = useState<string>("");
    // 使用技巧
    const [useTips, setUseTips] = useState<string>("");
    // 对抗技巧
    const [battleTips, setBattleTips] = useState<string>("");
    // 团战思路
    const [teamTips, setTeamTips] = useState<string>("");
    // 英雄分类定位的数据
    const [heroPosition, setHeroPosition] = useState([]);
    const [positionKey, setPositionKey] = useState<string[]>([]); 
    const [difficult, setDifficult] = useState<number>(0);
    const [skill, setSkill] = useState<number>(0);
    const [attack, setAttack] = useState<number>(0);
    const [survive, setSurvive] = useState<number>(0);
    // 英雄装备数据
    const [herosGood, setHerosGood] = useState([]);
    const [upGoodData, setUpGoodData] = useState<string[]>([]);
    const [downGoodData, setDownGoodData]  = useState<string[]>([]);
    // 弹出框的标题
    const [modalTitle, ] = useAtom(modelTitle);
    // 管理编辑分类的id
    const [herosId, ] = useAtom(editHerosId)
    // 获取表格数据
    const [, setTableData] = useAtom(herosTableType);
    // 英雄的图标
    const [herosAvatar, setHerosAvatar] = useAtom(editHerosAvatar);
    const urlParams = useParams();
    const navigate = useNavigate();
    useEffect(() => {
      getCategoryData()
      .then(res => {
        setHeroPosition(res.data);
      })
      getGoodsData()
      .then(res => {
        setHerosGood(res.data);
      })
      if(urlParams.id) {
        getEditHerosId(herosId)
        .then(res => {
          setHerosName(res.data.name)
          setHerosAvatar(res.data.avatar);
        })
      }else {
        setHerosAvatar("");
        setHerosName("")
      }
    }, [modalTitle, herosId, setTableData, setHerosAvatar, urlParams.id])

    const handleOk = useCallback(() => {
        if(urlParams.id) {
          saveEditHeros(herosId, {
            _id: herosId,
            name: herosName,
            __v: 0
          })
          .then(res => {
            message.success("编辑成功");
          })
        }else {
          addHerosData({
            name: herosName,
            avatar: herosAvatar,
            title: herosTitle,
            category: positionKey,
            scores: {
              difficult: difficult,
              skill: skill,
              attack: attack,
              survive: survive,
            },
            skills: [],
            items1: upGoodData,
            items2: downGoodData,
            usageTips: useTips,
            battleTips: battleTips,
            teamTips: battleTips
          })
          .then(res => {
            message.success("添加成功");
            setHerosName("");
          })
        }
        getHerosTableData();
        navigate("/home/heros/list")
    }, [urlParams.id, navigate, herosId, herosName, herosAvatar, herosTitle, positionKey, difficult, skill, attack, survive, upGoodData, downGoodData, useTips, battleTips]);

    // 名称的函数
    const nameChange = (e: any) => {
      setHerosName(e.target.value);
    }

    // 称号的函数
    const titleChange = (e: any) => {
      setHerosTitle(e.target.value);
    }

    // 定位的函数
    const selectChange = (value: string, option: any) => {
      let arr = [];
      for(let i = 0; i < option.length; i++) {
        arr.push(option[i].key);
      }
      setPositionKey(arr);  
    };

    const difficultChange = (value: number) => {
      setDifficult(value);
    }

    const skillChange = (value: number) => {
      setSkill(value);
    }

    const attackChange = (value: number) => {
      setAttack(value);
    }
    
    const surviveChange = (value: number) => {
      setSurvive(value);
    }

    // 顺风的函数
    const upChange = (value: string, option: any) => {
      let upArr = [];
      for(let i = 0; i < option.length; i++) {
        upArr.push(option[i].key);
      }
      setUpGoodData(upArr);  
    };

    // 逆风的函数
    const downChange = (value: string, option: any) => {
      let downArr = [];
      for(let i = 0; i < option.length; i++) {
        downArr.push(option[i].key);
      }
      setUpGoodData(downArr);  
    };

    const useTipChange = (e: any) => {
      setUseTips(e.target.value);
    }
    
    const battleTipChange = (e: any) => {
      setBattleTips(e.target.value);
    }

    const teamTipChange = (e: any) => {
      setTeamTips(e.target.value);
    }

    const beforeUpload = (file: RcFile) => {
    };

    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
      if(info.file.response) {
        setHerosAvatar(info.file.response.url)
      }
    };

    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

    return (
        <BaseHerosWapper>
            <div className='title'>
              {
                urlParams.id ? "编辑英雄" : "新建英雄"
              }
            </div>
            <div className="content">
              <div className='content-edit'>
                <Form.Item label={"英雄名称"}>
                  <Input value={herosName} onChange={nameChange} />
                </Form.Item>
                <Form.Item label={"英雄头像"}>
                        <Upload
                          name="file"
                          listType="picture-card"
                          className="avatar-uploader"
                          showUploadList={false}
                          action={baseUrl + "/upload"}
                          beforeUpload={beforeUpload}
                          onChange={handleChange}
                        >
                          {herosAvatar ? <img src={herosAvatar} alt="英雄头像" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                </Form.Item>
                <Form.Item label={"英雄称号"}>
                  <Input value={herosTitle} onChange={titleChange} />
                </Form.Item>
                <Form.Item label={"英雄类型"}>
                  <Select style={{ width: 300 }} onChange={selectChange} mode={"multiple"}>
                    {
                      heroPosition.map((item: OptionData) => {
                        return(
                          <Option value={item.name} key={item._id}>
                              { item.name }
                          </Option>
                        )
                      })
                    }
                  </Select>
                </Form.Item>
                <Form.Item label={"难度"}>
                  <Rate value={difficult} onChange={difficultChange} /> { difficult }
                </Form.Item>
                <Form.Item label={"技能"}>
                  <Rate value={skill} onChange={skillChange} /> { skill }
                </Form.Item>
                <Form.Item label={"攻击"}>
                  <Rate value={attack} onChange={attackChange} />  { attack }
                </Form.Item>
                <Form.Item label={"生存"}>
                  <Rate value={survive} onChange={surviveChange} /> { survive }
                </Form.Item>
                <Form.Item label={"顺风出装"}>
                  <Select style={{ width: 300 }} onChange={upChange} mode={"multiple"}>
                    {
                      herosGood.map((item: OptionData) => {
                        return(
                          <Option value={item.name} key={item._id}>
                              { item.name }
                          </Option>
                        )
                      })
                    }
                  </Select>
                </Form.Item>
                <Form.Item label={"逆风出装"}>
                  <Select style={{ width: 300 }} onChange={downChange} mode={"multiple"}>
                    {
                      herosGood.map((item: OptionData) => {
                        return(
                          <Option value={item.name} key={item._id}>
                              { item.name }
                          </Option>
                        )
                      })
                    }
                  </Select>
                </Form.Item>
                <Form.Item label={"使用技巧"}>
                  <TextArea value={useTips} rows={4} onChange={useTipChange} />
                </Form.Item>
                <Form.Item label={"对抗技巧"}>
                  <TextArea value={battleTips} rows={4} onChange={battleTipChange} />
                </Form.Item>
                <Form.Item label={"团战思路"}>
                  <TextArea value={teamTips} rows={4} onChange={teamTipChange} />
                </Form.Item>
                <Button onClick={ e => handleOk() } type={"primary"}>保存</Button>
              </div>
            </div>
        </BaseHerosWapper>
    )
})

export default BaseHerosModel