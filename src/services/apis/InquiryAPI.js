import AsyncStorage from '@react-native-community/async-storage';
import { mainAxios } from '../libs/axios';

export const getAllInquiry = async (params) => {
  const token = await AsyncStorage.getItem('token');

  let url = '/api/v1/warehouse/question/page'
  return await mainAxios.get(`${url}`,
    {
      params: {
        ...params
      },
      headers: {
        Authorization: `Bearer ${token}`,
        contentType: 'application/json'
      }
    });
};