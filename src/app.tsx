import '@/utils/ald';
import '@tarojs/async-await';
import Taro, {Component, Config} from '@tarojs/taro';
import {Provider} from '@tarojs/redux';
import {checkSession} from '@/utils/taro';

import models from './models/index';
import dva from './dva';
import Index from './pages/home';

import './theme/theme.scss';
import './theme/icon.scss';
import './app.scss';

declare global {
  namespace NodeJS {
    export interface Global {
      _store;
    }
  }
}

// 里面的字符可以根据自己的需要进行调整

const dvaApp = dva.createApp({
  initialState: {},
  models: models,
});

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
const store = dvaApp.getStore();
global._store = store;

class _App extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/home/index', // 主页
      'pages/home/addTodoPackage',
      'pages/detail/index',
      'pages/detail/checkin',
      'pages/user/register',
      'pages/user/index',
      'pages/forum/index',
      'pages/forum/addPost'
    ],
    window: {
      navigationStyle: 'default',
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#abaeff',
      navigationBarTitleText: 'FORETODO',
      navigationBarTextStyle: 'white',
    },
    tabBar: {
      selectedColor: '#abaeff',
      borderStyle: 'white',
      list: [
        {
          text: '首页',
          pagePath: 'pages/home/index',
          iconPath: 'assets/images/tablist/home.png',
          selectedIconPath: 'assets/images/tablist/home-s.png',
        },
        {
          text: '社区',
          pagePath: 'pages/forum/index',
          iconPath: 'assets/images/tablist/forum.png',
          selectedIconPath: 'assets/images/tablist/forum-s.png',
        },
        {
          text: '我的',
          pagePath: 'pages/user/index',
          iconPath: 'assets/images/tablist/my.png',
          selectedIconPath: 'assets/images/tablist/my-s.png',
        },
      ],
    },
  };

  componentDidMount() {
    checkSession();
    Taro.getSystemInfo().then((systemInfo) => {
      store.dispatch({type: 'global/save', payload: {systemInfo}});
    });
  }

  componentDidCatchError(e) {
    console.log(e);
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<_App />, document.getElementById('app'));
