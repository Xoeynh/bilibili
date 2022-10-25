import React, { useEffect, useState } from 'react';
import { ranking, rankingRegion, rankingArchive } from '@api/home';
import type { ResponseType } from '@/types/index';
import type { TabChangeParams } from '@/components/tab-bar/TabBar';
import type { VideoItem } from '@/components/video-list/VideoList';
import TabBar from '@components/tab-bar/TabBar';
import Panel from '@components/panel/Panel';
import VideoList from '@components/video-list/VideoList';

function Index(): React.ReactElement {
  const [tab, setTab] = useState<TabChangeParams>({
    index: 0,
    subIndex: 0,
    tid: 0
  });

  const tabChange = ({ index, subIndex, tid }: TabChangeParams): void => {
    setTab({ index, subIndex, tid });
  };

  const [list, setList] = useState<{ [key: string]: VideoItem[] }>({
    index: [],
    region: [],
    archive: []
  });

  // 首页列表
  const getRanking = () => {
    ranking({})
      .then((res: ResponseType<{ list: VideoItem[] }>) => {
        if (res?.code === '1') {
          if (!res.data?.list) {
            return false;
          }

          setList({ ...list, index: res?.data?.list });
        }
      })
      .catch(() => ({}));
  };

  // 热门推荐列表
  const getRankingRegion = () => {
    rankingRegion({
      rId: tab.tid,
      day: 7
    })
      .then((res: ResponseType<VideoItem[]>) => {
        if (res?.code === '1') {
          if (!res.data) {
            return false;
          }

          setList(state => {
            return { ...state, region: res?.data?.slice(0, 4) || [] };
          });
        }
      })
      .catch(() => ({}));
  };

  // 最新视频列表
  const getRankingArchive = () => {
    rankingArchive({
      tId: tab.tid,
      p: 1
    })
      .then((res: ResponseType<{ archives: VideoItem[] }>) => {
        if (res?.code === '1') {
          if (!res.data?.archives) {
            return false;
          }

          setList(state => ({ ...state, archive: res?.data?.archives || [] }));
        }
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    if (tab.tid === 0) {
      getRanking();
      return;
    }

    getRankingRegion();
    getRankingArchive();
  }, [tab.tid]);

  return (
    <>
      <TabBar index={tab.index} subIndex={tab.subIndex} tabChange={tabChange} />
      {/* 首页 */}
      {tab.tid === 0 && <VideoList list={list.index} />}
      {/* 分类 - 推荐 */}
      {tab.tid !== 0 && tab.subIndex === 0 && (
        <Panel title="热门推荐" leftIcon subTitle="排行榜" moreColor="#ffa726">
          <VideoList list={list.region} />
        </Panel>
      )}
      {tab.tid !== 0 && tab.subIndex === 0 && (
        <Panel title="最新视频" subTitle="查看更多" moreColor="#999">
          <VideoList list={list.archive} />
        </Panel>
      )}
      {/* 分类 - 其余子项 */}
      {tab.tid !== 0 && tab.subIndex !== 0 && (
        <Panel title="热门推荐">
          <VideoList list={list.region} />
        </Panel>
      )}
      {tab.tid !== 0 && tab.subIndex !== 0 && (
        <Panel title="最新视频">
          <VideoList list={list.archive} />
        </Panel>
      )}
    </>
  );
}

export default Index;
