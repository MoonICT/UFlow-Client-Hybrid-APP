import AsyncStorage from '@react-native-community/async-storage';
import {mainAxios, mainMediaAxios} from '../libs/axios';
import axios, {AxiosResponse} from "axios";
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
  const token = await AsyncStorage.getItem(TOKEN);
  let type = params.type;
  let url = '';
  if (type === 'OWNER') {
    url = `/api/v1/rtwh/transaction/owner/${params.id}`;
  } else if (type === 'TENANT') {
    url = `/api/v1/rtwh/transaction/tenant/${params.id}`;
  }
  return await mainAxios.get(`${url}`, {
    params: {
      rentWarehNo: params.id,
      userType: params.type,
      page: params.page,
      size: params.size,
    },
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
};

export const createImport = async (body) => {
  const token = await AsyncStorage.getItem(TOKEN);
  let {typeCreate, type} = body;
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
  if (body.isTypeCancel === 'IMPORT') {
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


/**
 * 창고주 입고 확정
 *
 * @param rentWarehNo 공유창고 ID
 * @param whinExpct 출고예정일자
 * @param whinDecisQty : 입고확정량
 * @param whinDecis : 입고확정일자
 * @param expctSeq : 수탁 계약 SEQ
 * @param reason : 이유
 * @param filename : 송장파일 명
 * @returns {Promise<Promise<unknown> | Promise<unknown>>}
 */
export const postImportOwner = async ({
                                        rentWarehNo = "",
                                        whinExpct = "",
                                        whinDecisQty = "",
                                        whinDecis = "",
                                        expctSeq = "",
                                        reason = "",
                                        filename = "",
                                      }) => {
  const token = await AsyncStorage.getItem(TOKEN);
  return mainAxios.post(
    `/api/v1/rtwh/whin/owner`,
    {
      rentWarehNo: rentWarehNo,
      whinExpct: whinExpct,
      whinDecisQty: whinDecisQty,
      whinDecis: whinDecis,
      whinExpctSeq: expctSeq,
      reason: reason,
      filename: filename,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        contentType: "application/json",
      },
    },
  );
};

/**
 * 임차인 입고 하기
 *
 * @param rentWarehNo : 공유창고 ID
 * @param whinExpct : 입고예정일
 * @param whinExpctQty : 입고예정량
 */
export const postImportTenant = async ({
                                         rentWarehNo = "",
                                         whinExpct = "",
                                         whinExpctQty = "",
                                       }) => {
  const token = await AsyncStorage.getItem(TOKEN);
  return mainAxios.post(
    `/api/v1/rtwh/whin/tenant`,
    {
      rentWarehNo: rentWarehNo,
      whinExpct: whinExpct,
      whinExpctQty: whinExpctQty
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        contentType: "application/json",
      },
    }
  );
};

/**
 * 창고주 출고 확정
 *
 * @param rentWarehNo 공유창고 ID
 * @param whoutExpct : 출고예정일자(YYYYMMDD)
 * @param decisQty : 출고확정수량
 * @param decis : 출고확정일자(YYYYMMDD)
 * @param reason : 이유
 * @param filename : 송장파일명
 * @param whoutExpctSeq : 수탁계약 SEQ
 * @returns {Promise<Promise<unknown> | Promise<unknown>>}
 */
export const postExportOwner = async ({
                                        rentWarehNo = "",
                                        whoutExpct = "",
                                        decisQty = "",
                                        decis = "",
                                        reason = "",
                                        whoutExpctSeq = "",
                                        filename = "",
                                      }) => {
  const token = await AsyncStorage.getItem(TOKEN);
  return mainAxios.post(
    `/api/v1/rtwh/whout/owner`,
    {
      rentWarehNo: rentWarehNo,
      whoutExpct: whoutExpct,
      decisQty: decisQty,
      decis: decis,
      reason: reason,
      whoutExpctSeq: whoutExpctSeq,
      filename: filename,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        contentType: "application/json",
      },
    }
  );
};

/**
 * 임차인 출고하기
 *
 * @param rentWarehNo : 공유창고 ID
 * @param whoutExpct : 출고예정일자(YYYYMMDD)
 * @param expctQty : 출고예정수량
 * @param decis : 출고확정일자(YYYYMMDD)
 * @returns {Promise<Promise<unknown> | Promise<unknown>>}
 */
export const postExportTenant = async ({
                                         rentWarehNo = "",
                                         whoutExpct = "",
                                         expctQty = "",
                                         decis = "",
                                       }) => {
  const token = await AsyncStorage.getItem(TOKEN);
  return mainAxios.post(
    `/api/v1/rtwh/whout/tenant`,
    {
      rentWarehNo: rentWarehNo,
      whoutExpct: whoutExpct,
      expctQty: expctQty,
      // decis: decis,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        contentType: "application/json",
      },
    }
  );
};

/**
 * 임고 취소
 *
 * @param rentWarehNo 공유창고 ID
 * @param whinExpct : 입고예정일자(YYYYMMDD)
 * @param whinExpctSeq : 출고 SEQ
 * @returns {Promise<Promise<unknown> | Promise<unknown>>}
 */
export const postCancelImport = async ({
                                         rentWarehNo = "",
                                         whinExpct = "",
                                         whinExpctSeq = "",
                                       }) => {
  const token = await AsyncStorage.getItem(TOKEN);

  return mainAxios.post(
    `/api/v1/rtwh/${rentWarehNo}/whin/cancel/${whinExpct}-${whinExpctSeq}`,
    {
      rentWarehNo: rentWarehNo,
      whinExpct: whinExpct,
      whinExpctSeq: whinExpctSeq,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        contentType: "application/json",
      },
    }
  );
};
/**
 * 출고 취소
 *
 * @param rentWarehNo 공유창고 ID
 * @param whoutExpct : 출고예정일자(YYYYMMDD)
 * @param whoutExpctSeq : 출고 SEQ
 * @returns {Promise<Promise<unknown> | Promise<unknown>>}
 */
export const postCancelExport = async ({
                                         rentWarehNo = "",
                                         whoutExpct = "",
                                         whoutExpctSeq = "",
                                       }) => {
  const token = await AsyncStorage.getItem(TOKEN);
  return mainAxios.post(
    `/api/v1/rtwh/${rentWarehNo}/whout/cancel/${whoutExpct}-${whoutExpctSeq}`,
    {
      rentWarehNo: rentWarehNo,
      whoutExpct: whoutExpct,
      whoutExpctSeq: whoutExpctSeq,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        contentType: "application/json",
      }
    }
  );
};


/**
 * 송장 업로드
 *
 * @param formData
 * @returns {Promise<*>}
 */
export const uploadImage = async (formData) => {
  const token = await AsyncStorage.getItem(TOKEN);
  console.log(token, 'token')
  console.log(formData, 'formData')
  // mainMediaAxios.body = formData;
  // const url = '/api/v1/rtwh/upload';
  // const data =  mainMediaAxios.request({
  //   method: 'POST',
  //   url: url,
  //   headers: {
  //     Authorization: `Bearer ${token}`
  //   }
  // });
  // return data;


  // return mainAxios.post(`/api/v1/rtwh/upload`, formData,
  //   {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       contentType: 'multipart/form-data'
  //     }
  //   });

  return axios.request({
    url: `/api/v1/rtwh/upload`,
    method: 'POST',
    data: formData,
    requiresToken: true, // set access_token
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'multipart/form-data'
    },
    withCredentials: true,
  });
};

