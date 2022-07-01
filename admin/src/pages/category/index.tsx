import React, { memo, useCallback, useState } from 'react';

import {
  Button,
  Modal,
  Form,
  Input,
  FormInstance,
  message
} from 'antd';

import {
  CategoryWapper
} from './style';
import { addCategoryData } from '../../request/category'

const Categroy = memo(() => {
  // state hooks
  // 弹出框的显示和隐藏
  const [isModalVisible, setIsModalVisible] = useState(false);
  // 分类名称
  const [categoryName, setCategoryName] = useState<string>("");
  const formRef = React.createRef<FormInstance<any>>();

  // other hooks

  // binding events
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = useCallback(() => {
    addCategoryData({
      name: categoryName
    })
    .then(res => {
      message.success("添加成功");
    })
    formRef.current?.resetFields();
    setIsModalVisible(false)
  }, [formRef, categoryName]);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // 添加分类名称的输入框事件
  const nameChange = (e: any) => {
    setCategoryName(e.target.value);
  }

  return (
    <CategoryWapper>
      <div className='title'>
        分类列表
      </div>
      <div className='content'>
        <Button type="primary" size='large' onClick={ e => showModal() } className={"add_btn"}>添加分类</Button>
        <Modal title="添加分类" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
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
      </div>
    </CategoryWapper>
  )
})

export default Categroy