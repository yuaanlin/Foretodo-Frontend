import Taro, {FC, useState,} from '@tarojs/taro'
import {Button, Picker, View} from "@tarojs/components";
import {AtButton, AtInput, AtList, AtListItem} from "taro-ui";
import styles from "@/pages/user/register.module.less";
import {UserModelState} from "@/models/user";
import {ItemType} from "@/models/home";

interface ThisTodoItem {
  duration: number,
  type: ItemType,
}

const AddTodoPackage: FC = () => {

  const today = new Date().toLocaleDateString().split('/').join('-');
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toLocaleDateString().split('/').join('-');

  const [title, handleTitle] = useState<string>('');
  const [beginTime, handleBeginTime] = useState<string>(today);
  const [endTime, handleEndTime] = useState<string>(tomorrowStr);

  const [items, handleItems] = useState<ThisTodoItem[]>([]);

  const handleTitleChange = (value) => {
    handleTitle(value);
  };

  const handleBeginChange = (event) => {
    handleBeginTime(event.detail.value);
  };
  const handleEndChange = (event) => {
    const et = event.detail.value;
    const larger = (new Date(et.replace('-', '/')) > new Date(beginTime.replace('-', '/')));
    if (larger) {
      handleEndTime(et);
    } else {
      Taro.showToast({
        title: '计划应当至少持续一天',
        icon: 'none'
      })
    }
  };

  const addTodoItem = () => {
    const newItem: ThisTodoItem = {duration: ''};
    handleItems([...items, newItem]);
    console.log(items);
  }

  return (
    <View>
      <View>
        <AtInput name={'title'} onChange={handleTitleChange.bind(this)} value={title} title={'请输入计划的标题'}/>
      </View>
      <View>
        <Picker mode={'date'} onChange={handleBeginChange}>
          <AtList>
            <AtListItem title={'请选择计划的开始时间'} extraText={beginTime}/>
          </AtList>
        </Picker>
        <Picker mode={'date'} onChange={handleEndChange}>
          <AtList>
            <AtListItem title={'请选择计划的结束时间'} extraText={endTime}/>
          </AtList>
        </Picker>
      </View>
      <AtButton
        type={'primary'}
        size={'normal'}
        onClick={addTodoItem}
      >
        增加计划条目
      </AtButton>
    </View>
  );
};

export default AddTodoPackage;
