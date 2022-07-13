import React, { memo } from 'react';
import styles from './index.less'
import {
    MoreOutline
} from 'antd-mobile-icons';

interface headerProps {
    title: string;
    Icon: any
}

const BaseCardHeader: React.FC<headerProps> = memo(({title, Icon}) => {
  return (
    <div className={styles.header}>
        <div className={styles.iconWapper}>
            <div className={styles.icon}>
                { Icon }
            </div>
            <div className={styles.headerTitle}>
                { title }
            </div>
        </div>
        <div className={styles.rightIcon}>
            <MoreOutline />
        </div>
    </div>
  )
})

export default BaseCardHeader