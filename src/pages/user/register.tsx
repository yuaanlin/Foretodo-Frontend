import Taro, {FC, useState,} from '@tarojs/taro'
import { Picker, View} from "@tarojs/components";
import {AtButton, AtInput, AtList, AtListItem} from "taro-ui";
import {useDispatch} from "@tarojs/redux";
import styles from './register.module.less';


interface Region {
  province: string,
  city: string,
  cities: [],
}

const Register: FC = () => {

  const dispatch = useDispatch();

  const tDate = new Date().toLocaleDateString().split('/').join('-');

  const [nickName, handleNickName] = useState<string>('');
  const [gender, handleGender] = useState<string>('男');
  // const country= useState<string>('');
  const [email, handleMail] = useState<string>('');

  const ProMap = {
    "北京": {index: 0, cities: ["北京"]},
    "浙江": {index: 1, cities: ["杭州", "温州"]},
    "江苏": {index: 2, cities: ["南京", "苏州"]},
  }

  const genderSelector = ["男", "女"];

  const [region, handleRegion] = useState<Region>({province: "浙江", city: "杭州", cities: []});
  const [birth, handleBirth] = useState<string>(tDate);

  const checkSubmit = !(nickName && email);

  const handleNickNameChange = (value) => {
    handleNickName(value);
  };

  const handleBirthChange = (event) => {
    handleBirth(event.detail.value);
  };

  const handleProviceChange = (event) => {
    const province = Object.getOwnPropertyNames(ProMap)[event.detail.value];
    handleRegion({province, cities: ProMap[province].cities, city: ProMap[province].cities[0]});
  };

  const handleCityChange = (event) => {
    const {province, cities} = region;
    const city = cities[event.detail.value];
    handleRegion({province, cities, city})
  };

  const handleGenderChange = (event) => {
    handleGender(genderSelector[event.detail.value]);
  };

  const handleMailChange = (value) => {
    handleMail(value);
  };

  const submit = async () => {
    const {province, city} = region;

    dispatch({
      type: 'user/register',
      payload: {nickName, province, city, email, gender, birth},
    });
  };

  return (
    <View className={styles.container}>
      <View>
        <AtInput name={'nickName'} onChange={handleNickNameChange.bind(this)} value={nickName} title={'昵称'}
                 placeholder={'请输入您的昵称'}/>
      </View>
      <View>
        <AtInput name={'mail'} onChange={handleMailChange.bind(this)} value={email} title={'昵称'}
                 placeholder={'请输入您的邮箱'}/>
      </View>
      <View>
        <Picker mode='selector' range={genderSelector} onChange={handleGenderChange}>
          <AtList>
            <AtListItem
              title='性别'
              extraText={gender}
            />
          </AtList>
        </Picker>
      </View>
      <View>
        <Picker mode='selector' range={Object.getOwnPropertyNames(ProMap)} onChange={handleProviceChange}>
          <AtList>
            <AtListItem
              title='省'
              extraText={region.province}
            />
          </AtList>
        </Picker>
        <Picker mode='selector' range={region.cities} onChange={handleCityChange}>
          <AtList>
            <AtListItem
              title='市'
              extraText={region.city}
            />
          </AtList>
        </Picker>
      </View>
      <View>
        <Picker mode={'date'} onChange={handleBirthChange}>
          <AtList>
            <AtListItem title={'请选择您的生日'} extraText={birth}/>
          </AtList>
        </Picker>
      </View>
      <AtButton
        type={'primary'}
        className={styles.button}
        disabled={checkSubmit}
        circle
        size={'normal'}
        onClick={submit}
      >
        提交
      </AtButton>
    </View>
  )
};

export default Register;
