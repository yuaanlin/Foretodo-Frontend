import request, { getJWT } from '../utils/request';

export const wechatPreLogin = async (data) => {
  return request.post(`/user/login/wechat`, {
    data,
  });
};
export const register = async (_id, data) => {
  return request.post(`/user/${_id}/info/register`, {
    data,
    header: {
      Authorization: getJWT(),
    },
  });
};
export const getUserInfoById = async (id) => {
  return request.get(`/user/${id}?fields=avatar;nickName`, {
    header: {
      Authorization: getJWT(),
    },
  });
};
export const getUserInfo = async () => {
  return request.get(`/user/info?fields=avatar;nickName;comments;ups;stuid`, {
    header: {
      Authorization: getJWT(),
    },
  });
};
export const getUserActionInfo = async (type, id) => {
  return request.get(`/user/action/${type}/${id}`, {
    header: {
      Authorization: getJWT(),
    },
  });
};
export const updateUserInfo = async (id, data) => {
  return request.post(`/user/${id}/info/`, {
    data,
    header: {
      Authorization: getJWT(),
    },
  });
};
