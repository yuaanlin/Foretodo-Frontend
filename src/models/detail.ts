import Taro from '@tarojs/taro';
import home, {ItemTypeGroup, TodoItem} from "@/models/home";
import {fetchPackage} from "@/services/detail";
import {UserModelState, DvaModel, HomeModelState} from "./connect";


export interface DetailModelState {
  items: TodoItem[];
  beginTime: string;
  endTime: string;
  title: string;
}

const detail: DvaModel<DetailModelState> = {
  namespace: 'detail',
  state: {
    items: [],
    beginTime: '',
    endTime: '',
    title: '',
  },
  reducers: {
    save(state, {payload}) {
      return {...state, ...payload};
    },
  },
  effects: {
    * fetchPackage({payload}, {call, put}) {
      const {id} = payload;
      console.log(id);
      const {code, data} = yield call(fetchPackage, id);
      if (code === 0 && data) {
        const {items, beginTime, endTime, title} = data.todoPackage;
        yield put({
          type: 'save',
          payload: {items, beginTime, endTime, title},
        });
      }
    },

  }
};

export default detail;
