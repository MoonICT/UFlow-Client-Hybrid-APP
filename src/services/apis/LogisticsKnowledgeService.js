import { mainAxios } from '../libs/axios';

export const getLogisticsList = async ({ dutyDvCode = "", query = "" }) => {
  let params;
  if (dutyDvCode) {
    params = 'dutyDvCode=' + dutyDvCode + '&query=' + query
  } else {
    params = '' + 'query=' + query
  }
  return await mainAxios.get(`/api/v1/lgst?${params}`, {
    headers: {
      // Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
};
