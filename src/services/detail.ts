import request, {getJWT} from '@/utils/request';

export const fetchPackage = async (id) => {
  return request.get(`/todo-package/${id}`, {
    header: {
      Authorization: getJWT(),
    },
  })
};
