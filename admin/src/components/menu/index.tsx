import React, { memo } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

import './style.css';

type MenuItem = Required<MenuProps>['items'][number];
function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group'
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type
    } as MenuItem;
  }

const items: MenuProps['items'] = [
  getItem('内容管理 ', 'sub1', <MailOutlined />, [
    getItem('物品', 'sub1-1', null, [getItem('新建物品', 'goods/add'), getItem('物品列表', 'goods/list')], 'group'),
    getItem('英雄', 'sub1-2', null, [getItem('新建英雄', 'heros/add'), getItem('英雄列表', 'heros/list')], 'group'),
    getItem('文章', 'sub1-3', null, [getItem('新建文章', 'article/articleedit'), getItem('文章列表', 'article/articlelist')], 'group'),
  ]),

  getItem('运营管理', 'sub2', <AppstoreOutlined />, [
    getItem('广告位管理', 'sub2-1', null, [getItem('新建广告位', 'ad/adEdit'), getItem('广告位列表', 'ad/adlist')], 'group')
  ]),

  getItem('系统设置', 'sub3', <SettingOutlined />, [
    getItem('分类', 'sub3-1', null, [getItem('新建分类', 'categories/add'), getItem('分类列表', 'categories/list')], 'group'),
    getItem('管理员', 'sub3-2', null, [getItem('新建管理员', 'user/useredit'), getItem('管理员列表', 'user/userlist')], 'group'),
  ]),
];

const MenuList = memo(() => {
  const navigate = useNavigate();

  const onClick: MenuProps['onClick'] = e => {

    navigate(e.key);
  };

  return (
    <Menu
      className="menuList"
      mode="inline"
      theme="dark"
      items={items}
      onClick={onClick}
    >
      </Menu>
  )
})

export default MenuList