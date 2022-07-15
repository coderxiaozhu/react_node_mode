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
  // 用于跳转页面
  const navigate = useNavigate();
  // 获取编辑管理员的管理员数据项id, 用于获取数据
  const urlParams = useParams();
  // 获取表单的ref，用于操作表单项赋值
  const [form] = useForm();

  useEffect(() => {
    if(urlParams.id) {
      // 编辑管理员信息的管理员信息获取
      getEditUserId(urlParams.id)
      .then(res => {
        // 将后台保存的数据设置到表单项中
        form.setFieldsValue({ ...res.data });
      })
    }
  }, [form, urlParams.id])

  const onFinish = (values: any) => {
    if(urlParams.id) {
      // 保存编辑后的管理员信息
      saveEditUser(urlParams.id, { ...values })
      .then(res => {
        if(res.status === 200) {
          message.success("编辑成功");
          navigate("/home/user/userlist");
        }
      })
    }else {
      // 保存新建后的管理员信息
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