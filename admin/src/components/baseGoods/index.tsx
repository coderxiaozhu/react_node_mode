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
    // 上传组件的icon切换
    const [loading, ] = useState(false);
    // 保存上传图片的地址
    const [imageUrl, setImageUrl] = useState<string>();
    // 获取编辑物品的物品项id, 用于获取数据
    const urlParams = useParams();
    // 获取表单的ref，用于操作表单项赋值
    const [form] = Form.useForm();
    // 用于跳转页面
    const navigate = useNavigate();
    useEffect(() => {
      if(urlParams.id) {
        // 编辑物品的物品信息获取
        getEditGoodsId(urlParams.id)
        .then(res => {
          // 把指定的表单项数据填充到表单
          form.setFieldsValue({
            name: res.data.name,
          })
          // 填充物品的图片
          setImageUrl(res.data.icon)
        })
      }
    }, [form, urlParams.id])

    const beforeUpload = (file: RcFile) => {
    };

    const normFile = (e: any) => {
      // 解决上传组件报空指针错误
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.file;
  };

    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
      if(info.file.status === "done") {
        // 获取图片上传之后的图片地址
        setImageUrl(info.file.response.url)
      }
    };

    const onFinish = async (values: any) => {
      if(urlParams.id) {
        // 调用接口保存编辑之后的物品信息
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
        // 调用接口保存新建之后的物品信息
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