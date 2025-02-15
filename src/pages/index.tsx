import React from 'react';
import { useRouter } from 'next/router';
import { useStore } from 'react-redux';
import Image from 'next/image';
import { formatTenThousand } from '@/utils/utils';
import { indexList } from '@/api/home';
import type { ResponseType } from '@/types/index';
import Layout from '@/components/layout/Layout';
import TabBar from '@/page-component/index/tab-bar/TabBar';
import styles from './index.module.scss';

type Props = {
  list: ItemType[];
};

type ItemType = {
  aid: number;
  pic?: string;
  title?: string;
  stat: {
    view: number;
    danmaku: number;
  };
};

function Index(props: Props): React.ReactElement {
  const router = useRouter();
  const store = useStore();

  // 跳转视频详情
  const jumpVideoDetail = (item: ItemType): void => {
    router.push({
      pathname: '/video',
      query: { aid: item.aid }
    });

    store.dispatch({
      type: 'routine/setViewHistory',
      payload: {
        aid: item.aid,
        pic: item.pic,
        title: item.title,
        createTime: new Date().getTime() / 1000
      }
    });
  };

  const RenderItem = ({ item }: { item: ItemType }) => {
    return (
      <li className={styles.item} onClick={() => jumpVideoDetail(item)}>
        <div className={styles.itemCover}>
          <Image
            className={styles.itemImage}
            src={item?.pic || ''}
            fill
            sizes="50%"
            priority
            alt=""
          />
          <div className={styles.info}>
            <div className={styles.infoItem}>
              <i className={`icon-play-count ${styles.itemIcon}`}></i>
              <span className={styles.itemText}>
                {formatTenThousand(item.stat.view)}
              </span>
            </div>
            <div className={styles.infoItem}>
              <i className={`icon-barrage-count ${styles.itemIcon}`}></i>
              <span className={styles.itemText}>
                {formatTenThousand(item.stat.danmaku)}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.itemTitle}>{item?.title}</div>
      </li>
    );
  };

  return (
    <div className={styles.indexMain}>
      <ul className={styles.list}>
        {props.list?.map((item, index) => {
          return <RenderItem key={index} item={item} />;
        })}
      </ul>
    </div>
  );
}

export async function getServerSideProps(): Promise<{ props: Props }> {
  const res: ResponseType<Props['list']> = await indexList({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    page: 1
  });

  const props: Props = {
    list: []
  };

  if (res.code === 0) {
    props.list = res?.data?.slice(0, 20) || [];
  }

  return {
    props
  };
}

Index.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <div className={styles.index}>
      <Layout>
        <TabBar />
        {page}
      </Layout>
    </div>
  );
};

export default Index;
