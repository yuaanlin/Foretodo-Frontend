import Taro, {
  FC,
  useEffect,
} from '@tarojs/taro';
import {View} from "@tarojs/components";

interface CheckinProps {
  id: string,
  type: string,
  group: string,
  duration: number,
  disabled: boolean
}

const Checkin: FC<CheckinProps> = ({id, type, group, duration, disabled}) => {

  return (
    <View>
      <AtCountdown
        format={{hours: ':', minutes: ':', seconds: ''}}
        seconds={duration * 60}
        // onTimeUp={}
      />
      {disabled ? '' : (
        <AtCountdown
          format={{hours: ':', minutes: ':', seconds: ''}}
          seconds={duration * 60}
          // onTimeUp={}
        />)
      }
    </View>
  )
};

export default Checkin;
