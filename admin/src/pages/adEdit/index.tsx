import React, { useState, useEffect, memo } from "react";
import {
  Form,
  Input,
  Button,
  message,
  Upload,
  Row,
  Col
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";

import { baseUrl } from "../../request";
import { AdEditWapper } from './style'
import { addItemData, getEditItemId, saveEditItem } from '../../request/ad';

const rules = [{ required: true }];

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 10 }
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};

const AdEdit = memo(() => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [itemsImageUrl, setItemsImageUrl] = useState<string[]>([]);
  const urlParams = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if(urlParams.id) {
        getEditItemId(urlParams.id)
        .then(res => {
            form.setFieldsValue({ ...res.data })
            const imageData: string[] = [];
            res.data.items.forEach((item: any) => {
                console.log(item);
                imageData.push(item.image);
            })
            setItemsImageUrl(imageData)
        })
    }
  }, [form, urlParams])

  const onFinish = async (values: any) => {
    const items = values.items.map((item: any) => {
        if(urlParams.id) {
            if(typeof(item.image)!="string") {
                item.image = item.image.response.url;
            }
            return item;
        }else {
            item.image = item.image.response.url;
            return item;
        }
    })
    values.items = items;
    if(urlParams.id) {
        saveEditItem(urlParams.id, { ...values })
        .then(res => {
            if(res.status === 200) {
                message.success("修改成功");
                navigate("/home/ad/adlist");
            }
        })
    }else {
        addItemData({...values})
        .then(res => {
            if(res.status === 200) {
                message.success("添加成功");
                navigate("/home/ad/adlist");
            }
        })
    }
  }

  const itemsChange = (info: any) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      setLoading(false);
      itemsImageUrl.push(info.file.response.url)
      setItemsImageUrl(itemsImageUrl)
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.file;
  };
  
  return (
    <AdEditWapper>
      <div className='title'>
        { urlParams.id ? "编辑" : "新建" }广告位
      </div>
      <div className="content">
        <Form
          {...layout}
          name="basic"
          onFinish={onFinish}
          form={form}
        >
              <Form.Item
                label="广告位名称"
                name="name"
                rules={[{ required: true, message: "请输入广告位名称" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
              label="广告位信息"
              rules={[{ required: true, message: "请输入广告位信息" }]}
              >
              <Form.List 
              name="items">
                {(fields, { add, remove }) => {
                  return (
                    <div>
                      <Row>
                        {fields.map(({ key, name, ...restField }) => (
                          <Col span={24} key={key}>
                            <Form.Item
                              name={[name, "url"]}
                              fieldKey={[key, "url"]}
                              rules={rules}
                              label="跳转链接 (URL)"
                            >
                              <Input placeholder="广告位链接" />
                            </Form.Item>
                            <Form.Item
                              name={[name, "image"]}
                              fieldKey={[key, "image"]}
                              rules={rules}
                              valuePropName="file"
                              getValueFromEvent={normFile}
                              label="图片"
                            >
                              <Upload
                                name="file"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action={baseUrl + "/upload"}
                                onChange={info => itemsChange(info)}
                              >
                                {itemsImageUrl ? (
                                  <img
                                    src={itemsImageUrl[key]}
                                    alt="广告位图片"
                                    style={{ width: "100%" }}
                                  />
                                ) : (
                                  uploadButton
                                )}
                              </Upload>
                            </Form.Item>
                            <Row>
                              <Col span={8} offset={8}>
                                <Button 
                                danger 
                                style={{ marginBottom: "80px" }}
                                onClick={() => {
                                  remove(name);
                                }}>
                                  删除
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
                          <PlusOutlined /> 添加广告位
                        </Button>
                      </Form.Item>
                    </div>
                  );
                }}
              </Form.List>
              </Form.Item>
          <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  保存
                </Button>
          </Form.Item>
        </Form>
      </div>
    </AdEditWapper>
  )
})

export default AdEdit