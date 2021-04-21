import Taro, {
  FC,
  useEffect,
} from '@tarojs/taro';
import {AtMessage, AtButton} from 'taro-ui';
import {View} from '@tarojs/components';
import {useDispatch, useSelector} from '@tarojs/redux';
import {ConnectState} from '@/models/connect';
import {TodoPackage} from '@/components';

import styles from './index.module.less';
import 'taro-ui/dist/style/components/flex.scss';

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
    <View className={styles.container} style={"margin-top: 40px"}>
      <View>
        欢迎回来
      </View>
      <View className={'at-row'}>
        <View className={'at-col-6'}>
          {todoPackages && todoPackages.map((todoPackage, index) => {
            if (index % 2 === 0)
              return (<View onClick={() => clickPackage(index)}>
                  <TodoPackage todoPackage={todoPackage}/>
                </View>
              )
          })}
        </View>
        <View className={'at-col-6'}>
          {todoPackages && todoPackages.map((todoPackage, index) => {
            if (index % 2 === 1)
              return (<View onClick={() => clickPackage(index)}>
                  <TodoPackage todoPackage={todoPackage}/>
                </View>
              )
          })}

        </View>
      </View>

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
