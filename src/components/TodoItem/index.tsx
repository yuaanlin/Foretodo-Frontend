import Taro, {FC,} from '@tarojs/taro';
import {Text, View} from '@tarojs/components';
import 'taro-ui/dist/style/components/flex.scss';
import {useDispatch} from '@tarojs/redux';
import Checkin from '@/components/Checkin';
import useState = Taro.useState;

interface TodoItemProps {
  id: string,
  type: string,
  group: string,
  done: boolean,
  duration: number
}

const TodoItem: FC<TodoItemProps> = ({id, type, group, done, duration}) => {

  const dispatch = useDispatch();

  const [checkin, handleCheckin] = useState<boolean>(false);

  const clickTodoItem = () => {
    console.log(123);
    handleCheckin(true);
  };

  return (
    <View onClick={clickTodoItem} style={{
      borderBottom: '2PX solid #cfd1f7',
      marginBottom: '12PX'
    }}
    >
      <Text>
        {group}类 - {type}
      </Text>
      <Text style={{float: 'right', opacity: 0.4}}>
        {duration} 分钟
      </Text>
      <Checkin id={id} type={type} group={group} duration={duration}
        disabled={!checkin}
      />
    </View>
  );
};

export default TodoItem;
