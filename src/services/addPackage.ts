import request, { getJWT } from '../utils/request';

export const fetchItemTypeGroup = async () => {
  return request.get(`/item-type-group`, {
    header: {
      Authorization: getJWT(),
    },
  });
};

export const submitTodoPackage = async (data)=>{
  return request.post(`/add/todo-package`, {
    data,
    header: {
      Authorization: getJWT(),
    },
  });
};
