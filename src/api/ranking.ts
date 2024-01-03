import axios from '@/utils/axios';
import type { AxiosPromise } from 'axios';

type BaseParams = { baseUrl?: string };

/**
 * @description 排行榜 - 分类导航
 * @param { Object } params
 * @param { string } [params.baseUrl] - 接口基础url(服务端渲染)
 */
export const rankNav = ({ baseUrl }: BaseParams): AxiosPromise => {
  return axios.request({
    url: `${baseUrl ? baseUrl : '/api'}/ranking/nav`,
    method: 'get'
  });
};

type RankRegion = BaseParams & {
  rid: number;
};

/**
 * @description 排行榜 - 分类列表
 * @param { Object } params
 * @param { string } [params.baseUrl] - 接口基础url(服务端渲染)
 * @param { number } params.rid - 分类导航id
 */
export const rankRegion = ({ baseUrl, rid }: RankRegion): AxiosPromise => {
  const params = { rid };

  return axios.request({
    url: `${baseUrl ? baseUrl : '/api'}/ranking/region`,
    method: 'get',
    params
  });
};
