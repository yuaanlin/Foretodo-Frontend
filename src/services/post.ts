import request, {getJWT} from '@/utils/request';

export const fetchPosts = async () => {
  return request.get('/post', {
    header: {
      Authorization: getJWT(),
    },
  });
};

export const submitPost = async (data) => {
  return request.post(`/add/post`, {
    data,
    header: {
      Authorization: getJWT(),
    },
  });
};
