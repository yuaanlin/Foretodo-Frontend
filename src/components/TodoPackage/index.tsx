import Taro, {useState, FC} from '@tarojs/taro';
import {TodoItemPackge} from "@/models/home";
import {View} from "@tarojs/components";
import {AtProgress} from "taro-ui";
import 'taro-ui/dist/style/components/flex.scss';

interface PackageProps {
  todoPackage: TodoItemPackge;

}

const TodoPackage: FC<PackageProps> = ({todoPackage}) => {

  const {title, beginTime: beT, endTime: enT, items} = todoPackage;
  const beginTime = new Date(beT).toLocaleDateString();
  const endTime = new Date(enT).toLocaleDateString();
  const percent = Math.round(items.filter((item) => (item.done)).reduce((tol) => (tol + 1), 0) / items.length * 100);

  return (
    <View className={'at-row'}>
      <View className={'at-col'}>

        <View className='at-row'>
          {title}
        </View>
        <View className='at-row'>
          {beginTime} {endTime}
        </View>
        <View>
          <AtProgress percent={percent} />
        </View>
      </View>

    </View>
  )
};
export default TodoPackage;
