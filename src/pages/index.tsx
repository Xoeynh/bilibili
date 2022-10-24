import { banner } from '@api/home';
import type { ReactElement } from 'react';
import type { ResponseType } from '@/types/index';
import styles from './index.module.scss';

function Index(): ReactElement {
  return <div className={styles.home}>hello wrold</div>;
}

export async function getStaticProps() {
  const res: ResponseType<any> = await banner({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL
  });

  const props = {
    list: []
  };

  if (res?.code === 200) {
    props.list = res?.data || [];
  }

  return {
    props,
    revalidate: 10
  };
}

export default Index;
