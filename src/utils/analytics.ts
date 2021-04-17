import Taro from '@tarojs/taro';

const { sendEvent: aldSendEvent } = Taro.getApp().aldstat;
export const sendEvent = aldSendEvent;
