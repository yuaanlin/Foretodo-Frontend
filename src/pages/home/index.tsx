import Taro, {
  FC,
  useEffect,
} from '@tarojs/taro';
import {AtMessage,AtButton} from 'taro-ui';
import {View} from '@tarojs/components';
import {useDispatch, useSelector} from '@tarojs/redux';
import {ConnectState} from '@/models/connect';
import {TodoPackage} from '@/components';

import styles from './index.module.less';

const Home: FC = () => {
  const dispatch = useDispatch();
  const {user, home} = useSelector<ConnectState, ConnectState>((state) => state);
  const {login} = user;
  const {todoPackages} = home;

  useEffect(() => {
    dispatch({
      type: 'home/fetchTodoPackages',
    });
  }, [login]);


  const addTodoPackage = () => {
    Taro.navigateTo({
      url: `/pages/home/addTodoPackage`,
    });
  };

  return (
    <View className={styles.container}>
      {todoPackages && todoPackages.map((todoPackage) => {
        return (<TodoPackage todoPackage={todoPackage}/>)
      })}
      <AtButton
        type={'primary'}
        // className={styles.button}
        size={'normal'}
        onClick={addTodoPackage}
      >
        增加package
      </AtButton>
      <AtMessage/>
      {/*<LoginModal opened={showLoginModal}/>*/}
    </View>
  );
};

Home.config = {
  navigationStyle: 'custom',
  backgroundColorTop: '#8db8f8',
};

export default Home;
