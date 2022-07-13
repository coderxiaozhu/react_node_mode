import React, { memo, useEffect, useState } from 'react';
import { Button, Space, Swiper, Toast } from 'antd-mobile';
import { history } from 'umi';

import './index.less';
import { bannerDataType } from './types'
import { getBannerData } from '../../request/home'

const SwiperCpn = memo(() => {
  // const navigate = useNavigate();
  const [adListData, setAdListData] = useState<bannerDataType[]>([]);
  const imageArr = [
    {
      url: "https://www.nuit.edu.cn/",
      imageUrl: "https://ossweb-img.qq.com/upload/adw/image/194/20220710/99f4d6c626c3c156c6f48c489d65e203.jpeg"
    },
    {
      url: "https://www.nuit.edu.cn/",
      imageUrl: "https://ossweb-img.qq.com/upload/adw/image/194/20220711/3a6e7b07b9a379fb145fc96780816700.jpeg"
    },
    {
      url: "https://www.nuit.edu.cn/",
      imageUrl: "https://ossweb-img.qq.com/upload/adw/image/194/20220707/05958a245fbeaff893df22a0c34db020.jpeg"
    }
  ]

  useEffect(() => {
    getBannerData()
    .then(res => {
      setAdListData(res.data[0].items)
    })
  }, [])


  const items = adListData.map((item) => {
    return (
      <Swiper.Item
      key={item._id}
      >
        <div
        style={{ width: "100%", height: "100%" }}
        onClick={() => {
          history.push(item.url)
        }}
        >
          <img src={item.image} style={{ width: "100%", height: "100%" }} />
        </div>
    </Swiper.Item>
    )
  })
  return (
    <div className='content'>
      <Swiper autoplay={true} loop={true}>
        {items}
      </Swiper>
    </div>
  )
})

export default SwiperCpn
