import Taro, {FC} from '@tarojs/taro';
import {Picker, View} from "@tarojs/components";
import {useDispatch, useSelector} from "@tarojs/redux";
import {ConnectState} from "@/models/connect";
import {AtIcon, AtList, AtListItem} from 'taro-ui'
import 'taro-ui/dist/style/components/flex.scss';

import useEffect = Taro.useEffect;

interface AddTodoItemProps {
  index: number,
  group: number,
  type: number,
}

const AddTodoItem: FC<AddTodoItemProps> = ({index, group, type}) => {
  const dispatch = useDispatch();
  const {addPackage} = useSelector<ConnectState, ConnectState>((state) => state);
  const {itemTypeGroup} = addPackage;

  const types = itemTypeGroup[group].itemTypes.map<string>((group) => (group.name));

  const groups = itemTypeGroup.map<string>((itemTypeGroup) => (itemTypeGroup.name));


  useEffect(() => {
    dispatch({
      type: 'addPackage/changeItem',
      payload: {
        index,
        group,
        type
      },
    })
  }, []);

  const handleGroupChange = (event) => {
    const ind = event.detail.value;
    dispatch({
      type: 'addPackage/changeItem',
      payload: {
        index,
        group: parseInt(ind),
        type: 0
      },
    })
  };

  const handleTypeChange = (event) => {
    const ind = event.detail.value;
    dispatch({
      type: 'addPackage/changeItem',
      payload: {
        index,
        group,
        type: parseInt(ind)
      },
    })
  };

  const deleteThis = () => {
    dispatch({
      type: 'addPackage/deleteItem',
      payload: {
        index
      },
    })
  };

  return (
    <View>
      <View className={'at-row'}>
        <View className={'at-col-10'}>
          <Picker mode='selector' range={groups} onChange={handleGroupChange}>
            <AtList>
              <AtListItem
                title='类别'
                extraText={itemTypeGroup[group].name}
              />
            </AtList>
          </Picker>
          <Picker mode='selector' range={types} onChange={handleTypeChange}>
            <AtList>
              <AtListItem
                title='计划'
                extraText={types[type]}
              />
            </AtList>
          </Picker>
        </View>
        <View className={'at-col-2'}>
          <AtIcon value='close' size='20' color='#F00' onClick={deleteThis}></AtIcon>
          {/*{index}*/}
          {/*{type}*/}
          {/*{group}*/}
        </View>
      </View>
    </View>
  )

};

export default AddTodoItem;
