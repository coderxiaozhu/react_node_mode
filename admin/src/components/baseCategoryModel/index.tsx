import React, { memo, useCallback, useEffect, useState } from 'react';
import './index.css'
import {
  Modal,
  Input,
  Form,
  message,
  Select
} from 'antd';
import { useAtom } from 'jotai';

import { 
  addCategoryData, 
  getEditCategoryId, 
  saveEditCategory,
  getCategoryData,
} from '../../request/category';
import { 
  modelValue, 
  modelTitle, 
  editCategoryId, 
  editCategoryName, 
  CategoryTableType,
  categoryFather
} from '../../pages/category/state';
import { OptionData } from './types'

const { Option } = Select;

const BaseModel = memo(() => {
    // 弹出框的显示和隐藏
    const [isModalVisible, setIsModalVisible] = useAtom(modelValue);
    // 分类名称
    const [categoryName, setCategoryName] = useState<string>("");
    // 弹出框的标题
    const [modalTitle, ] = useAtom(modelTitle);
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
    useEffect(() => {
      getCategoryData()
      .then(res => {
        setParentData(res.data);
      })
      if(modalTitle === "编辑") {
        getEditCategoryId(categoryId)
        .then(res => {
          setParentsId(res.data.parents)
          setCategoryName(res.data.name)
        })
      }
    }, [modalTitle, categoryId, cateEditgoryName, setTableData, categoryFatherName])

    const handleOk = useCallback(() => {
        if(categoryName === "") {
          message.error("添加分类名称为空，需填写")
        }else {
          if(modalTitle === "添加") {
            addCategoryData({
              name: categoryName,
              parents: parentsId
            })
            .then(res => {
              message.success("添加成功");
              setCategoryName("");
            })
          }else if(modalTitle === "编辑") {
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
          }
        }
        window.location.reload()
        setIsModalVisible(false);
    }, [categoryName, setIsModalVisible, modalTitle, parentsId, categoryId]);

    const handleCancel = () => {
      setIsModalVisible(false);
      setCategoryName("")
      if(modalTitle === "编辑") {
        getEditCategoryId(categoryId)
        .then(res => {
          setParentsId(res.data.parents)
          setCategoryName(res.data.name)
        })
      }
    };

    const nameChange = (e: any) => {
      setCategoryName(e.target.value);
    }

    // select框选中的值
    const getSelectData = (value: string, option: any) => {
      setSelectValue(value);
      setParentsId(option.key);
    }
    return (
        <>
            <Modal title={ modalTitle + "分类" } visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form.Item label={"上级分类"}>
                  <Select onChange={getSelectData} value={modalTitle === "编辑" ? categoryFatherName : selectValue}>
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
            </Modal>
        </>
    )
})

export default BaseModel