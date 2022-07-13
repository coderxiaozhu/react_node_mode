import React, { memo, useEffect, useState } from 'react';
import {
  Input,
  Form,
  message,
  Select,
  Button
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useNavigate, useParams } from 'react-router-dom';

import { 
  addCategoryData, 
  getEditCategoryId, 
  saveEditCategory,
  getCategoryData,
} from '../../request/category';

import { OptionData } from './types';
import {
  BaseCategoryWapper
} from './style';

const { Option } = Select;

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 8 },
};

const tailLayout = {
  wrapperCol: { offset: 2, span: 8 }
};

const BaseModel = memo(() => {
    const urlParams = useParams();
    const [form] = useForm();
    const [cateData, setCateData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
     if(urlParams.id) {
      getEditCategoryId(urlParams.id)
      .then(res => {
        if(res.data.parents) {
          form.setFieldsValue({
            name: res.data.name,
            parents: res.data.parents.name
          })
        }else {
          form.setFieldsValue({
            name: res.data.name
          })
        }
      })
     }else {
      getCategoryData()
      .then(res => {
        setCateData(res.data);
      })
     }
    }, [form, urlParams.id])
    const onFinish = (values: any) => {
      if(urlParams.id) {
        saveEditCategory(urlParams.id, {...values})
        .then(res => {
          if(res.status === 200) {
            message.success("修改成功");
            navigate("/home/categories/list");
          }else {
            message.error("修改失败");
          }
        })
      }else {
        addCategoryData({...values})
        .then(res => {
          if(res.status === 200) {
            setCateData(res.data);
            message.success("添加成功");
            navigate("/home/categories/list");
          }
        })
      }
    }
    return (
        <BaseCategoryWapper>
            <div className='title'>
              {
                urlParams.id ? "编辑分类" : "新建分类"
              }
            </div>
            <div className='content'>
              <Form form={form} onFinish={onFinish} {...layout}>
                  <Form.Item label={"上级分类"} name={"parents"}>
                    <Select 
                     allowClear
                     showArrow
                    >
                      {
                        cateData.map((item: OptionData) => {
                          return (
                            <Option value={item._id} key={item._id}>
                              { item.name }
                            </Option>
                          )
                        })
                      }
                    </Select>
                  </Form.Item>
                  <Form.Item label={"分类名称"} name={"name"}>
                    <Input />
                  </Form.Item>
                  <Form.Item {...tailLayout}>
                   <Button type='primary' size='large'  htmlType="submit">保存</Button>
                  </Form.Item>
              </Form>
            </div>
        </BaseCategoryWapper>
    )
})

export default BaseModel