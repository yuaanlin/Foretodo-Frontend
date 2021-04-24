import {View} from '@tarojs/components';
import Taro, {FC, useState} from '@tarojs/taro';
import {useDispatch} from '@tarojs/redux';
import {AtButton, AtInput, AtTextarea} from 'taro-ui';

const AddPost: FC = () => {
  const dispatch = useDispatch();
  const [title, handleTitle] = useState<string>('');
  const [content, handleContent] = useState<string>('');

  const submit = () => {
    dispatch({
      type: 'addPost/submit',
      payload: {title, content}
    });
  };

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
