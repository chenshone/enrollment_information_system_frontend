import http from "./http";

//文章
export const getArticleList = (params: any) => {
  return http.request({
    url: "/article",
    method: "get",
    params: {
      page: params.page,
      topics: params.topics,
    },
  });
};

export function getArticleById(id: string) {
  return http.request({
    url: "/article/one",
    method: "get",
    params: {
      id,
    },
  });
}

// 登录
export const loginApi = (data: any) => {
  return http.request({
    url: "/user/login",
    method: "POST",
    data,
  });
};

export const loginTokenApi = (data: any) => {
  return http.request({
    url: "/user/login_token",
    method: "POST",
    data,
  });
};

// 注册
export const signinApi = (data: any) => {
  return http.request({
    url: "/user/register",
    method: "POST",
    data,
  });
};

//提问
export const upComment = (data: any) => {
  return http.request({
    url: "/comment",
    method: "POST",
    data,
  });
};

export const getCommentsByPage = (page: number) => {
  return http.request({
    url: "/comment",
    method: "GET",
    params: {
      page,
    },
  });
};
