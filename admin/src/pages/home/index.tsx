import React, { memo } from 'react';
import { Layout } from 'antd';
import { Outlet, useLocation, Navigate } from 'react-router-dom';

import { HomeWapper } from './style';
import MenuList from '../../components/menu';


const { Header, Sider, Content } = Layout;

const Home = memo(() => {
  const location = useLocation();
  let pathname = location.pathname;
  return (
    <HomeWapper>
        <Layout>
            <Sider width={200}>
              <MenuList />
            </Sider>
            <Layout>
                <Header>Header</Header>
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