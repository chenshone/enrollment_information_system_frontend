import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

import { BaseType, AxiosRequestType } from "@/interface";

import { getLocal } from "@/utils/storage";

// 取消重复请求
const CancelToken = axios.CancelToken;
// 用于存储每个请求的取消函数以及对应标识
const sources: any = [];

// 取消函数
const removeSource = (config: any) => {
  for (const item in sources) {
    if (sources[item].umet === config.url + "&" + config.method) {
      sources[item].cancel("已取消重复请求，请勿重复请求");
      sources.splice(item, 1);
    }
  }
};

class AxiosHttpRequest implements BaseType {
  baseURL: string;
  timeout: number;
  constructor() {
    // this.baseURL = "http://localhost:3000/api";
    this.baseURL = "/api";
    this.timeout = 1500;
  }
  // 配置参数
  getConfigParams() {
    const config = {
      baseURL: this.baseURL,
      timeout: this.timeout,
      headers: {},
    };
    return config;
  }
  // 拦截设置
  interceptors(instance: AxiosInstance) {
    // 请求拦截
    instance.interceptors.request.use(
      (config: AxiosRequestType) => {
        // 取消重复请求
        removeSource(config);
        config.cancelToken = new CancelToken((c) => {
          // 将取消函数存起来
          sources.push({ umet: config.url + "&" + config.method, cancel: c });
        });
        // 添加全局的loading..
        // 请求头携带token
        config.headers["Authorization"] = "Bearer " + getLocal("userToken");
        config.headers["Content-Type"] = "application/json;charset=utf-8";
        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );

    // 响应拦截
    instance.interceptors.response.use(
      (res: any) => {
        // 取消重复请求
        removeSource(res.config);

        // 未设置状态码则默认成功状态
        res.data["code"] ? res.data["code"] : 200;
        return Promise.resolve(res.data);
      },
      (error: any) => {
        return Promise.reject(error.response.data);
      }
    );
  }

  /**
   * 外部调用方法
   * @param options axios请求参数
   * @returns 实例
   */
  request(options: AxiosRequestConfig) {
    const instance = axios.create();
    options = Object.assign(this.getConfigParams(), options);
    this.interceptors(instance);
    return instance(options);
  }
}

// 实例化请求类
const http = new AxiosHttpRequest();

export default http;
