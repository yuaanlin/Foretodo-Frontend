import Taro from '@tarojs/taro';
import qs from 'qs';

const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:7001'
    : process.env.TEST === 1
    ? // 测试地址
      'https://kefou-test.topless.tech'
    : // 线上开发地址
      'https://kefou.topless.tech';

export const HTTP_ERROR = {
  '400': '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  '401': '用户没有权限（令牌、用户名、密码错误）。',
  '403': '用户得到授权，但是访问是被禁止的。',
  '404': '请求不存在',
  '406': '请求的格式不可得。',
  '410': '请求的资源被永久删除，且不会再得到的。',
  '422': '当创建一个对象时，发生一个验证错误。',
  '500': '服务器发生错误，请检查服务器。',
  '502': '网关错误。',
  '503': '服务不可用，服务器暂时过载或维护。',
  '504': '网关超时。',
};
/**
 * 检查http状态值
 * @param response
 * @returns {*}
 */
function checkHttpStatus(response: API.Response) {
  Taro.stopPullDownRefresh();

  Taro.hideNavigationBarLoading();

  if (response.statusCode >= 200 && response.statusCode < 300) {
    return response.data;
  } else if (response.statusCode == 400) {
  }
  const message = HTTP_ERROR[response.statusCode] || `ERROR CODE: ${response.statusCode}`;
  const error: any = new Error(message);
  error.data = response.data;
  error.text = message;
  error.code = response.statusCode;
  throw error;
}

/**
 * 检查返回值是否正常
 */
function checkSuccess(data: any) {
  if (data instanceof ArrayBuffer && typeof data === 'string') {
    return data;
  }
  if (data.code > -1) {
    return data;
  }
  const message = data.message || '服务器异常';
  const error: any = new Error(message);
  error.data = data;
  error.text = data;
  error.code = data.code;
  throw error;
}

/**
 * 请求错误处理
 */
function throwError(err) {
  Taro.hideNavigationBarLoading();
  Taro.hideNavigationBarLoading();
  // const error: any = new Error(err.errMsg || '服务器正在维护中!');
  if (process.env.TARO_ENV === 'weapp' && process.env.NODE_ENV === 'development') {
    Taro.atMessage({
      type: 'error',
      message: `${err.message} 状态码: ${err.code}`,
    });
  }
  throw err;
}

export const setJWT = (token) => Taro.setStorageSync('jwt', token);
export const getJWT = () => Taro.getStorageSync('jwt');
export const removeJWT = () => Taro.removeStorageSync('jwt');

export default {
  request(url, options: any, method?: string) {
    let contentType = 'application/x-www-form-urlencoded';
    contentType = options.contentType || contentType;
    Taro.showNavigationBarLoading();
    return Taro.request({
      ...options,
      method: method || 'GET',
      url: `${BASE_URL}${url}`,
      header: {
        'content-type': contentType,
        ...options.header,
      },
    })
      .then(checkHttpStatus)
      .then((res) => {
        return checkSuccess(res);
      })
      .catch((error) => {
        throwError(error);
      });
  },
  get(url: string, options?: { [key: string]: any; params?: object }) {
    return this.request(url, { ...options });
  },
  delete(url: string, options?: { [key: string]: any; params?: object }) {
    return this.request(url, { ...options }, 'DELETE');
  },
  post(url, options?: any) {
    return this.request(
      url,
      {
        ...options,
        data: qs.stringify(options.data),
      },
      'POST'
    );
  },
};
