import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import 'taro-ui/dist/style/components/icon.scss';
import 'taro-ui/dist/style/components/flex.scss';
import numeral from 'numeral';
import { UserModelState } from '@/models/user';

import styles from './style.module.less';

export default ({ _id, name, title, comment, type, rate, index, sortBy, gpa }) => {
  const goToDetail = () => {
    const store = global._store;

    const { nickName } = store.getState().user as UserModelState;

    if (!nickName) {
      store.dispatch({
        type: 'global/save',
        payload: { showLoginModal: true },
      });
      return;
    }
    Taro.navigateTo({
      url: `/pages/detail/index?type=${type}&id=${_id}`,
    });
  };
  return (
    <View className={styles.container} onClick={goToDetail}>
      <View
        className={styles.num}
        style={{
          color:
            index === 1 ? '#fa543e' : index === 2 ? '#fa9543' : index === 3 ? '#facd53' : undefined,
        }}
      >
        {numeral(index).format('00')}
      </View>
      <View style={{ width: '100%' }}>
        <View className={'at-row at-row__justify--between at-row__align--top'}>
          <View className={styles.left}>
            {name}
            <Text className={styles.title}>{title}</Text>
          </View>
          <View className={`at-col-auto ${styles.right}`} style={{ textAlign: 'right' }}>
            {`${sortBy === 'rate' ? '评分' : '均绩'} ${numeral(
              sortBy === 'rate' ? rate : gpa
            ).format('0.0')}`}
          </View>
        </View>

        {comment ? (
          <View className={`at-col-auto ${styles.content}`} style={{ marginTop: '8px' }}>
            “{comment.content}”
          </View>
        ) : null}
      </View>
    </View>
  );
};
