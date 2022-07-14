import React, { memo, useEffect, useState } from 'react';
import { useParams } from 'umi';
import { Card } from 'antd-mobile';

import { getHeroDetail } from '../../request/hero';
import { heroDataType } from './heroType';
import BaseTipCard from '../../components/baseTipCard'
import { cardType } from '../../components/baseTipCard'
import styles from './hero.less';

const Hero = memo(() => {
    const [herosData, setHerosData] = useState<heroDataType>();
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const urlParams = useParams();
    useEffect(() => {
        if(urlParams.id) {
            getHeroDetail(urlParams.id)
            .then(res => {
                console.log(res.data);
                setHerosData(res.data)
            })
        }
    }, [])
    const userMsg: cardType = {
        title: "使用技巧",
        content: herosData?.usageTips || ""
    }
    const battleMsg: cardType = {
        title: "对抗技巧",
        content: herosData?.battleTips || ""
    }
    const teamMsg: cardType = {
        title: "团战思路",
        content: herosData?.teamTips || ""
    }
    return (
        <div style={{ marginBottom: "1rem" }}>
        <div className={styles.title}>
            英雄详情页
        </div>
        <div>
            <div className={styles.banner}>
                <div className={styles.maskBox}>
                    <div className={styles.heroTitle}>
                        { herosData?.title }
                    </div>
                    <div className={styles.heroName}>
                        { herosData?.name }
                    </div>
                    {
                        herosData?.categories.map((item: any) => {
                            return (
                                <div className={styles.heroLocation} key={ item._id }>
                                    { item.name }
                                </div>
                            )
                        })
                    }
                    <div className={styles.heroCover}>
                        <span>难度: { herosData?.scores.difficult }</span>
                        <span>技能: { herosData?.scores.skill }</span>
                        <span>攻击: { herosData?.scores.attack }</span>
                        <span>生存: { herosData?.scores.survive }</span>
                    </div>
                </div>
                <img src={herosData?.avatar} />
            </div>
            <div className={styles.skillWapper}>
                <Card title='英雄技能'>
                    <div className={styles.skillContent}>
                        <div
                            className={styles.skillBox}
                        >
                        {
                            herosData?.skills.map((item: any, index: number) => {
                                return(
                                        <div className={`${styles.skillImg} ${currentIndex === index ? styles.active : ""}`}
                                            key={item.icon}
                                            onClick={() => {
                                                setCurrentIndex(index);
                                            }}
                                        >
                                            <img src={item.icon} />
                                        </div>
                                )
                            })
                        }
                        </div>
                        <div className={styles.skillDetail}>
                            <div className={styles.skillTitle}>
                                { herosData?.skills[currentIndex] && herosData?.skills[currentIndex].name }
                            </div>
                            <div className={styles.skillDes}>
                            { herosData?.skills[currentIndex] && herosData?.skills[currentIndex].description }
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
            <div className={styles.itemWapper}>
                <Card title='出装推荐'>
                    <div className={styles.upItemWapper}>
                        <div className={styles.upItemTitle}>
                            顺风出装
                        </div>
                        <div className={styles.upItemContent}>
                            {
                                herosData?.items1.map((item: any) => {
                                    return (
                                        <div className={styles.upItem} key={item._id}>
                                            <div className={styles.upItemImg}>
                                                <img src={item.icon} />
                                            </div>
                                            <div className={styles.upItemName}>
                                            { item.name }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div> 
                    <div className={styles.downItemWapper}>
                        <div className={styles.downItemTitle}>
                            逆风出装
                        </div>
                        <div className={styles.downItemContent}>
                            {
                                herosData?.items2.map((item: any) => {
                                    return (
                                        <div className={styles.downItem} key={item._id}>
                                            <div className={styles.downItemImg}>
                                                <img src={item.icon} />
                                            </div>
                                            <div className={styles.downItemName}>
                                            { item.name }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </Card>
            </div>
            <BaseTipCard {...userMsg}/>
            <BaseTipCard {...battleMsg}/>
            <BaseTipCard {...teamMsg}/>
            
        </div>
        </div>
    )
})

export default Hero