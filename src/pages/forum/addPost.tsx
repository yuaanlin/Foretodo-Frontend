import {Picker, View} from '@tarojs/components';
import Taro, {FC, useState} from '@tarojs/taro';
import {useDispatch, useSelector} from '@tarojs/redux';
import {AtButton, AtInput, AtList, AtListItem, AtTextarea} from 'taro-ui';
import {ConnectState} from '@/models/connect';
import {TodoItemPackge} from '@/models/home';
import useEffect = Taro.useEffect;

const AddPost: FC = () => {
  const dispatch = useDispatch();
  const todoPackages = useSelector<ConnectState, TodoItemPackge[]>(
    s => s.addPost.todoPackages);
  const [title, handleTitle] = useState<string>('');
  const [content, handleContent] = useState<string>('');
  const [packageIndex, handlePackageIndex] = useState(0);

  const group = todoPackages.map(p => p.title);

  useEffect(() => {
    dispatch({type: 'addPost/fetchPackages'});
  }, [dispatch]);

  const submit = () => {
    dispatch({
      type: 'addPost/submit',
      payload: {title, content, packageId: todoPackages[packageIndex]}
    });
  };

  console.log(packageIndex);

  return (
    <View>
      <View>
        <AtInput name={'title'} onChange={handleTitle.bind(this)}
          value={title} title={'标题'}
        />
      </View>
      <View>
        <AtTextarea value={content} onChange={handleContent} />
      </View>
      <Picker mode="selector" range={group}
        onChange={a => handlePackageIndex(a.detail.value)}
      >
        <AtList>
          <AtListItem
            title="分享计划"
            extraText={todoPackages[packageIndex]
              ? todoPackages[packageIndex].title
              : ''}
          />
        </AtList>
      </Picker>
      <AtButton
        type={'primary'}
        size={'normal'}
        onClick={submit}
      >
        完成
      </AtButton>
    </View>
  );
};

export default AddPost;
