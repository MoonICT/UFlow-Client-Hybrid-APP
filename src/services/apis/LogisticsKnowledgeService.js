import { mainAxios } from '../libs/axios';
import { Axios, parseQuery } from '@Services/http';


export const getNameCate = ( code ) => {
  return Axios.request({
    methodType: 'GET',
    url: `/api/v1/mang/codes/${code}`,
    config: {
      headers: {
        contentType: 'application/json'
      }
    }
  })
};
export const getLogisticsList = async ({ dutyDvCode = '', query = '' }) => {
  let params;
  if (dutyDvCode) {
    params = 'dutyDvCode=' + dutyDvCode + '&query=' + query;
  } else {
    params = '' + 'query=' + query;
  }
  console.log(`/api/v1/lgst?${params}`)
  return await mainAxios.get(`/api/v1/lgst?${params}`, {
    headers: {
      // Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
};
