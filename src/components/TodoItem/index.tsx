import Taro, {FC,} from '@tarojs/taro';
import {Text, View} from '@tarojs/components';
import 'taro-ui/dist/style/components/flex.scss';
import {useDispatch} from '@tarojs/redux';
import Checkin from '@/components/Checkin';
import useState = Taro.useState;
import {AtIcon} from "taro-ui";

interface TodoItemProps {
  Id: string,
  type: string,
  group: string,
  done: boolean,
  duration: number,
  color: string,
}

const TodoItem: FC<TodoItemProps> = ({Id, type, group, done, duration,color}) => {

  const dispatch = useDispatch();

  const [checkin, handleCheckin] = useState<boolean>(false);

  const clickTodoItem = () => {
    console.log(Id,type,group,done,duration);
    // Taro.playBackgroundAudio(
    //   {
    //     dataUrl:' https://music.163.com/song/media/outer/url?id=36990266.mp3'
    //   }
    // )
    Taro.navigateTo({
      url: `/pages/detail/checkin?id=${Id}&duration=${duration}&type=${type}`
    })
  };

  return (
    <View onClick={clickTodoItem} style={{
      borderBottom: '2PX solid #cfd1f7',
      marginBottom: '12PX'
    }}
    >
      <AtIcon  value={'star-2'} size='25' color={color}/>
      <Text style={'margin-left:5px'}>
        {group}类 - {type}
      </Text>
      <Text style={{float: 'right', opacity: 0.4}}>
        {duration} 分钟
      </Text>
      {/*<Checkin id={Id} type={type} group={group} duration={duration}*/}
      {/*  disabled={!checkin}*/}
      {/*/>*/}
    </View>
  );
};

export default TodoItem;
