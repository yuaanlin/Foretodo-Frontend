import Taro, {
  FC,
  useEffect,
} from '@tarojs/taro';
import {View} from "@tarojs/components";
import 'taro-ui/dist/style/components/flex.scss';
import {useDispatch} from "@tarojs/redux";
import useState = Taro.useState;
import Checkin from "@/components/Checkin";


interface TodoItemProps {
  id: string,
  type: string,
  group: string,
  done: boolean,
  duration: number
}

const TodoItem: FC<TodoItemProps> = ({id, type, group, done, duration}) => {

  const dispatch = useDispatch();

  const [checkin,handleCheckin] = useState<boolean>(false);

  const clickTodoItem = ()=>{
    console.log(123)
    handleCheckin(true);
  };

  return (
    <View onClick={clickTodoItem}>
      <View className={'at-row'}>
        <View className={'at-col'}>

      </View>
        <View className={'at-col'}>
          {group}{type}
        </View>
        <View className={'at-col'}>
          {duration}分钟
        </View>
      </View>
      <Checkin id={id} type={type} group={group} duration={duration} disabled={!checkin}/>
    </View>
  )
};

export default TodoItem;
