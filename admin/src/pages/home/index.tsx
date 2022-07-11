import React, { memo } from 'react';
import { Button, Layout } from 'antd';
import { Outlet, useLocation, Navigate, useNavigate } from 'react-router-dom';

import { HomeWapper } from './style';
import MenuList from '../../components/menu';


const { Header, Sider, Content } = Layout;

const Home = memo(() => {
  const location = useLocation();
  const navigate = useNavigate();
  let pathname = location.pathname;
  const backLogin = () => {
    navigate("/login");
    localStorage.removeItem("token");
  }
  return (
    <HomeWapper>
        <Layout>
            <Sider width={200}>
              <MenuList />
            </Sider>
            <Layout>
                <Header>
                  <div className='back'>
                    <Button type='primary' onClick={ e => backLogin() }>
                      返回登录
                    </Button>
                  </div>
                </Header>
                <Content>
                  {
                    pathname === "/home" ? <Navigate to={"/home/welcome"} /> : <Outlet />
                  }
                </Content>
            </Layout>
        </Layout>
    </HomeWapper>
  )
})

export default Home