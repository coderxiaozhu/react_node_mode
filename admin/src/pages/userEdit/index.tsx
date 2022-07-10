import React, { memo, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'antd/lib/form/Form';

import { addUserData, saveEditUser, getEditUserId } from '../../request/user'
import { UserEditWapper } from './style'

const tailLayout = {
  wrapperCol: { offset: 2, span: 16 }
};

const titleLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 8 }
}

const UserEdit = memo(() => {
  const navigate = useNavigate();
  const urlParams = useParams();
  const [form] = useForm();

  useEffect(() => {
    if(urlParams.id) {
      getEditUserId(urlParams.id)
      .then(res => {
        form.setFieldsValue({ ...res.data });
      })
    }
  }, [form, urlParams.id])

  const onFinish = (values: any) => {
    if(urlParams.id) {
      saveEditUser(urlParams.id, { ...values })
      .then(res => {
        if(res.status === 200) {
          message.success("编辑成功");
          navigate("/home/user/userlist");
        }
      })
    }else {
      addUserData({...values})
      .then(res => {
        if(res.status === 200) {
          message.success("添加成功");
          navigate("/home/user/userlist");
        }
      })
    }
  }
  return (
    <UserEditWapper>
      <div className='title'>
        { urlParams.id ? "编辑" : "新建" }管理员
      </div>
      <div className='content'>
        <Form
        onFinish={onFinish}
        form={form}
        name={"article"}
        >
          <Form.Item
          label="用户名"
          name={"username"}
          {...titleLayout}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
          label="密码"
          name={"password"}
          {...titleLayout}
          >
            <Input.Password placeholder="请输入用户密码" />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    </UserEditWapper>
  )
})

export default UserEdit