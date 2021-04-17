import Taro from '@tarojs/taro';
import {
  getUserInfo,
  wechatPreLogin,
  register,
} from '@/services/user';
import {getJWT, setJWT} from '@/utils/request';

import {DvaModel} from './connect';

export interface UserModelState {
  nickName: string;
  _id: string;
  avatar?: string;
  isNew: boolean;
  login: boolean;
  openid?: string;
  city?: string;
  province?: string;
  birth?: string;
  country?: string;
  email?: string;
  wechat?: string;
  cnid?: string;
  gender?: string;
}

const teacher: DvaModel<UserModelState> = {
  namespace: 'user',
  state: {
    nickName: '',
    _id: '',
    isNew: false,
    login: false,
  },
  reducers: {
    save(state, {payload}) {
      return {...state, ...payload};
    },
  },
  effects: {
    * preLogin(_, {put, call}) {
      // 获取用户登录凭证
      try {
        const {code, errMsg} = yield Taro.login();
        if (code) {
          let res;

          const type = process.env.TARO_ENV;
          if (type === 'weapp') {
            res = yield call(wechatPreLogin, {code});
          }
          const {code: status, data} = res;
          if (status === 0) {
            yield put({
              type: 'save',
              payload: {...data},
            });
            const {token, isNew} = data;

            // 保存 JWT Token 与后端服务器鉴权
            setJWT(token);

            // 如果是老用户直接获取用户信息
            if (!isNew) {
              yield put({
                type: 'getUserInfo',
              });
            } else {
              Taro.navigateTo({url: '/pages/user/register'});
            }
          }
        } else {
          console.log('登录失败！' + errMsg);
        }
      } catch (e) {
        console.log(e);
      }
    },
    * getUserInfo(_, {call, put}) {
      if (!getJWT()) {
        yield put({
          type: 'preLogin',
        });
        return;
      }
      try {
        const {code: status, data} = yield call(getUserInfo);
        // 只有返回不为空的 data,才算获取到用户数据
        if (status === 0 && data) {
          // 恢复用户数据
          yield put({
            type: 'save',
            payload: {...data},
          });
          // 判断是否走完注册流程

          // 判断是否有昵称 如果有则判断已经登录
          if (data.nickName) {
            yield put({
              type: 'save',
              payload: {login: true},
            });
          }
        } else {
          yield put({
            type: 'preLogin',
          });
        }
      } catch (e) {
        yield put({
          type: 'preLogin',
        });
      }
    },
    * register({payload}, {call, put, select}) {
      const {_id} = yield select((state) => state.user);
      try {
        const {code} = yield call(register, _id, payload);
        if (code === 0) {
          yield put({
            type: 'save',
            payload: {login: true, ...payload},
          });
          Taro.switchTab({url: '/pages/home/index'});
        }
      } catch (e) {
        Taro.showToast({
          icon: 'none',
          title: '注册失败! 您将无法使用该小程序',
          duration: 5000,
        });
      }
    },
  },
};

export default teacher;
