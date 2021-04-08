import Taro from '@tarojs/taro';

let wxSessionValid; // 微信session_key的有效性判断

/**
 * 用户检查有效性
 * @param func 获取 userInfo 之后的执行函数
 */
export const checkSession = async (func = () => {}) => {
  try {
    await Taro.checkSession();
    wxSessionValid = true;
    console.log('session 有效请求用户信息');
    await global._store
      .dispatch({
        type: 'user/getUserInfo',
      })
      .then(func);
  } catch (e) {
    if (!wxSessionValid) {
      console.log('session 失效 发起登录');
      global._store.dispatch({
        type: 'user/logout',
      });
      global._store
        .dispatch({
          type: 'user/preLogin',
        })
        .then(func);
    }
  }
};
