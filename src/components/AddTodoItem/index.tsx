import Taro, {FC} from '@tarojs/taro';
import {Picker, View} from "@tarojs/components";
import {useDispatch, useSelector} from "@tarojs/redux";
import {ConnectState} from "@/models/connect";
import {AtIcon, AtInput, AtList, AtListItem} from 'taro-ui'
import 'taro-ui/dist/style/components/flex.scss';

import useEffect = Taro.useEffect;

interface AddTodoItemProps {
  duration: number,
  index: number,
  group: number,
  type: number,
}

const AddTodoItem: FC<AddTodoItemProps> = ({index, group, type, duration}) => {
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
        duration,
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
        duration,
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

  const handleDurationChange = (value) => {
    dispatch({
      type: 'addPackage/changeItem',
      payload: {
        duration: parseInt(value),
        type,
        index,
        group
      },
    })
  };

  return (
    <View>
      <View className={'at-row'}>
        <View className={'at-col-10'}>
          <View className={`at-row`}>
            <Picker className={'at-col-5'} mode='selector' range={groups} onChange={handleGroupChange}>
              <AtList>
                <AtListItem
                  title='类别'
                  extraText={itemTypeGroup[group].name}
                />
              </AtList>
            </Picker>
            <Picker className={'at-col-5'} mode='selector' range={types} onChange={handleTypeChange}>
              <AtList>
                <AtListItem
                  title='计划'
                  extraText={types[type]}
                />
              </AtList>
            </Picker>
          </View>

        </View>
        <View className={'at-col-2'}>
          <AtIcon value='close' size='30' color='#F00' onClick={deleteThis}></AtIcon>
        </View>
      </View>
      <View>
        <AtInput name={'duration'} onChange={handleDurationChange.bind(this)} value={duration} title={'时长'}
                 placeholder={'请输入时长'}/>
      </View>
    </View>
  )

};

export default AddTodoItem;
