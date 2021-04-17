import Taro from '@tarojs/taro';

import {UserModelState, DvaModel} from "./connect";
import {ItemTypeGroup} from "@/models/home";

export interface IAddPackgeItem {
  type: string,
  index: number,
  duration: number
}

export interface AddPackageModelState {
  itemTypeGroup : ItemTypeGroup[],
  items: IAddPackgeItem[],
}
