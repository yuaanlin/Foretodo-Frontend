import Taro from '@tarojs/taro';

import {fetchTodoPackages} from '@/services/home';
import {UserModelState, DvaModel} from "./connect";


export interface HomeModelState {
  todoPackages: TodoItemPackge[],
}

export interface HomeModelReducers {
}

export interface ItemTypeGroup {
  _id: string,
  name: string,
  itemTypes: ItemType[],
}

export interface ItemType {
  _id: string,
  name: string,
  group: string
}

export interface TodoItem {
  _id: string,
  duration: number,
  user: UserModelState,
  done: boolean,
  package: string,
  type: ItemType,
}

export interface TodoItemPackge {
  _id: string,
  title: string,
  user: UserModelState,
  items: TodoItem[],
  beginTime: string,
  endTime: string
}

const home: DvaModel<HomeModelState> = {
  namespace: 'home',
  state: {
    todoPackages: [],
  },
  reducers: {
    save(state, {payload}) {
      return {...state, ...payload};
    },
  },
  effects: {
    * fetchTodoPackages(_, {call, put, select}) {
      const {_id} = yield select((state) => state.user);
      if (_id) {
        const {code, data} = yield call(fetchTodoPackages);
        if (code === 0 && data) {
          const {todoPackages} = data;
          yield put({
            type: 'save',
            payload: {todoPackages},
          });
        }
      }
    },

    // * fetchLatestComments(_, {call, put, select}) {
    //   const {_id} = yield select((state) => state.user.school);
    //   const {code, data} = yield call(fetchLatestComments, _id);
    //   if (code === 0 && data) {
    //     const {comments} = data;
    //     yield put({
    //       type: 'save',
    //       payload: {comments},
    //     });
    //   }
    // },
    // * fetchBanners(_, {call, put}) {
    //   const {code, data} = yield call(fetchBanners);
    //   if (code === 0 && data) {
    //     const {banners} = data;
    //     yield put({
    //       type: 'save',
    //       payload: {banners},
    //     });
    //   }
    // },
    // * fetchHotList({payload}, {call, select}) {
    //   const {type} = payload;
    //   const {_id} = yield select((state) => state.user.school);
    //
    //   try {
    //     const {code, data} = yield call(fetchHotList, type, _id);
    //     if (code === 0 && data) {
    //       Taro.setStorageSync(`${type}HotList`, data);
    //     }
    //   } catch (e) {
    //     console.log(e);
    //   }
    // },
  },
  subscriptions: {},
};

export default home;
