import { EffectsCommandMap, Subscription } from 'dva';
import { Reducer } from 'redux';

import { GlobalModelState } from './global';
import { UserModelState } from './user';

export {
  UserModelState,
};

export interface ConnectState {
  global: GlobalModelState;
  user: UserModelState;
  routing: { location: Location };
}


//*********************//
// dispatch 相关类型定义 //
//*********************//

// 导出基础方法类型
export { Reducer, EffectsCommandMap, Subscription };

export type Action<P = any, C = (payload: P) => void> = {
  type: string;
  payload?: P;
  callback?: C;
  meta?: {
    mixpanel?: any;
  };
  [key: string]: any;
};

/**
 * Dva dispatch 方法的类型定义
 * @type P: Type of payload
 * @type C: Type of callback
 */
export type Dispatch = <P = any, C = (payload: P) => void>(action: Action) => any;

// Dva 中 effects 方法的类型定义
export type Effect = (
  action: Action,
  effects: EffectsCommandMap & {
    select: <T>(func: (state: ConnectState) => T) => T;
  }
) => void;

// 导出完整可以给到任何一个 Dva Model 的类型
export interface DvaModel<S> {
  namespace?: string;
  state: S;
  reducers: { [key: string]: Reducer<S> };
  effects?: { [key: string]: Effect };
  subscriptions?: { [key: string]: Subscription };
}

//************************//
// React Props 相关类型定义 //
//************************//

// React 组件props 的 DispatchProps
export interface DispatchProps {
  dispatch: Dispatch;
}
