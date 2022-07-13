import {
  FileOutline
} from 'antd-mobile-icons';
import React, { useRef, useState } from 'react'
import { Tabs, Swiper } from 'antd-mobile';
import { SwiperRef } from 'antd-mobile/es/components/swiper'

import styles from './home.less';
import SwiperCpn from '@/components/swiperCpn';
import BaseCardHeader from '@/components/baseCardHeader';

const tabItems = [
  { key: 'fruits', title: '水果' },
  { key: 'vegetables', title: '蔬菜' },
  { key: 'animals', title: '动物' },
]

export default function HomePage() {
  const swiperRef = useRef<SwiperRef>(null)
  const [swiperActive, setSwiperActive] = useState(1)
  return (
    <>
      <div className={styles.title}>
        官网首页
      </div>
      <div className={styles.swiperWapper}>
        <SwiperCpn />
      </div>
      <div className={styles.newContent}>
        <BaseCardHeader title={"新闻资讯"} Icon={<FileOutline />} />
        <>
        <Tabs
          activeKey={tabItems[swiperActive].key}
          onChange={key => {
            const index = tabItems.findIndex(item => item.key === key)
            setSwiperActive(index)
            swiperRef.current?.swipeTo(index)
          }}
        >
          {tabItems.map(item => (
            <Tabs.Tab title={item.title} key={item.key} />
          ))}
        </Tabs>
        <Swiper
          direction='horizontal'
          loop
          indicator={() => null}
          ref={swiperRef}
          defaultIndex={swiperActive}
          onIndexChange={index => {
            setSwiperActive(index)
          }}
        >
          <Swiper.Item>
            <div className={styles.swiperContent}>菠萝</div>
          </Swiper.Item>
          <Swiper.Item>
            <div className={styles.swiperContent}>西红柿</div>
          </Swiper.Item>
          <Swiper.Item>
            <div className={styles.swiperContent}>蚂蚁</div>
          </Swiper.Item>
        </Swiper>
        </>
      </div>
    </>
  );
}
