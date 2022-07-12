import styles from './home.less';
import SwiperCpn from '@/components/swiperCpn';

export default function HomePage() {
  return (
    <>
      <div className={styles.title}>
        官网首页
      </div>
      <div className={styles.swiperWapper}>
        <SwiperCpn />
      </div>
    </>
  );
}
