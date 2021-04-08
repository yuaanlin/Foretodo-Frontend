import { DvaModel } from './connect';

export interface GlobalModelState {
  showLoginModal: boolean;
  showIdentifyModal: boolean;
  showExamModal: boolean;
  page: number;
  pageStack: number;
  systemInfo?: Taro.getSystemInfo.Result;
}

const teacher: DvaModel<GlobalModelState> = {
  namespace: 'global',
  state: {
    showLoginModal: false,
    showIdentifyModal: false,
    showExamModal: false,
    pageStack: 0,
    page: 0,
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

export default teacher;
