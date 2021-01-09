import AsyncStorage from '@react-native-community/async-storage';
import { mainAxios } from '../libs/axios';
import {TOKEN} from '@Constant'
export const getAll = async (params) => {
  const token = await AsyncStorage.getItem(TOKEN);

  let type = params.type;
  let url = '/api/v1/rtwh/warehouse-rented/tenant';
  if (type === 'OWNER') {
    url = '/api/v1/rtwh/warehouse-rented/owner';
  }
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


export const getDetail = async (params) => {
  console.log('params', params)
  // {"contractType": 2100, "endDate": 2021-01-09T11:28:53.322Z, "id": "RT20210108295", "query": "", "rangeDate": "", "startDate": 2021-01-09T11:28:53.322Z, "type": "OWNER"}
  const token = await AsyncStorage.getItem(TOKEN);
  let type = params.type;
  let url = `/api/v1/rtwh/transaction/tenant/${params.id}`;
  if (type === 'owner') {
    url = `/api/v1/rtwh/transaction/owner/${params.id}`;
  }
  console.log('url', url)
  console.log('token', token)
  return await mainAxios.get(`${url}`, {
    params: {
      rentWarehNo:params.id,
      userType:params.type,
      page:params.page,
      size:params.size,
    },
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
};

export const createImport = async (body) => {
  const token = await AsyncStorage.getItem(TOKEN);
  let { typeCreate, type } = body;
  let strType = 'whin';
  if (typeCreate === 'export') {
    strType = 'whout';
  }
  let url = `/api/v1/rtwh/${strType}/tenant`;

  if (type === 'owner') {
    url = `/api/v1/rtwh/whin/owner`;
  }
  return await mainAxios.post(`${url}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
};
export const cancelImport = async (body) => {

  let typeCancel = 'whout'
  if(body.isTypeCancel === 'IMPORT') {
    typeCancel = 'whin'
  }
  const token = await AsyncStorage.getItem(TOKEN);
  let url = `/api/v1/rtwh/RT2020121419/${typeCancel}/cancel/${body.Expct}-${body.ExpctSeq}`;

  return await mainAxios.post(`${url}`, {},
  {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    }
  });
};



