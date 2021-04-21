import Taro, {FC, useState, useEffect,} from '@tarojs/taro'
import {Button, Picker, View} from "@tarojs/components";
import {useDispatch, useSelector} from '@tarojs/redux';
import {AtButton, AtInput, AtList, AtListItem} from "taro-ui";
import styles from "@/pages/user/register.module.less";
import {UserModelState} from "@/models/user";
import {ItemType} from "@/models/home";
import {ConnectState} from "@/models/connect";
import AddTodoItem from "@/components";
import {IAddPackgeItem} from "@/models/addPackage";

interface ThisTodoItem {
  duration: number,
  type: ItemType,
}


const AddTodoPackage: FC = () => {
  const dispatch = useDispatch();
  const {addPackage} = useSelector<ConnectState, ConnectState>((state) => state);
  const {itemTypeGroup, items} = addPackage;

  const today = new Date().toLocaleDateString().split('/').join('-');
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toLocaleDateString().split('/').join('-');

  const [title, handleTitle] = useState<string>('');
  const [beginTime, handleBeginTime] = useState<string>(today);
  const [endTime, handleEndTime] = useState<string>(tomorrowStr);

  let checkDuration = true;
  for (let i = 0; i < items.length; i++) {
    const {duration} = items[i];
    checkDuration = checkDuration && duration > 0;
  }
  const checkSubmit = !(title && items.length > 0 && checkDuration);

  useEffect(() => {
    dispatch({type: 'addPackage/fetchItemTypeGroup'});
  }, []);

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
    const index = items.length;
    dispatch({
      type: 'addPackage/addItem', payload: {
        index
      }
    });
  };

  const submit = () => {
    dispatch({
      type: 'addPackage/submit',
      payload: {beginTime, endTime, title}
    })
  };

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
      <View>
        {items && items.map((item, index) => (
            <AddTodoItem index={index} type={item.type} group={item.group} duration={item.duration}/>
          )
        )}
      </View>
      <AtButton
        type={'primary'}
        size={'normal'}
        onClick={addTodoItem}
      >
        增加计划条目
      </AtButton>
      <AtButton
        type={'primary'}
        size={'normal'}
        onClick={submit}
        disabled={checkSubmit}
      >
        完成
      </AtButton>
    </View>
  );
};

export default AddTodoPackage;
