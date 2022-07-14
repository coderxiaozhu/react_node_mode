import React, { memo } from 'react';
import { Card } from 'antd-mobile';

import styles from './index.less'

export interface cardType { 
    title: string;
    content: string
}

const BaseTipCard: React.FC<cardType> = memo((props: cardType) => {
  return (
    <div className={styles.cardContainer}>
        <Card title={props.title}>
            <div className={styles.cardContent}>
                {props.content}
            </div>
        </Card>
    </div>
  )
})

export default BaseTipCard