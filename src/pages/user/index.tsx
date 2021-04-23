import Taro, {FC} from '@tarojs/taro';
import {View} from '@tarojs/components';
import {useSelector} from '@tarojs/redux';
import {ConnectState} from '@/models/connect';

const UserPage: FC = () => {

  const {user} = useSelector<ConnectState, ConnectState>((state) => state);

  const {nickName} = user;
  return (
    <View style={{padding: '18PX'}}>
      <View style={{display: 'flex'}}>
        <View>
          <View
            style={{
              backgroundColor: '#cfd1f7',
              width: '64PX',
              height: '64PX',
              borderRadius: '32PX'
            }}
          />
        </View>
        <View style={{marginLeft: '24PX'}}>
          <View style={{fontSize: '18PX'}}>{nickName}</View>
          <View style={{opacity: 0.6, fontSize: '12PX'}}>已加入 FORETODO 3 天</View>
          <View style={{opacity: 0.6, fontSize: '12PX'}}>已完成 2 个计划</View>
        </View>
      </View>

      <View style={{
        marginTop: '24PX',
        borderBottom: '2PX solid #cfd1f7',
        padding: '16PX',
      }}
      >
        <View style={{display: 'flex'}}>
          <View style={{flex: 1}}>
            <View
              style={{
                backgroundColor: '#cfd1f7',
                width: '28PX',
                height: '28PX',
                margin: 'auto',
                borderRadius: '8PX'
              }}
            />
            <View style={{textAlign: 'center'}}>帖子</View>
          </View>
          <View style={{flex: 1}}>
            <View
              style={{
                backgroundColor: '#cfd1f7',
                width: '28PX',
                height: '28PX',
                margin: 'auto',
                borderRadius: '8PX'
              }}
            />
            <View style={{textAlign: 'center'}}>收藏</View>
          </View>
          <View style={{flex: 1}}>
            <View
              style={{
                backgroundColor: '#cfd1f7',
                width: '28PX',
                height: '28PX',
                margin: 'auto',
                borderRadius: '8PX'
              }}
            />
            <View style={{textAlign: 'center'}}>点赞</View>
          </View>
          <View style={{flex: 1}}>
            <View
              style={{
                backgroundColor: '#cfd1f7',
                width: '28PX',
                height: '28PX',
                margin: 'auto',
                borderRadius: '8PX'
              }}
            />
            <View style={{textAlign: 'center'}}>好友</View>
          </View>
        </View>
      </View>

      <View>
        <View style={{
          display: 'flex',
          borderBottom: '2PX solid #cfd1f7',
          padding: '12PX',
          margin: '12PX'
        }}
        >
          <View
            style={{
              backgroundColor: '#cfd1f7',
              width: '28PX',
              height: '28PX',
              borderRadius: '8PX'
            }}
          />
          <View style={{marginLeft: '8PX'}}>新手帮助</View>
        </View>
        <View style={{
          display: 'flex',
          borderBottom: '2PX solid #cfd1f7',
          padding: '12PX',
          margin: '12PX'
        }}
        >
          <View
            style={{
              backgroundColor: '#cfd1f7',
              width: '28PX',
              height: '28PX',
              borderRadius: '8PX'
            }}
          />
          <View style={{marginLeft: '8PX'}}>分享小程序</View>
        </View>
        <View style={{
          display: 'flex',
          borderBottom: '2PX solid #cfd1f7',
          padding: '12PX',
          margin: '12PX'
        }}
        >
          <View
            style={{
              backgroundColor: '#cfd1f7',
              width: '28PX',
              height: '28PX',
              borderRadius: '8PX'
            }}
          />
          <View style={{marginLeft: '8PX'}}>排行榜</View>
        </View>
        <View style={{
          display: 'flex',
          borderBottom: '2PX solid #cfd1f7',
          padding: '12PX',
          margin: '12PX'
        }}
        >
          <View
            style={{
              backgroundColor: '#cfd1f7',
              width: '28PX',
              height: '28PX',
              borderRadius: '8PX'
            }}
          />
          <View style={{marginLeft: '8PX'}}>设置</View>
        </View>
      </View>
    </View>
  );
};

export default UserPage;
