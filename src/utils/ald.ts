import qq from './ald-stat-qq';
import weapp from './ald-stat';

export default process.env.TARO_ENV === 'weapp' ? weapp : qq;
