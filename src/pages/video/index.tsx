import React from 'react';
import Image from 'next/image';
import { videoDetail } from '@/api/video';
import type { GetServerSidePropsContext } from 'next';
import type { ResponseType } from '@/types';
import Layout from '@/components/layout/Layout';
import VideoPlayer from '@/page-component/video/video-player/VideoPlayer';
import VideoRecommend from '@/page-component/video/recommend/Recommend';
import VideoComment from '@/page-component/video/comment/Comment';
import styles from './video.module.scss';

type Props = {
  cid: number;
  pic: string;
  stat: {
    view: number;
    danmaku: number;
  };
  ctime: number;
  duration: number;
  title: string;
  owner: {
    face: string;
    name: string;
  };
};

function Video(props: Props): React.ReactElement {
  return (
    <div className={styles.video}>
      <VideoPlayer {...props} />
      <div className={styles.title}>
        <span className={styles.titleHot}>热门</span>
        <span className={styles.titleText}>{props.title}</span>
        <div className={styles.author}>
          <div className={styles.authorInfo}>
            <div className={styles.infoCover}>
              <Image
                src={props?.owner?.face}
                fill
                sizes="100%"
                priority
                alt=""
              />
            </div>
            <span className={styles.infoText}>{props?.owner?.name}</span>
          </div>
          <div className={styles.authorOther}>
            <i className={styles.iconLike}></i>
            <i className={styles.iconCollection}></i>
            <i className={styles.iconShare}></i>
          </div>
        </div>
      </div>
      <div className={styles.relevant}>
        <VideoRecommend />
      </div>
      <div className={styles.comment}>
        <VideoComment />
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const props = {};

  try {
    const res: ResponseType<Props> = await videoDetail({
      baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
      aid: Number(context.query.aid)
    });

    if (res?.code === 0) {
      Object.assign(props, res.data);
    }
  } catch {
    return {
      notFound: true
    };
  }

  return {
    props
  };
}

Video.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Video;
