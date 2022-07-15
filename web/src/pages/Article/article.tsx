import React, { memo, useEffect, useState } from 'react';
import {
    LeftOutline
} from 'antd-mobile-icons';
import { useParams, useNavigate } from 'umi';

import styles from './article.less'
import { articleDataTypes } from './types'
import { getArticle } from '../../request/article/index'

const Article = memo(() => {
    const urlParams = useParams();
    const [articleData, setArticleData] = useState<articleDataTypes>();
    const navigate = useNavigate();
    useEffect(() => {
        if(urlParams.id) {
            getArticle(urlParams.id)
            .then(res => {
                setArticleData(res.data)
            })
        }
        
    }, [])
    return (
        <>
            <div className={styles.title}>
                文章详情页
            </div>
            <div className={styles.nav}>
                <div className={styles.icon}
                onClick={() => {
                    navigate("/");
                }}
                >
                    <LeftOutline />
                </div>
                <div className={styles.navTitle}>
                    { articleData?.name }
                </div>
            </div>
            <div
            className={styles.articleDetail}
            dangerouslySetInnerHTML={{ __html:articleData?.body || "" }}
            >
            </div>
        </>
    )
})

export default Article