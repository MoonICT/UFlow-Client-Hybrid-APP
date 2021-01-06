import AsyncStorage from '@react-native-community/async-storage';
import { mainAxios } from '../libs/axios';

export const cancelMembership = async data => {
  console.log('formData :>> ', data);
  const token = await AsyncStorage.getItem('token');
  let defaultParams = {
    password: data.password,
    leaveReason: data.leaveReason,
  }
  return await mainAxios.post('/api/v1/me/leave', defaultParams, {
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
};

export const getUserInfo = async params => {
  const token = await AsyncStorage.getItem('token');
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

