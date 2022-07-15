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
    // 获取编辑分类的分类项id, 用于获取数据
    const urlParams = useParams();
    // 获取表单的ref，用于操作表单项赋值
    const [form] = useForm();
    // 保存分类数据
    const [cateData, setCateData] = useState([]);
    // 用于跳转页面
    const navigate = useNavigate();
    useEffect(() => {
     if(urlParams.id) {
      // 编辑分类的分类信息获取
      getEditCategoryId(urlParams.id)
      .then(res => {
        // 判断是否有上级分类
        if(res.data.parents) {
           // 将后台保存的数据设置到表单项中
          form.setFieldsValue({
            name: res.data.name,
            parents: res.data.parents.name
          })
        }else {
           // 将后台保存的数据设置到表单项中
          form.setFieldsValue({
            name: res.data.name
          })
        }
      })
     }else {
      // 获取分类数据并保存
      getCategoryData()
      .then(res => {
        setCateData(res.data);
      })
     }
    }, [form, urlParams.id])
    const onFinish = (values: any) => {
      if(urlParams.id) {
        // 保存编辑后的分类信息
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
        // 保存新建后的分类信息
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