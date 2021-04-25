import Taro, {FC} from '@tarojs/taro';
import {Picker, Text, View} from "@tarojs/components";
import {useDispatch, useSelector} from "@tarojs/redux";
import {ConnectState} from "@/models/connect";
import {AtIcon, AtInput, AtList, AtListItem} from 'taro-ui'
import 'taro-ui/dist/style/components/flex.scss';
import './index.scss'

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

  const colors = ['\#FFFF99',"\#CCFFFF",'\#99CCCC','\#FFCCCC','\#996699','\#CC9966'];

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
        <View className={'at-col-1'}></View>
        <View className={'at-col-1 icon'}>
          <AtIcon  value={'star-2'} size='25' color={colors[index%6]}/>
        </View>

        <View className={'at-col-8 content'}>
          <View className={`at-row`}>
            <Picker className={'at-col-4'} mode='selector' range={groups} onChange={handleGroupChange}>
              <AtList>
                <AtListItem
                  title=''
                  extraText={itemTypeGroup[group].name}
                />
              </AtList>
            </Picker>
            <Picker className={'at-col-4'} mode='selector' range={types} onChange={handleTypeChange}>
              <AtList>
                <AtListItem
                  title=''
                  extraText={types[type]}
                />
              </AtList>
            </Picker>
            <View className={'at-col-4'}>
              <AtInput name={'duration'} onChange={handleDurationChange.bind(this)} value={duration} title={''}
                       placeholder={'时长'}>
                分钟
              </AtInput>

            </View>
          </View>
        </View>
        <View className={'at-col-1 iconD'} onClick={deleteThis}>
          <AtIcon  value='trash' size='25' color='#DDDDDD' ></AtIcon>
        </View>

      </View>

    </View>
  )

};

export default AddTodoItem;
