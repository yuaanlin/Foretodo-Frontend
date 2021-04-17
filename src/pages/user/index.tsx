import Taro, {FC} from '@tarojs/taro';
import {View} from "@tarojs/components";
import {useSelector} from "@tarojs/redux";
import {ConnectState} from "@/models/connect";

const UserPage: FC = () => {

  const {user} = useSelector<ConnectState, ConnectState>((state) => state);

  const {nickName} = user;
  return (
    <View>
      <View>
        {nickName}
      </View>
    </View>
  )
}


export default UserPage;
