import request, {getJWT} from '@/utils/request';

export const fetchTodoPackages = async () => {
  return request.get('/todo-package', {
    header: {
      Authorization: getJWT(),
    },
  })
};
