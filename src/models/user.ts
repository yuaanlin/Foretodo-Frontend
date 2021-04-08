import Taro from '@tarojs/taro';
import {DvaModel} from './connect';
import {getJWT, removeJWT, setJWT} from '../utils/request';
import {
  getUserInfo,
  register,
  updateUserInfo,
  wechatPreLogin
} from '../services/user';

export interface UserModelState {
  nickName: string;
  _id: string;
  anonymousAvatar?: string;
  avatar?: string;
  isNew: boolean;
  login: boolean;
  openid?: string;
}

const teacher: DvaModel<UserModelState> = {
  namespace: 'user',
  state: {
    nickName: '',
    _id: '',
    login: false,
    isNew: false,
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    preLogin: function* (_, {put, call}) {
      // 获取用户登录凭证
      try {
        const {code, errMsg} = yield Taro.login();
        if (code) {
          let res = yield call(wechatPreLogin, {code});
          const {code: status, data} = res;
          if (status === 0) {
            yield put({
              type: 'save',
              payload: {...data, login: true},
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
              const pages = Taro.getCurrentPages();
              // 判断当前页面是不是从主页进入
              if (pages[0].route === 'pages/home/index') {
                // 如果是则导航到闪屏页
                Taro.reLaunch({
                  url: '/pages/splash/index',
                });
              }
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
          // 如果没走完,跳转到注册页面
          if (data.role === 'user' && !data.school) {
            Taro.navigateTo({url: '/pages/user/register'});
          } else {
            // 如果走完 将学校数据存给 search 用
            yield put({
              type: 'search/save',
              payload: {school: data.school},
            });
          }
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
    /**
     * 登录时获取用户信息
     */
    * updateUserInfo({payload}, {put, call, select}) {
      const {_id} = yield select((state) => state.user);
      const res = yield call(updateUserInfo, _id, payload);

      if (res.code === 0) {
        yield put({
          type: 'global/save',
          payload: {showLoginModal: false},
        });
        yield put({
          type: 'getUserInfo',
        });
      }
    },
    /**
     * 修改信息后重新获取用户信息
     */
    * refreshUserInfo(_, {call, put}) {
      const {code: status, data} = yield call(getUserInfo);
      // 只有返回不为空的 data,才算获取到用户数据
      if (status === 0 && data) {
        // 恢复用户数据
        yield put({
          type: 'save',
          payload: {...data},
        });
      }
    },
    * register(_, {call, put, select}) {
      const {_id} = yield select((state) => state.user);
      try {
        const {userInfo} = yield Taro.getUserInfo({});
        const {code} = yield call(register, _id, userInfo);
        if (code === 0) {
          yield put({
            type: 'save',
            payload: {...userInfo, avatar: userInfo.avatarUrl},
          });
          Taro.navigateTo({url: '/pages/user/register'});
        }
      } catch (e) {
        Taro.showToast({
          icon: 'none',
          title: '授权失败! 您将无法使用搜索、发布评论等功能，如果需使用，请允许授权',
          duration: 5000,
        });
      }
    },
    * logout(_, {put}) {
      removeJWT();
      put({type: 'save', payload: {login: false, token: ''}});
    },
    /**
     * 更新用户信息
     */
    * updateInfo({payload}, {put, call, select}) {
      const {_id} = yield select((state) => state.user);
      try {
        const res = yield call(updateUserInfo, _id, payload);
        if (res.code === 0) {
          yield put({
            type: 'refreshUserInfo',
          });
          Taro.showToast({
            title: '更新成功',
            duration: 3000,
            success: () => {
              Taro.navigateBack();
            },
          });
        }
      } catch (e) {
        Taro.showToast({
          title: '更新失败,请重试',
          icon: 'none',
        });
      }
    },
  }
};

export default teacher;
