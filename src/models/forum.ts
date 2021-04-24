import {TodoItemPackge} from '@/models/home';
import {DvaModel} from '@/models/connect';
import {fetchPosts} from '@/services/post';

export interface ForumModelState {
  posts: Post[]
}

interface Post {
  title: string
  content: string
  createAt: string
  package: TodoItemPackge
}

const forum: DvaModel<ForumModelState> = {
  namespace: 'forum',
  state: {
    posts: []
  },
  reducers: {
    save(state, {payload}) {
      return {...state, ...payload};
    },
  },
  effects: {
    * fetchPosts(_, {call, put, select}) {
      const {_id} = yield select((state) => state.user);
      if (_id) {
        const {code, data} = yield call(fetchPosts);
        if (code === 0 && data) {
          const {posts} = data;
          yield put({
            type: 'save',
            payload: {posts},
          });
        }
      }
    },
  },
  subscriptions: {},
};

export default forum;
