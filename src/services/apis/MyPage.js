import AsyncStorage from '@react-native-community/async-storage';
import { mainAxios } from '../libs/axios';

//Contants
import { TOKEN } from '@Constant';

export const cancelMembership = async data => {
  console.log('formData :>> ', data);
  const token = await AsyncStorage.getItem(TOKEN);
  let defaultParams = {
    password: data.password,
    leaveReason: data.leaveReason,
  };
  return await mainAxios.post('/api/v1/me/leave', defaultParams, {
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
};

export const getUserInfo = async params => {
  const token = await AsyncStorage.getItem(TOKEN);
  let url = '/api/v1/me';
  return await mainAxios.get(`${url}`, {
    params: {
      ...params,
    },
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
};

//select Detail Code
export const getDetailCodes = async params => {
  const token = await AsyncStorage.getItem(TOKEN);
console.log('params :>> ', params);
  let url = `/api/v1/mang/codes/${params}`;
  return await mainAxios.get(`${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
      "accept-language" : 'ko-kr' // TODO 창고에 Accept-Language 가 아닌 의존 해야함
    },
  });
};


//select Detail Code
export const getDetailCodeName = async (code, detail) => {

  let url = `/api/v1/mang/${code}/d/${detail}`;
  return await mainAxios.get(`${url}`, {
    headers: {
      contentType: 'application/json',
      "accept-language" : 'ko-kr' // TODO 창고에 Accept-Language 가 아닌 의존 해야함
    },
  });
};
