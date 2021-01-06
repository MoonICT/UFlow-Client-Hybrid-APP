import AsyncStorage from '@react-native-community/async-storage';
import { mainAxios } from '../libs/axios';
import {TOKEN} from '@Constant'
export const getAll = async (params) => {
  const token = await AsyncStorage.getItem(TOKEN);
  let type = params.type;
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


export const getDetail = async (params) => {
  const token = await AsyncStorage.getItem(TOKEN);
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

export const createImport = async (body) => {
  const token = await AsyncStorage.getItem(TOKEN);
  let type = body.type;
  let url = `/api/v1/rtwh/whin/tenant`
  if(type === 'owner') {
    url = `/api/v1/rtwh/whin/owner`
  }
  return await mainAxios.post(`${url}`, body,
  {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    }
  });
};