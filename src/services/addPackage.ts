import request, { getJWT } from '../utils/request';

export const fetchItemTypeGroup = async () => {
  return request.get(`/item-type-group`, {
    header: {
      Authorization: getJWT(),
    },
  });
};
