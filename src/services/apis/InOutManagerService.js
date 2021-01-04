import AsyncStorage from '@react-native-community/async-storage';
import { mainAxios } from '../libs/axios';

export const getAll = async (params) => {
  const token = await AsyncStorage.getItem('token');

  let type = params.type;
  console.log('type', type)
  let url = '/api/v1/mypage/settlement/tenant'
  if(type === 'owner') {
    url = '/api/v1/mypage/settlement/owner'
  }
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
