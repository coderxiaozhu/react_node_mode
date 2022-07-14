import {
  FileOutline,
  UserOutline
} from 'antd-mobile-icons';
import React, { useEffect, useRef, useState } from 'react'
import { Tabs, Swiper } from 'antd-mobile';
import { useNavigate } from 'umi';
import { SwiperRef } from 'antd-mobile/es/components/swiper'

import SwiperCpn from '@/components/swiperCpn';
import BaseCardHeader from '@/components/baseCardHeader';
import { getNewsList, getHerosList } from '../../request/home'
import styles from './home.less';
import { newsDataType, heroDataType } from './types'

export default function HomePage() {
  const [swiperActive, setSwiperActive] = useState(0);
  const [heroActive, setHeroActive] = useState(0)
  const swiperRef = useRef<SwiperRef>(null);
  const herosRef = useRef<SwiperRef>(null)
  const [newsData, setNewsData] = useState<newsDataType[]>([]);
  const [heroData, setHeroData] = useState<heroDataType[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    getNewsList()
    .then(res => {
      if(res.data) {
        setNewsData(res.data);
      }
    })
    getHerosList()
    .then(res => {
      setHeroData(res.data);
    })
  }, [])
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
          activeKey={newsData[swiperActive] && newsData[swiperActive]._id}
          onChange={_id => {
            const index = newsData.findIndex((item: any) => item._id === _id)
            setSwiperActive(index)
            swiperRef.current?.swipeTo(index)
          }}
        >
          {
            newsData.map((item1: any) => {
              return (
                <Tabs.Tab style={{ fontSize: "14px" }} title={item1.name} key={item1._id} />
              )
            })
          }
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
          {
            newsData.map((item: any) => {
              return (
                <Swiper.Item
                key={item._id}
                >
                  <div key={ item._id } className={styles.swiperContent}>
                    {
                      item.newsList.map((item1: any) => {
                        return (
                          <div 
                            className={ styles.swiperItemName }
                            key={item1._id}
                            onClick={() => {
                              navigate(`/articles/${item1._id}`)
                            }}
                          >
                              {item1.name} 
                            </div>
                        )
                      })
                    }
                  </div>
                </Swiper.Item>
              )
            })
          }
        </Swiper>
        </>
      </div>
      <div className={styles.herosContent}>
        <BaseCardHeader title={"英雄列表"} Icon={<UserOutline />} />
        <>
        <Tabs
          activeKey={heroData[heroActive] && heroData[heroActive]._id}
          onChange={_id => {
            const index = heroData.findIndex((item: any) => item._id === _id)
            setHeroActive(index)
            herosRef.current?.swipeTo(index)
          }}
        >
          {
            heroData.map((item1: any) => {
              return (
                <Tabs.Tab style={{ fontSize: "14px" }} title={item1.name} key={item1._id} />
              )
            })
          }
        </Tabs>
        <Swiper
          direction='horizontal'
          loop
          indicator={() => null}
          ref={herosRef}
          defaultIndex={heroActive}
          onIndexChange={index => {
            setHeroActive(index)
          }}
        >
          {
            heroData.map((item: any) => {
              return (
                <Swiper.Item
                key={item._id}
                >
                  <div 
                  key={ item._id } 
                  className={styles.swiperContent}
                  >
                    {
                      item?.heroList.map((item1: any) => {
                        return (
                          <div 
                            className={ styles.herosItemWapper }
                            key={item1._id}
                            onClick={() => {
                              navigate(`/heroes/${item1._id}`)
                            }}
                          >
                           <div className={styles.herosImg}>
                            <img src={item1.avatar} style={{ width: "100%", height: "100%" }} />
                           </div>
                              {item1.name} 
                            </div>
                        )
                      })
                    }
                  </div>
                </Swiper.Item>
              )
            })
          }
        </Swiper>
        </>
      </div>
    </>
  );
}
