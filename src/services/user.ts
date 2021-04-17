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

export const getUserInfo = async () => {
  return request.get(`/user/info?fields=avatar;nickName`, {
    header: {
      Authorization: getJWT(),
    },
  });
};
