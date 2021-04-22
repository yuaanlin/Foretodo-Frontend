import Taro, {FC} from '@tarojs/taro';
import {TodoItemPackge} from '@/models/home';
import {View} from '@tarojs/components';
import {AtProgress} from 'taro-ui';
import 'taro-ui/dist/style/components/flex.scss';
import './todoCard.less';

interface PackageProps {
  todoPackage: TodoItemPackge;
}

const colors = [
  {
    primary: 'rgb(65,94,177)',
    subtle: 'rgb(126,157,210)',
    bg: 'rgb(185,210,251)'
  },
  {
    primary: 'rgb(227,182,123)',
    subtle: 'rgb(238,229,164)',
    bg: 'rgb(252,250,217)'
  },
  {
    primary: 'rgb(203,125,140)',
    subtle: 'rgb(222,186,193)',
    bg: 'rgb(255,226,231)'
  },
  {
    primary: 'rgb(120,107,174)',
    subtle: 'rgb(190,177,240)',
    bg: 'rgb(222,213,246)'
  }
];

const TodoPackage: FC<PackageProps> = ({todoPackage}) => {

  const {title, beginTime: beT, endTime: enT, items} = todoPackage;
  const beginTime = new Date(beT).toLocaleDateString();
  const endTime = new Date(enT).toLocaleDateString();
  const percent = Math.round(
    items.filter((item) => (item.done)).reduce((tol) => (tol + 1), 0) /
    items.length * 100);
  const color = colors[Math.round(Math.random() * 10) % 3];

  return (
    <View className={'todo-card'}>
      <View className={'inner'} style={{
        position: 'relative',
        backgroundColor: color.bg,
        height: (new Date(enT).getTime() - new Date(beT).getTime()) /
          1500000 + 'PX'
      }}
      >
        <View
          style={{color: color.subtle, fontSize: '12PX', textAlign: 'center',}}
        >
          {beginTime.split('/')[0]}.{beginTime.split('/')[1]} ~ {endTime.split(
          '/')[0]}.{endTime.split('/')[1]}
        </View>
        <View style={{color: color.primary, textAlign: 'center'}}>
          {title}
        </View>
        <View className="progress-wrapper">
          <AtProgress percent={percent}
            color={color.primary} isHidePercent
          />
        </View>
      </View>

    </View>
  );
};
export default TodoPackage;
