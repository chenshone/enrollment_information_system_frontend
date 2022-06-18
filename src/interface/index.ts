import { AxiosInstance, AxiosRequestConfig } from "axios";

import type { Dayjs } from "dayjs";

export interface BaseType {
  baseURL: string;
  getConfigParams(): any;
  interceptors(instance: AxiosInstance, url: string | number | undefined): any;
  request(options: AxiosRequestConfig): any;
}

export interface AxiosRequestType {
  baseURL?: string;
  url?: string | undefined;
  data?: any;
  params?: any;
  method?: string;
  headers?: any;
  timeout?: number;
  value?: any;
  cancelToken?: any;
}

export interface bannerItem {
  src: string;
  id: number;
}
export interface newsIntro {
  id: string;
  title: string;
  datetime: string;
}

export interface commentInfo {
  id: string;
  author: string;
  content: string;
  datetime: Dayjs | string;
  reply?: replyInfo;
}

interface replyInfo {
  id: string;
  cid: string;
  author: string;
  content: string;
  datetime: Dayjs | string;
}
