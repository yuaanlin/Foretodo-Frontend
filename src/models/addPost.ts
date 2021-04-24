import {submitPost} from '@/services/post';
import {TodoItemPackge} from '@/models/home';
import {fetchTodoPackages} from '@/services/home';
import Taro from '@tarojs/taro';
import {DvaModel} from './connect';

export interface AddPostModelState {
  todoPackages: TodoItemPackge[]
}

const addPackage: DvaModel<AddPostModelState> = {
  namespace: 'addPost',
  state: {
    todoPackages: []
  },
  reducers: {
    save(state, {payload}) {
      return {...state, ...payload};
    },
  },
  effects: {
    * fetchPackages(_, {call, put}) {
      const {code, data} = yield call(fetchTodoPackages);
      if (code === 0 && data) {
        const {todoPackages} = data;
        yield put({
          type: 'save',
          payload: {todoPackages},
        });
      }
    },
    * submit({payload}, {call}) {
      const {title, content, packageId} = payload;
      const {code} = yield call(submitPost,
        {title, content, packageId});
      if (code === 0) {
        Taro.switchTab({url: '/pages/forum/index'});
      }
    },
  }
};

export default addPackage;
