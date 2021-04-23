import Taro, {FC, useEffect, useRouter} from '@tarojs/taro';
import {Text, View} from '@tarojs/components';
import {useDispatch, useSelector} from '@tarojs/redux';
import {ConnectState, DetailModelState} from '@/models/connect';
import TodoItem from '@/components/TodoItem';

const Detail: FC = () => {
  const dispatch = useDispatch();
  const {id} = useRouter().params;

  useEffect(() => {
    // console.log(params);
    dispatch({
      type: 'detail/fetchPackage',
      payload: {id}
    });
  }, [dispatch, id]);

  const {
    items,
    title,
    beginTime,
    endTime
  } = useSelector<ConnectState, DetailModelState>((state) => state.detail);

  return (
    <View style={{padding: '18PX'}}>
      <View style={{
        fontSize: '24PX',
        borderBottom: '2PX solid #cfd1f7',
        marginBottom: '12PX'
      }}
      >
        {title}
      </View>
      <View style={{
        borderBottom: '2PX solid #cfd1f7',
        marginLeft: '16PX',
        marginBottom: '12PX'
      }}
      >
        <Text>起止时间</Text>
        <Text style={{
          float: 'right',
          opacity: 0.4,
        }}
        >{beginTime.split('T')[0]} ~ {endTime.split('T')[0]}</Text>
      </View>
      <View style={{
        marginLeft: '32PX',
      }}
      >
        {(items && items.map((item) => (
          <TodoItem id={item._id} type={item.type.name}
            group={item.type.group.name} done={item.done}
            duration={item.duration}
          />
        )))}
      </View>

    </View>

  );
};

export default Detail;
