import React, { memo, useCallback, useEffect, useState } from 'react';
import {
  Modal,
  Input,
  Form,
  message
} from 'antd';
import { useAtom } from 'jotai';

import { 
  addCategoryData, 
  getEditCategoryId, 
  saveEditCategory 
} from '../../request/category';
import { 
  modelValue, 
  modelTitle, 
  editCategoryId, 
  editCategoryName, 
  CategoryTableType,
  editCategoryUserId
} from '../../pages/category/state';

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
    // 编辑分类某一项的userId
    const [categoryUserId, ] = useAtom(editCategoryUserId);
    // 获取表格数据
    const [, setTableData] = useAtom(CategoryTableType);
    useEffect(() => {
      if(modalTitle === "编辑") {
        getEditCategoryId(categoryId)
        .then(res => {
          setCategoryName(res.data.name)
        })
      }
    }, [modalTitle, categoryId, cateEditgoryName, setTableData])

    const handleOk = useCallback(() => {
        if(categoryName === "") {
          message.error("添加分类名称为空，需填写")
        }else {
          if(modalTitle === "添加") {
            addCategoryData({
              name: categoryName
            })
            .then(res => {
              message.success("添加成功");
              setCategoryName("");
            })
          }else if(modalTitle === "编辑") {
            saveEditCategory(categoryId, {
              _id: categoryId,
              name: categoryName,
              userId: categoryUserId,
              __v: 0
            })
            .then(res => {
              console.log(res);
            })
          }
        }
        window.location.reload();
        setIsModalVisible(false);
    }, [categoryName, setIsModalVisible, modalTitle, categoryId, categoryUserId]);

    const handleCancel = () => {
      setIsModalVisible(false);
      setCategoryName("")
    };

    const nameChange = (e: any) => {
      setCategoryName(e.target.value);
    }
    return (
        <>
            <Modal title={ modalTitle + "分类" } visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form.Item label={"分类名称"}>
                  <Input value={categoryName} onChange={nameChange} />
                </Form.Item>
            </Modal>
        </>
    )
})

export default BaseModel