import {submitPost} from '@/services/post';
import Taro from '@tarojs/taro';
import {DvaModel} from './connect';

export interface AddPostModelState {
}

const addPackage: DvaModel<AddPostModelState> = {
  namespace: 'addPost',
  state: {},
  reducers: {
    save(state, {payload}) {
      return {...state, ...payload};
    },
  },
  effects: {
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
