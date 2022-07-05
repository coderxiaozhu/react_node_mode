import React, { memo, useCallback, useEffect, useState } from 'react';
import {
  Input,
  Form,
  message,
  Select,
  Button
} from 'antd';
import { useAtom } from 'jotai';
import { useNavigate, useParams } from 'react-router-dom';

import { 
  addCategoryData, 
  getEditCategoryId, 
  saveEditCategory,
  getCategoryData,
} from '../../request/category';
import { 
  editCategoryId, 
  editCategoryName, 
  CategoryTableType,
  categoryFather
} from '../../pages/categoryList/state';
import { OptionData } from './types';
import {
  BaseCategoryWapper
} from './style';
import { getCategoryTableData } from '../../pages/categoryList'

const { Option } = Select;

const BaseModel = memo(() => {
    // 分类名称
    const [categoryName, setCategoryName] = useState<string>("");
    // 管理编辑分类的id
    const [categoryId, ] = useAtom(editCategoryId)
    // 编辑分类某一项的值
    const [cateEditgoryName, ] = useAtom(editCategoryName);
    // 获取表格数据
    const [, setTableData] = useAtom(CategoryTableType);
    // select下拉框的数据
    const [parentData, setParentData] = useState([]);
    // select选中的值
    const [selectValue, setSelectValue] = useState("");
    // parents的id值
    const [parentsId, setParentsId] = useState("");
    const [categoryFatherName, ] = useAtom(categoryFather);
    const navigator = useNavigate();
    const urlParams = useParams();
    useEffect(() => {
      getCategoryData()
      .then(res => {
        setParentData(res.data);
      })
      if(urlParams.id) {
        getEditCategoryId(categoryId)
        .then(res => {
          setParentsId(res.data.parents)
          setCategoryName(res.data.name)
        })
      }else {
        setCategoryName("");
        setSelectValue("");
      }
    }, [categoryId, cateEditgoryName, setTableData, categoryFatherName, urlParams])

    const handleOk = useCallback(() => {
        if(categoryName === "") {
          message.error("添加分类名称为空，需填写")
        }else {
          if(urlParams.id) {
            // 编辑分类
            saveEditCategory(categoryId, {
              _id: categoryId,
              name: categoryName,
              parents: parentsId,
              __v: 0
            })
            .then(res => {
              message.success("编辑成功");
              console.log(res);
            })
          }else{
              // 新建分类
              addCategoryData({
                name: categoryName,
                parents: parentsId
              })
              .then(res => {
                message.success("添加成功");
                setCategoryName("");
              })
          }
        }
        getCategoryTableData()
        navigator("/home/categories/list");
    }, [categoryName, navigator, urlParams.id, categoryId, parentsId]);

    const nameChange = (e: any) => {
      setCategoryName(e.target.value);
    }

    // select框选中的值
    const getSelectData = (value: string, option: any) => {
      setSelectValue(value);
      setParentsId(option.key);
    }
    return (
        <BaseCategoryWapper>
            <div className='title'>
              {
                urlParams.id ? "编辑分类" : "新建分类"
              }
            </div>
            <div className='content'>
                <div className='content-edit'>
                  <Form.Item label={"上级分类"}>
                    <Select 
                     onChange={getSelectData} 
                     value={urlParams.id ? categoryFatherName : selectValue}
                     allowClear
                    >
                      {
                        parentData.map((item: OptionData) => {
                          return (
                            <Option value={item.name} key={item._id}>
                              { item.name }
                            </Option>
                          )
                        })
                      }
                    </Select>
                  </Form.Item>
                  <Form.Item label={"分类名称"}>
                    <Input value={categoryName} onChange={nameChange} />
                  </Form.Item>
                </div>
                <Button type='primary' size='large' onClick={ e => handleOk() }>保存</Button>
            </div>
        </BaseCategoryWapper>
    )
})

export default BaseModel