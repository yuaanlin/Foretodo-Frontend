import Taro, { Component, Config } from '@tarojs/taro';
import {Provider} from 'react-redux';
import Index from './pages/index';
import dva from './dva';
import models from './models';
import { checkSession } from './utils/taro';

declare global {
  namespace NodeJS {
    export interface Global {
      _store;
    }
  }
}

const dvaApp = dva.createApp({
  initialState: {},
  models: models,
});

const store = dvaApp.getStore();
global._store = store;

class App extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/home/index', // 01 主页
      // 'pages/grade/index', // 14 关于页面
      'pages/home/search', // 02 搜索页
      'pages/detail/index', // 03 老师课程详情页
      'pages/detail/comment', // 04 发布评论页面
      'pages/addNew/index', // 05 新增或修改老师课程页
      'pages/addNew/success', // 06 新增成功页
      'pages/search/index', // 07 搜索学校 课程 老师等页面
      'pages/user/register', // 08 用户注册页面
      'pages/user/index', // 09 我的
      'pages/audit/index', // 10 审核结果页面
      'pages/splash/index', // 11 闪屏页
      'pages/user/settings', // 12 个人设置页面
      'pages/user/update', // 13 个人更新信息页面
      'pages/about/index', // 14 关于页面
      'pages/grade/index', // 15 成绩页面
      'pages/user/identity', // 16 身份认证页面
      'pages/exam/welcome', // 17 欢迎测试
      'pages/exam/question', // 18 考试内容
      'pages/exam/result', // 19 考试结果
      'pages/grade/sync', // 20 成绩同步
      'pages/detail/replydetails', // 21 二级回复查看界面
      'pages/detail/addreply', //22 添加回复界面
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '课否',
      navigationBarTextStyle: 'black',
    },
    tabBar: {
      selectedColor: '#4d5af1',
      borderStyle: 'white',
      list: [
        {
          text: '首页',
          pagePath: 'pages/home/index',
          iconPath: 'assets/images/tablist/home.png',
          selectedIconPath: 'assets/images/tablist/home-s.png',
        },
        {
          text: '成绩',
          pagePath: 'pages/grade/index',
          iconPath: 'assets/images/tablist/grade.png',
          selectedIconPath: 'assets/images/tablist/grade-s.png',
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
      store.dispatch({ type: 'global/save', payload: { systemInfo } });
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

Taro.render(<App />, document.getElementById('app'));
