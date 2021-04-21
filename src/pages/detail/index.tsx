import Taro, {
  FC,
  useEffect, useRouter
} from '@tarojs/taro';
import {View} from "@tarojs/components";
import {useDispatch, useSelector} from "@tarojs/redux";
import {ConnectState, DetailModelState, HomeModelState} from "@/models/connect";
import TodoItem from "@/components/TodoItem";


const Detail: FC = () => {
  const dispatch = useDispatch();
  const {id} = useRouter().params;

  useEffect(() => {
    // console.log(params);
    dispatch({
      type: 'detail/fetchPackage',
      payload: {id}
    })
  }, []);

  const {items, title, beginTime, endTime} = useSelector<ConnectState, DetailModelState>((state) => state.detail);


  return (
    <View>
      <View>
        {title}
      </View>
      <View>
        开始时间 {beginTime}
      </View>
      <View>
        结束时间 {endTime}
      </View>
      <View>
        {(items && items.map((item) => (
          <TodoItem id={item._id} type={item.type.name} group={item.type.group.name} done={item.done} duration={item.duration}/>

        )))}
      </View>

    </View>

  );
};

export default Detail;
