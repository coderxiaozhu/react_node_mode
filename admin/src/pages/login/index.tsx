import React, { memo } from 'react';
import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { LoginWapper } from './style'

const Login = memo(() => {
    const navigate = useNavigate();
    const onFinish = (values: any) => {
        navigate("/home");
    };

    return (
        <LoginWapper>
            <div className="box">
            <div className="title">
                    管理员登录
            </div>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '请输入管理员账号!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="管理员账号" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入管理员密码!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="管理员密码"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </LoginWapper>
    )
})

export default Login