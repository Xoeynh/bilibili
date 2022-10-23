import axios from '@utils/axios';
import type { AxiosPromise } from 'axios';

type List = { baseUrl?: string; page: number; size: number };

/**
 * @description 最近更新 - 列表
 * @param { String } [baseUrl] - 接口基础url(服务端渲染)
 * @param { Number } page - 页数
 * @param { Number } size - 条数
 */
export const allList = ({ baseUrl, page, size }: List): AxiosPromise => {
  const params = { page, size };

  return axios.request({
    url: `${baseUrl ? baseUrl : '/api'}/life-essay/all-list`,
    method: 'get',
    params
  });
};
