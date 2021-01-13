import { Axios, parseQuery } from '@Services/http';
import { mainAxios, mainAxiosToken } from '../libs/axios';
import AsyncStorage from '@react-native-community/async-storage';


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
export const getFAQList = async ({ dutyDvCode = "", query = "" }) => {
  let params;
  if (dutyDvCode) {
    params = { dutyDvCode, query };
  } else {
    params = { query }
  }

  console.log('params', params)

  return await mainAxios.get(`/api/v1/faqs`, {
    params: {
      ...params,
    },
    headers: {
      // Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
};
