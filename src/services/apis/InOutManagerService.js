import AsyncStorage from '@react-native-community/async-storage';
import { mainAxios } from '../libs/axios';

export const getAll = async (params) => {
  const token = await AsyncStorage.getItem('token');

  let type = params.type;
  let url = '/api/v1/rtwh/warehouse-rented/tenant'
  if(type === 'owner') {
    url = '/api/v1/rtwh/warehouse-rented/owner'
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


export const getDetail = async (params) => {
  const token = await AsyncStorage.getItem('token');
  console.log('pramssssssss', params )
  let type = params.type;
  let url = `/api/v1/rtwh/transaction/tenant/${params.id}`
  if(type === 'owner') {
    url = `/api/v1/rtwh/transaction/owner/${params.id}`
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
