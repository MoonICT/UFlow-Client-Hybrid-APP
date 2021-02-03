import { Axios, parseQuery } from '@Services/http';
import { mainAxios, mainAxiosToken } from '../libs/axios';
import AsyncStorage from '@react-native-community/async-storage';

export const getTypeTerm = () => {
  return Axios.request({
    methodType: 'GET',
    url: '/api/v1/terms/types',
    config: {
      headers: {
        contentType: 'application/json',
        'Accept-Language': 'ko-KR',
      },
    },
  });
};

export const getCodeTerm = (code) => {
  console.log('codeddddddddd', code)
  return Axios.request({
    methodType: 'GET',
    url: `/api/v1/terms/code/${code}`,
    config: {
      headers: {
        // contentType: 'application/json',
        'Accept-Language': 'ko-KR',
      },
    },
  });
};