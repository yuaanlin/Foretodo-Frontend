import Taro, {FC, useEffect} from '@tarojs/taro';
import {Text, View} from '@tarojs/components';
import {AtFab} from 'taro-ui';
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

      {posts.map(p => <View>{p.title}</View>)}

      <View style={{position: 'fixed', bottom: '32PX', right: '32PX'}}>
        <AtFab onClick={addPost}>
          <Text className="at-fab__icon at-icon at-icon-edit" />
        </AtFab>
      </View>

    </View>
  );
};

export default Forum;
