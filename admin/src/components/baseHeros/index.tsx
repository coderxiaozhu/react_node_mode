import React, { useState, useEffect, memo } from "react";
import {
  Form,
  Input,
  Button,
  message,
  Upload,
  Select,
  Rate,
  Tabs,
  Row,
  Col
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";

import { baseUrl } from "../../request";
import { BaseHerosWapper } from './style'
import { getEditHerosId, saveEditHeros, addHerosData } from '../../request/heros';
import { getCategoryData } from '../../request/category';
import { getGoodsData } from "../../request/goods";

const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;

const rules = [{ required: true }];

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 10 }
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};

const BaseHeros = memo(() => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [cateList, setCateList] = useState<any[]>([]);
  const [itemList, setItemList] = useState<any[]>([]);
  const [skillsImageUrl, setSkillsImageUrl] = useState<string[]>([]);
  const urlParams = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if(urlParams.id) {
      getEditHerosId(urlParams.id).then(res => {
        if (res.data.scores) {
          form.setFieldsValue({ ...res.data, ...res.data.scores });
          const images: string[] = [];
          res.data.skills.forEach((item: any) =>{
            images.push(item.icon)
          })
          setImageUrl(res.data.avatar);
          setSkillsImageUrl(images)
        }
      });
    }
    getCategoryData()
    .then(res => {
      setCateList(res.data);
    })
    getGoodsData()
    .then(res => {
      setItemList(res.data);
    })
  }, [form, urlParams])

  const onFinish = async (values: any) => {
    const scores = {
      difficult: values.difficult,
      skill: values.skill,
      attack: values.attack,
      survive: values.survive
    };
    const skills = values.skills.map((item: any)=>{
      if(urlParams.id){
        if(typeof(item.icon)!="string") {
          item.icon = item.icon.response.url
        }
        return item
      }else{
        item.icon = item.icon.response.url
       return item
      }
    })
    values.skills = skills
    values.scores = scores;
    if(urlParams.id) {
      const res = await saveEditHeros(urlParams.id, {
        ...values,
        avatar: imageUrl
      });
      if (res.status === 200) {
        message.success("修改成功");
        navigate("/home/heros/list");
      }
    }else{
      const res = await addHerosData({ ...values, avatar: imageUrl });
      if (res.status === 200) {
        message.success("添加成功");
        navigate("/home/heros/list");
      }
    }
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const handleChange = (info: any) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      setLoading(false);
      setImageUrl(info.file.response.url);
    }
  };

  const skillsIconChange = (info: any) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      setLoading(false);
      skillsImageUrl.push(info.file.response.url)
      setSkillsImageUrl(skillsImageUrl)
    }
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.file;
  };
  
  return (
    <BaseHerosWapper>
      <div className="content">
        <Form
          {...layout}
          name="basic"
          onFinish={onFinish}
          form={form}
        >
          <Tabs defaultActiveKey="1">
            <TabPane tab="基本信息" key="1">
              <Form.Item
                label="英雄名称"
                name="name"
                rules={[{ required: true, message: "请输入分类!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="英雄称号"
                name="title"
                rules={[{ required: true, message: "请输入分类!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="英雄分类"
                name="categories"
                rules={[{ required: true, message: "请选择分类!" }]}
              >
                <Select placeholder="请选择英雄分类" mode="multiple" showArrow allowClear>
                  {cateList.map(item => {
                    return (
                      <Option key={item._id} value={item._id}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item label="英雄头像">
                <Upload
                  name="file"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action={baseUrl + "/upload"}
                  onChange={info => handleChange(info)}
                >
                  {imageUrl ? (
                    <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Form.Item>
              <Form.Item
                label="难度"
                name="difficult"
                rules={[{ required: true, message: "请选择难度等级!" }]}
              >
                <Rate count={5} />
              </Form.Item>
              <Form.Item
                label="技能"
                name="skill"
                rules={[{ required: true, message: "请选择技能等级!" }]}
              >
                <Rate count={5} />
              </Form.Item>
              <Form.Item
                label="攻击"
                name="attack"
                rules={[{ required: true, message: "请选择攻击等级!" }]}
              >
                <Rate count={5} />
              </Form.Item>
              <Form.Item
                label="生存"
                name="survive"
                rules={[{ required: true, message: "请选择生存等级!" }]}
              >
                <Rate count={5} />
              </Form.Item>
              <Form.Item
                label="顺风出装"
                name="items1"
                rules={[{ required: true, message: "请选择顺风出装!" }]}
              >
                <Select placeholder="请选择顺风出装" mode="multiple" showArrow allowClear>
                  {itemList.map(item => {
                    return (
                      <Option key={item._id} value={item._id}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                label="逆风出装"
                name="items2"
                rules={[{ required: true, message: "请选择逆风出装!" }]}
              >
                <Select placeholder="请选择逆风出装" mode="multiple" showArrow allowClear>
                  {itemList.map(item => {
                    return (
                      <Option key={item._id} value={item._id}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                label="使用技巧"
                name="usageTips"
                rules={[{ required: true, message: "请输入使用技巧!" }]}
              >
                <TextArea rows={4} />
              </Form.Item>
              <Form.Item
                label="对抗技巧"
                name="battleTips"
                rules={[{ required: true, message: "请输入对抗技巧!" }]}
              >
                <TextArea rows={4} />
              </Form.Item>
              <Form.Item
                label="团战思路"
                name="teamTips"
                rules={[{ required: true, message: "请输入团战思路!" }]}
              >
                <TextArea rows={4} />
              </Form.Item>
            </TabPane>
            <TabPane tab="技能信息" key="2">
              <Form.List name="skills">
                {(fields, { add, remove }) => {
                  return (
                    <div>
                      <Row>
                        {fields.map(({ key, name, ...restField }) => (
                          <Col span={12} key={key}>
                            <Form.Item
                              name={[name, "name"]}
                              fieldKey={[key, "name"]}
                              rules={rules}
                              label="名称"
                            >
                              <Input placeholder="技能名称" />
                            </Form.Item>
                            <Form.Item
                              name={[name, "icon"]}
                              fieldKey={[key, "icon"]}
                              rules={rules}
                              valuePropName="file"
                              getValueFromEvent={normFile}
                              label="技能图标"
                            >
                              <Upload
                                name="file"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action={baseUrl + "/upload"}
                                onChange={info => skillsIconChange(info)}
                              >
                                {skillsImageUrl ? (
                                  <img
                                    src={skillsImageUrl[key]}
                                    alt="icon"
                                    style={{ width: "100%" }}
                                  />
                                ) : (
                                  uploadButton
                                )}
                              </Upload>
                            </Form.Item>

                            <Form.Item
                              name={[name, "description"]}
                              fieldKey={[key, "description"]}
                              rules={rules}
                              label="技能描述"
                            >
                              <Input placeholder="技能描述" />
                            </Form.Item>
                            <Row>
                              <Col span={8} offset={8}>
                                <Button 
                                danger 
                                style={{ marginBottom: "80px" }}
                                onClick={() => {
                                  remove(name);
                                }}>
                                  删除此技能
                                </Button>
                              </Col>
                            </Row>
                          </Col>
                        ))}
                      </Row>
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => {
                            add();
                          }}
                          style={{ width: "80%" }}
                        >
                          <PlusOutlined /> 添加技能
                        </Button>
                      </Form.Item>
                    </div>
                  );
                }}
              </Form.List>
            </TabPane>
          </Tabs>
          <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  保存
                </Button>
          </Form.Item>
        </Form>
      </div>
    </BaseHerosWapper>
  )
})

export default BaseHeros