import Taro, {FC, useEffect} from '@tarojs/taro';
import {View} from '@tarojs/components';
import {AtButton} from 'taro-ui';
import {useDispatch, useSelector} from '@tarojs/redux';
import {ConnectState} from '@/models/connect';

const Forum: FC = () => {
  const dispatch = useDispatch();
  const {forum} = useSelector<ConnectState, ConnectState>(
    (state) => state);
  const {posts} = forum;

  const addPost = () => {
    Taro.navigateTo({
      url: `/pages/forum/addPost`,
    });
  };

  useEffect(() => {
    dispatch({
      type: 'forum/fetchPosts',
    });
  }, [dispatch]);

  return (
    <View style={{padding: '18PX'}}>
      社区
      {posts.map(p => <View>{p.title}</View>)}
      <AtButton onClick={addPost}>+</AtButton>
    </View>
  );
};

export default Forum;
