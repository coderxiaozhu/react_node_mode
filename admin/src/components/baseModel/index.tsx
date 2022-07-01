import React, { memo, useCallback, useEffect, useState } from 'react';
import {
  Modal,
  Form,
  Input,
  FormInstance,
  message
} from 'antd';
import { useAtom } from 'jotai';

import { addCategoryData, getEditCategoryId } from '../../request/category';
import { modelValue, modelTitle, editCategoryId } from '../../pages/category/state';

const BaseModel = memo(() => {
    // 弹出框的显示和隐藏
    const [isModalVisible, setIsModalVisible] = useAtom(modelValue);
    // 分类名称
    const [categoryName, setCategoryName] = useState<string>("");
    // 弹出框的标题
    const [modalTitle, setModalTitle] = useAtom(modelTitle);
    // 管理编辑分类的id
    const [categoryId, setCategoryId] = useAtom(editCategoryId)
    const formRef = React.createRef<FormInstance<any>>(); 
    useEffect(() => {
      if(modalTitle === "编辑") {
        getEditCategoryId(categoryId)
        .then(res => {
          formRef.current?.setFieldsValue({categoryName: res.data.name})
        })
      }
    }, [modalTitle, categoryId, formRef])

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
            })
            formRef.current?.resetFields();
          }else if(modalTitle === "编辑") {
            console.log("编辑");
          }
        }
        setIsModalVisible(false)
    }, [formRef, categoryName, setIsModalVisible, modalTitle]);

    const handleCancel = () => {
      setIsModalVisible(false);
    };

    const nameChange = (e: any) => {
      setCategoryName(e.target.value);
    }
    return (
        <>
            <Modal title={ modalTitle + "分类" } visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form
                  name="wrap"
                  labelCol={{ flex: '110px' }}
                  labelAlign="left"
                  labelWrap
                  wrapperCol={{ flex: 1 }}
                  colon={false}
                  ref={formRef}
                >
                <Form.Item label="分类名称" name="categoryName">
                    <Input value={categoryName} onChange={nameChange} />
                </Form.Item>
                </Form>
            </Modal>
        </>
    )
})

export default BaseModel