import React, { useState, useEffect } from 'react';
import { partitions } from '@api/home';
import type { ResponseType } from '@/types/index';
import styles from './tab-bar.module.scss';

type Props = {
  index: number;
  subIndex: number;
  tabChange: ({ index, subIndex, tid }: TabChangeParams) => void;
};

export type TabChangeParams = {
  index: number;
  subIndex: number;
  tid: number;
};

type Tab = {
  data: TabItem;
  list: {
    tid: number;
    typename: string;
  }[];
  subList: {
    tid: number;
    typename: string;
  }[];
};

type TabItem = {
  [key: string]: {
    tid: number;
    typename: string;
  }[];
};

function TabBar(props: Props): React.ReactElement {
  const [tab, setTab] = useState<Tab>({
    data: {},
    list: [],
    subList: []
  });

  const getPartitions = () => {
    partitions({})
      .then((res: ResponseType<TabItem>) => {
        if (res?.code === '1') {
          if (!res.data) {
            return false;
          }

          res.data[0]?.unshift({ tid: 0, typename: '首页' });
          res.data[0]?.push({ tid: -1, typename: '直播' });

          setTab({ ...tab, data: res.data!, list: res?.data[0] });
        }
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    getPartitions();
  }, []);

  const tabChange = (index: number, tid: number): boolean | undefined => {
    props.tabChange({ index, subIndex: 0, tid });

    // tid 0为首页 -1为直播
    if (tid === 0 || tid === -1 || tab.data[tid].length === 0) {
      setTab({ ...tab, subList: [] });
      return false;
    }

    // 子导航添加推荐
    if (!tab.data[tid].find(item => item.tid === 1)) {
      tab.data[tid]?.unshift({ tid: 1, typename: '推荐' });
    }

    setTab({ ...tab, subList: tab.data[tid] });
  };

  const tabSubChange = (index: number, tid: number): void => {
    props.tabChange({ index: props.index, subIndex: index, tid });
  };

  return (
    <div className={styles.tabbar}>
      <div className={styles.group}>
        <div className={styles.list}>
          {tab.list.map((item, index) => {
            return (
              <div
                className={`${styles.item} ${
                  index === props.index ? styles.activeItem : ''
                }`}
                key={index}
                onClick={() => tabChange(index, item.tid)}
              >
                {item.typename}
              </div>
            );
          })}
        </div>
        <i className={`icon-arrow-down ${styles.itemIcon}`}></i>
      </div>
      <div className={styles.group}>
        <div className={`${styles.list} ${styles.subList}`}>
          {tab.subList.map((item, index) => {
            return (
              <div
                className={`${styles.item} ${
                  index === props.subIndex ? styles.activeItem : ''
                }`}
                key={index}
                onClick={() => tabSubChange(index, item.tid)}
              >
                {item.typename}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TabBar;
