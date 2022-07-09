import React, { memo, useCallback, useEffect, useState } from 'react';
import {
  Input,
  Form,
  message,
  Upload,
  Button,
  Select,
  Rate,
  Tabs
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
  editCategory,
  editItem1,
  editItem2,
  editHeroScore,
  editHeroUseTips,
  editHeroBattleTips,
  editHeroTeamTips,
  editHeroSkills
} from '../../pages/heroList/state';
import { getHerosTableData } from '../../pages/heroList'
import SkillEdit from '../skillEditPage';
import {
  BaseHerosWapper
} from './style';
import {
  OptionData
} from './heroTypes'
const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;

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
    // 英雄分类的数据
    const [heroPosition, setHeroPosition] = useState([]);
    const [cateData, ] = useAtom(editCategory);
    const [item1Data, setItem1Data] = useAtom(editItem1);
    const [item2Data, setItem2Data] = useAtom(editItem2);
    const [heroScoreData, ] = useAtom(editHeroScore);
    const [useTipData, ] = useAtom(editHeroUseTips);
    const [battleTipData, ] = useAtom(editHeroBattleTips);
    const [teamTipData, ] = useAtom(editHeroTeamTips);
    const [positionKey, setPositionKey] = useState<string[]>([]);
    const [difficult, setDifficult] = useState<number>(0);
    const [skill, setSkill] = useState<number>(0);
    const [attack, setAttack] = useState<number>(0);
    const [survive, setSurvive] = useState<number>(0);
    // 英雄装备数据
    const [defaultGood, setDefaultGood] = useState<any>([]);
    const [upGoodData, setUpGoodData] = useState<string[]>([]);
    const [downGoodData, setDownGoodData]  = useState<string[]>([]);
    // 弹出框的标题
    const [modalTitle, ] = useAtom(modelTitle);
    // 管理编辑分类的id
    const [herosId, ] = useAtom(editHerosId)
    // 获取表格数据
    const [, setTableData] = useAtom(herosTableType);
    // 英雄的图标
    const [herosAvatar, setHerosAvatar] = useState<string>("");
    // 英雄的技能
    const [herosSkill, ] = useAtom(editHeroSkills);
    const urlParams = useParams();
    const navigate = useNavigate();
    useEffect(() => {
      getCategoryData()
      .then(res => {
        if(urlParams.id) {
          setHeroPosition(cateData);
        }else {
          setHeroPosition(res.data);
        }
      })
      getGoodsData()
      .then(res => {
        setDefaultGood(res.data);
      })
      if(urlParams.id) {
        getEditHerosId(herosId)
        .then(res => {
          setHerosName(res.data.name)
          setHerosTitle(res.data.title);
          setHerosAvatar(res.data.avatar);
        })
        const { difficult, skill, attack, survive } = heroScoreData;
        setDifficult(difficult);
        setSkill(skill);
        setAttack(attack);
        setSurvive(survive);
        setUseTips(useTipData);
        setBattleTips(battleTipData);
        setTeamTips(teamTipData);
        setItem1Data(item1Data);
        setItem2Data(item2Data);
      }
    }, [modalTitle, herosId, setTableData, setHerosAvatar, urlParams.id, heroScoreData, useTipData, battleTipData, teamTipData, cateData, setItem1Data, item1Data, setItem2Data, item2Data])

    const onFinish = useCallback((values: any) => {
        if(urlParams.id) {
          saveEditHeros(herosId, {
            name: herosName,
            avatar: herosAvatar,
            title: herosTitle,
            categories: positionKey,
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
            message.success("编辑成功");
          })
        }else {
          let skillsArr = values.skills.map((item: any) => {
            let urlName = item.skillIcon.response.url
            return {
                skillDesc: item.skillDesc,
                skillIcon: urlName,
                skillName: item.skillName
            }
          })
          addHerosData({
            name: herosName,
            avatar: herosAvatar,
            title: herosTitle,
            categories: positionKey,
            scores: {
              difficult: difficult,
              skill: skill,
              attack: attack,
              survive: survive,
            },
            skills: skillsArr,
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
        navigate("/home/heros/list");
    }, [urlParams.id, navigate, herosId, herosName, herosAvatar, herosTitle, positionKey, difficult, skill, attack, survive, upGoodData, downGoodData, useTips, battleTips]);

    // 默认装备的数据项
    const goodsChildren: React.ReactNode[] = [];
    for(let i = 0; i < defaultGood.length; i++) {
      goodsChildren.push(
        <Option value={defaultGood[i].name} key={defaultGood[i]._id}>
          { defaultGood[i].name }
        </Option>
      )
    }

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
      setDownGoodData(downArr);
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
            <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
              <Tabs type='card'>
                <TabPane tab={urlParams.id ? "编辑英雄" : "新建英雄"} key={"1"}>
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
                      <Select 
                        style={{ width: 300 }} 
                        onChange={selectChange} 
                        mode={"multiple"}
                        showArrow
                      >
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
                      <Select 
                        style={{ width: 300 }} 
                        onChange={upChange} 
                        mode={"multiple"}
                        showArrow
                        >
                        {
                          urlParams.id ? 
                          item1Data.map((item: OptionData) => {
                            return(
                              <Option value={item.name} key={item._id}>
                                  { item.name }
                              </Option>
                            )
                          }) : goodsChildren
                        }
                      </Select>
                    </Form.Item>
                    <Form.Item label={"逆风出装"}>
                      <Select 
                        style={{ width: 300 }} 
                        onChange={downChange} 
                        mode={"multiple"}
                        showArrow
                        >
                        {
                          urlParams.id ? 
                          item2Data.map((item: OptionData) => {
                            return(
                              <Option value={item.name} key={item._id}>
                                  { item.name }
                              </Option>
                            )
                          }) : goodsChildren
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
                  </div>
                </TabPane>
                <TabPane tab={urlParams.id ? "编辑技能" : "新建技能"} key={"2"}>
                  <SkillEdit />
                </TabPane>
              </Tabs>
              <Form.Item>
                    <Button type="primary" htmlType="submit">
                        保存
                    </Button>
                </Form.Item>
            </Form>
            </div>
        </BaseHerosWapper>
    )
})

export default BaseHerosModel