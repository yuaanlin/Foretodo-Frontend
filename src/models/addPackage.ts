import Taro from '@tarojs/taro';
import home, {ItemTypeGroup} from "@/models/home";
import {fetchItemTypeGroup, submitTodoPackage} from "@/services/addPackage";
import {UserModelState, DvaModel, HomeModelState} from "./connect";


export interface IAddPackgeItem {
  type: number,
  group: number,
  duration: number
}

export interface AddPackageModelState {
  itemTypeGroup: ItemTypeGroup[],
  items: IAddPackgeItem[],
}

const addPackage: DvaModel<AddPackageModelState> = {
  namespace: 'addPackage',
  state: {
    itemTypeGroup: [],
    items: [],
  },
  reducers: {
    save(state, {payload}) {
      return {...state, ...payload};
    },
  },
  effects: {
    * fetchItemTypeGroup(_, {call, put}) {
      const {code, data} = yield call(fetchItemTypeGroup);
      if (code === 0 && data) {
        const {itemTypeGroup} = data;
        yield put({
          type: 'save',
          payload: {itemTypeGroup},
        });
      }
    },
    * addItem({payload}, {put, select}) {
      const {index} = payload;
      const {items} = yield select((state) => state.addPackage);
      items.push({type: 0, group: 0});
      yield put({
        type: 'save',
        payload: {items}
      })
    },
    * changeItem({payload}, {put, select}) {
      const {index, group, type, duration} = payload;
      const {items} = yield select((state) => state.addPackage);
      items[index] = {group, type, duration};
      yield put({
        type: 'save',
        payload: {items}
      })
    },

    * deleteItem({payload}, {put, select}) {
      const {index} = payload;
      const {items} = yield select((state) => state.addPackage);
      items.splice(index, 1);
      yield put({
        type: 'save',
        payload: {items}
      })
    },

    * submit({payload}, {call, put, select}) {
      const {beginTime, endTime, title} = payload;
      const {items: itemIndexs, itemTypeGroup} = yield select((state) => state.addPackage);
      const items = itemIndexs.map((item) => {
        const {duration} = item;
        const type = (itemTypeGroup[item.group].itemTypes[item.type]._id);
        return {
          type,
          duration
        }
      });
      const {code} = yield call(submitTodoPackage, {items, beginTime, endTime, title});
      if (code === 0) {
        yield put({type: 'fetchItemTypeGroup'});
        Taro.switchTab({url: '/pages/home/index'});
      }
    },

  }
};

export default addPackage;
