import React, { memo, useEffect, useState } from 'react';
import {
  Input,
  Form,
  message,
  Upload,
  Button
} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { useParams, useNavigate } from 'react-router-dom';

import { baseUrl } from '../../request';
import { getEditGoodsId, saveEditGoods, addGoodsData } from '../../request/goods';

import {
  BaseGoodsWapper
} from './style';

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 8 },
};

const tailLayout = {
  wrapperCol: { offset: 2, span: 8 }
};

const BaseGoodsModel = memo(() => {
    const [loading, ] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
    const urlParams = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    useEffect(() => {
      if(urlParams.id) {
        getEditGoodsId(urlParams.id)
        .then(res => {
          form.setFieldsValue({
            name: res.data.name,
          })
          setImageUrl(res.data.icon)
        })
      }
    }, [form, urlParams.id])

    const beforeUpload = (file: RcFile) => {
    };

    const normFile = (e: any) => {
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.file;
  };

    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
      if(info.file.status === "done") {
        setImageUrl(info.file.response.url)
      }
    };

    const onFinish = async (values: any) => {
      if(urlParams.id) {
        const res = await saveEditGoods(urlParams.id, {
          ...values,
          icon: imageUrl
        })
        if(res.status === 200) {
          message.success("修改成功");
          navigate("/home/goods/list");
        }else {
          message.error("修改失败");
        }
      }else {
        const res = await addGoodsData({...values, icon: imageUrl})
        if(res.status === 200) {
          message.success("添加成功");
          navigate("/home/goods/list");
        }
      }
    }

    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

    return (
        <BaseGoodsWapper>
            <div className='title'>
              {
                urlParams.id ? "编辑物品" : "新建物品"
              }
            </div>
            <div className="content">
              <Form
              {...layout}
              form={form}
              onFinish={onFinish}
              >
                <Form.Item 
                label={"物品名称"}
                name={"name"}
                rules={[{ required: true, message: "请输入物品名称" }]}
                >
                  <Input  />
                </Form.Item>
                <Form.Item 
                label={"物品图标"}
                valuePropName="file"
                getValueFromEvent={normFile}
                name={"icon"}
                >
                        <Upload
                          name="file"
                          listType="picture-card"
                          className="avatar-uploader"
                          showUploadList={false}
                          action={baseUrl + "/upload"}
                          beforeUpload={beforeUpload}
                          onChange={handleChange}
                        >
                          {imageUrl ? <img src={imageUrl} alt="物品图片" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                </Form.Item>
                <Form.Item
                {...tailLayout}
                >
                  <Button type="primary" htmlType="submit">
                    保存
                  </Button>
                </Form.Item>
              </Form>
            </div>
        </BaseGoodsWapper>
    )
})

export default BaseGoodsModel