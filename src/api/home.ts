import axios from '@utils/axios';
import type { AxiosPromise } from 'axios';

type BaseParams = { baseUrl?: string };

/**
 * @description 轮播图
 * @param { String } [baseUrl] - 接口基础url(服务端渲染)
 */
export const banner = ({ baseUrl }: BaseParams): AxiosPromise => {
  return axios.request({
    url: `${baseUrl ? baseUrl : '/api'}/round-sowing`,
    method: 'get'
  });
};

/**
 * @description 导航分类
 * @param { String } [baseUrl] - 接口基础url(服务端渲染)
 */
export const partitions = ({ baseUrl }: BaseParams): AxiosPromise => {
  return axios.request({
    url: `${baseUrl ? baseUrl : '/api'}/partitions`,
    method: 'get'
  });
};

/**
 * @description 首页列表
 * @param { String } [baseUrl] - 接口基础url(服务端渲染)
 */
export const ranking = ({ baseUrl }: BaseParams): AxiosPromise => {
  return axios.request({
    url: `${baseUrl ? baseUrl : '/api'}/ranking/0`,
    method: 'get'
  });
};

type RankingRegion = {
  rId: number;
  day: number;
} & BaseParams;

/**
 * @description 导航分类 - 热门推荐列表
 * @param { String } [baseUrl] - 接口基础url(服务端渲染)
 * @param { String } rId - 接口基础url(服务端渲染)
 * @param { String } day - 天数
 */
export const rankingRegion = ({
  baseUrl,
  rId,
  day
}: RankingRegion): AxiosPromise => {
  const params = { rId, day };

  return axios.request({
    url: `${baseUrl ? baseUrl : '/api'}/ranking/region`,
    method: 'get',
    params
  });
};

type RankingArchive = {
  tId: number;
  p: number;
} & BaseParams;

/**
 * @description 导航分类 - 最新视频列表
 * @param { String } [baseUrl] - 接口基础url(服务端渲染)
 * @param { String } tId - 接口基础url(服务端渲染)
 * @param { String } p - 页数
 */
export const rankingArchive = ({
  baseUrl,
  tId,
  p
}: RankingArchive): AxiosPromise => {
  const params = { tId, p };

  return axios.request({
    url: `${baseUrl ? baseUrl : '/api'}/ranking/archive`,
    method: 'get',
    params
  });
};
