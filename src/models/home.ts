import {fetchTodoPackages} from '@/services/home';
import {DvaModel, UserModelState} from './connect';

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
  group: ItemTypeGroup
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
  },
  subscriptions: {},
};

export default home;
