import Taro, {useState, FC} from '@tarojs/taro';
import { TodoItemPackge} from "@/models/home";
import {View} from "@tarojs/components";
import {AtProgress} from "taro-ui";


interface PackageProps {
  todoPackage: TodoItemPackge;

}

const TodoPackage: FC<PackageProps> = ({todoPackage}) => {
  const percent = 45;
  const {title, beginTime , endTime} = todoPackage;

  return (
    <View>
      <View className='at-row'>
        {title}
      </View>
      <View className='at-row'>
        {beginTime}    {endTime}
      </View>
      <View className='at-row'>
        <AtProgress percent={percent} />
      </View>
    </View>
  )
};
export default TodoPackage;
