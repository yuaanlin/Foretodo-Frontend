import Taro, {FC, useEffect, useRouter} from '@tarojs/taro';
import {View, Image, Text} from "@tarojs/components";
import './checkin.scss'
import {AtCountdown, AtAvatar} from 'taro-ui'
import 'taro-ui/dist/style/components/flex.scss';


const Checkin: FC = () => {

  const {id, duration: durationStr, type} = useRouter().params;
  const duration = parseInt(durationStr);

  const onTimeUp = () => {
    Taro.showToast({
      title: "123"
    })
  };

  return (
    <View className='play'>
      {/*<Image src={"https://ftp.bmp.ovh/imgs/2021/04/e9eb31c8514cb965.jpg"}/>*/}
      <View className=' at-row at-row at-row__justify--center'>
        <View className='text at-col-8'>
          <View>
            <Text>
              “ 每个人身上都有太阳，主要是如何让它发光。
            </Text>
          </View>
        </View>
      </View>
      <View className='type at-row at-row at-row__justify--center'>
        <View className='at-col' style={'text-align:center;justify-content: center;'}>
          <Text>
            {type}
          </Text>
        </View>
      </View>
      <View className='countdown at-row at-row at-row__justify--center'>

        <AtCountdown
          className='at-col'
          format={{hours: ':', minutes: ':', seconds: ''}}
          seconds={60 * duration}
          onTimeUp={onTimeUp}
        />

      </View>
    </View>
  );
};


export default Checkin;
