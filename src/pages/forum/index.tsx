import Taro, {FC, useEffect} from '@tarojs/taro';
import {Text, View} from '@tarojs/components';
import {AtFab} from 'taro-ui';
import {useDispatch, useSelector} from '@tarojs/redux';
import {ConnectState} from '@/models/connect';

export const cardColors = [
  {
    primary: 'rgb(65,94,177)',
    subtle: 'rgb(126,157,210)',
    bg: 'rgb(185,210,251)'
  },
  {
    primary: 'rgb(227,182,123)',
    subtle: 'rgb(238,229,164)',
    bg: 'rgb(252,250,217)'
  },
  {
    primary: 'rgb(203,125,140)',
    subtle: 'rgb(222,186,193)',
    bg: 'rgb(255,226,231)'
  },
  {
    primary: 'rgb(120,107,174)',
    subtle: 'rgb(190,177,240)',
    bg: 'rgb(222,213,246)'
  }
];
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

      {posts.map(
        (p, i) => {
          const color = cardColors[Math.round(Math.random() * 10) % 3];
          return <View key={i} style={{
            margin: '8PX 0',
            borderBottom: '1PX solid #aaa',
            padding: '12PX 0'
          }}
          >
            <View style={{display: 'flex'}}>

              <View style={{marginRight: '16PX'}}>
                <View
                  style={{
                    backgroundColor: '#cfd1f7',
                    width: '32PX',
                    height: '31PX',
                    margin: 'auto',
                    borderRadius: '16PX'
                  }}
                />
              </View>
              <View>
                <View style={{fontSize: '12PX', opacity: 0.8}}>
                  {p.user.nickName}
                </View>
                <View
                  style={{fontSize: '16PX', opacity: 1, margin: '6PX 0 4PX 0'}}
                >
                  {p.title}
                </View>
                <View style={{fontSize: '14PX', opacity: 0.6}}>
                  {p.content}
                </View>
              </View>
            </View>
            <View style={{
              marginTop: '12PX',
              backgroundColor: color.bg,
              padding: '8PX 12PX',
              borderRadius: '12PX',
              color: color.primary
            }}
            >
              {p.package.title} 共 {p.package.items.length} 个任务
            </View>
          </View>;
        })}

      <View style={{
        position: 'fixed',
        bottom: '32PX',
        right: '32PX',
      }}
      >
        <AtFab onClick={addPost}>
          <Text className="at-fab__icon at-icon at-icon-edit" />
        </AtFab>
      </View>

    </View>
  );
};

export default Forum;
