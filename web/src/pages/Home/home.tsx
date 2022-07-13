import {
  FileOutline
} from 'antd-mobile-icons';
import React, { useEffect, useRef, useState } from 'react'
import { Tabs, Swiper } from 'antd-mobile';
import { SwiperRef } from 'antd-mobile/es/components/swiper'

import SwiperCpn from '@/components/swiperCpn';
import BaseCardHeader from '@/components/baseCardHeader';
import { getNewsList } from '../../request/home'
import styles from './home.less';
import { tabItemTypes, swiperItemTypes } from './types'

export default function HomePage() {
  const [swiperActive, setSwiperActive] = useState(0);
  const [tableItemArr, setTableItemArr] = useState<tabItemTypes[]>([]);
  const [swiperItemArr, setSwiperItemArr] = useState<swiperItemTypes[]>([]);
  const swiperRef = useRef<SwiperRef>(null)
  useEffect(() => {
    getNewsList()
    .then(res => {
      console.log(res.data);
      if(res.data) {
        const tabArr: ((prevState: tabItemTypes[]) => tabItemTypes[]) | { key: string; title: string; }[] = [];
        const swiperArr: any = []
        res.data.forEach((item: any) => {
          tabArr.push({
            key: item._id,
            title: item.name
          })
          swiperArr.push({
            newsList: item.newsList
          })
        })
        console.log(swiperArr);
        setTableItemArr(tabArr);
        setSwiperItemArr(swiperArr)
      }
    })
  }, [])
  // const items = swiperItemArr.map((item: any) => {
  //   console.log(item);
    
  // })
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
          activeKey={tableItemArr[swiperActive] && tableItemArr[swiperActive].key}
          onChange={key => {
            const index = tableItemArr.findIndex(item => item.key === key)
            setSwiperActive(index)
            swiperRef.current?.swipeTo(index)
          }}
        >
          {tableItemArr.map(item => (
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
