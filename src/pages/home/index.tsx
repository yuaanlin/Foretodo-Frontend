import 'taro-ui/dist/style/components/flex.scss';
import Taro, {FC, useEffect,} from '@tarojs/taro';
import {AtButton, AtMessage} from 'taro-ui';
import {View} from '@tarojs/components';
import {useDispatch, useSelector} from '@tarojs/redux';
import {ConnectState} from '@/models/connect';
import {TodoPackage} from '@/components';

import styles from './index.module.less';

const Home: FC = () => {
  const dispatch = useDispatch();
  const {user, home} = useSelector<ConnectState, ConnectState>(
    (state) => state);
  const {login} = user;
  const {todoPackages} = home;

  useEffect(() => {
    dispatch({
      type: 'home/fetchTodoPackages',
    });
  }, [dispatch, login]);

  const addTodoPackage = () => {
    Taro.navigateTo({
      url: `/pages/home/addTodoPackage`,
    });
  };

  const clickPackage = (index) => {
    // dispatch({
    //   type: '/detail/fetchPackage',
    //   payload: {index}
    // })
    const id = todoPackages[index]._id;
    Taro.navigateTo({
      url: `/pages/detail/index?id=${id}`
    });
  };

  return (
    <View className={styles.container} style={'padding: 12px'}>
      <View>
        欢迎回来!
      </View>
      <View className={'at-row'} style={{margin: '16PX 0'}}>
        <View className={'at-col-6'}>
          {todoPackages && todoPackages.map((todoPackage, index) => {
            if (index % 2 === 0)
              return (<View onClick={() => clickPackage(index)}>
                  <TodoPackage todoPackage={todoPackage} />
                </View>
              );
          })}
        </View>
        <View className={'at-col-6'}>
          {todoPackages && todoPackages.map((todoPackage, index) => {
            if (index % 2 === 1)
              return (<View onClick={() => clickPackage(index)}>
                  <TodoPackage todoPackage={todoPackage} />
                </View>
              );
          })}

        </View>
      </View>

      <AtButton
        type={'primary'}
        size={'normal'}
        onClick={addTodoPackage}
      >
        增加package
      </AtButton>
      <AtMessage />
      {/*<LoginModal opened={showLoginModal}/>*/}
    </View>
  );
};

export default Home;
