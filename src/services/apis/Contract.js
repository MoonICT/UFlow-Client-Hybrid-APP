import {Axios} from '@Services/http';
import moment from 'moment'
import AsyncStorage from "@react-native-community/async-storage";
import {mainAxios, mainAxiosToken} from '../libs/axios';

import {TOKEN} from '@Constant';


/**
 * [mypage-estimate-contract-keep-1] 임차인 보관 계약요청 Tenant create contract keep
 *
 * @param idWarehouse
 * @param cntrDvCode
 * @returns CntrMgmtKeepResBody
 */
export const createKeep = async ({idWarehouse = '', mgmtKeepSeq = '', rentUserNo = 0}) => {
  const token = await AsyncStorage.getItem(TOKEN);

  return await mainAxios.post(
    `/api/v1/contract/keep`,
    {
      mgmtKeepSeq: mgmtKeepSeq, // 견적 보관 seq
      warehouseRegNo: idWarehouse,
      rentUserNo: rentUserNo
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      }
    });
};

/**
 * [mypage-estimate-contract-trust-1] 임차인 수탁 계약요청 Tenant create contract trust
 *
 * @param idWarehouse
 * @param cntrDvCode
 * @returns CntrMgmtTrustResBody
 */
export const createTrust = async ({idWarehouse = '', mgmtTrustSeq = '', rentUserNo = 0}) => {
  const token = await AsyncStorage.getItem(TOKEN);

  return await mainAxios.post(
    `/api/v1/contract/trust`,
    {
      warehouseRegNo: idWarehouse, // 창고등록관리테이블
      rentUserNo: rentUserNo, // 견적 수탁 seq
      mgmtTrustSeq: mgmtTrustSeq // 견적 수탁 seq
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      }
    });
};

/**
 * [contract-1] 계약건 불러오기 Get detail contract
 *
 * @param type owner/tenant 창고주/임차인
 * @param idWarehouse 창고
 * @param rentUserNo 사용자번호(임차인)
 * @param cntrDvCode 계약구분
 * @param cntrYmdFrom 계약일자FROM YYYYMMDD
 * @returns {Promise<*>}
 */
export const getContractKeep = ({
                                  type = '',
                                  contractType = '',

                                  idWarehouse = '',
                                  rentUserNo = '',
                                  cntrYmdFrom = ''
                                }) => {
  type = type.toLowerCase();
  contractType = contractType.toLowerCase();

  return Axios.getRequest({
    url: `/api/v1/contract/${type}/${contractType}/${idWarehouse}-${rentUserNo}-${cntrYmdFrom}`,
    requiresToken: true
  })
};

/**
 * [mypage-contract-owner-4100-trust] 창고주 수탁/보관 계약협의 요청(약관동의) (4100)
 * @param contractType 계약유형 keep/trust
 * @param file 통장사본
 * @param warehouseRegNo 창고주 ID
 * @param rentUserNo 임차인 ID
 * @param cntrYmdFrom 계약시작일 FROM
 * @returns {Promise<*>}
 */
export const owner4100 = (contractType, formData) => {
  return Axios.postRequest({
    url: `/api/v1/contract/4100/owner/${contractType}`,
    payload: formData,
    requiresToken: true, // set access_token
    config: {
      headers: {
        contentType: 'multipart/form-data'
      }
    }
  });
};

/**
 * 통장사본 유무 확인
 * @param warehouseId 창고 ID
 * @returns {Promise<*>}
 */
export const hasEtcFile = ({warehouseId = ''}) => {
  return Axios.getRequest({
    url: `/api/v1/contract/has-etc-file/${warehouseId}`,
    requiresToken: true, // set access_token
  });
}

/**
 * [mypage-contract-tenant-4100-trust] 임차인 수탁/보관 계약협의 요청(약관동의) (4100)
 * @param contractType 계약유형
 * @param warehouseRegNo 창고 ID
 * @param rentUserNo 임차인 ID
 * @param cntrYmdFrom 계약일 FROM
 * @returns {Promise<*>}
 */
export const tenant4100 = ({
                             contractType = '',
                             warehouseRegNo = '',
                             rentUserNo = 0,
                             cntrYmdFrom = ''
                           }) => {
  return Axios.postRequest({
    url: `/api/v1/contract/4100/tenant/${contractType}`,
    payload: {
      warehouseRegNo: warehouseRegNo,
      rentUserNo: rentUserNo,
      cntrYmdFrom: cntrYmdFrom
    },
    requiresToken: true, // set access_token
  });
};

/**
 * oz 보관 계약서
 * @param warehouseRegNo
 * @param cntrDvCd
 * @param cntrYmdFrom
 * @returns {Promise<*>}
 */
export const ozContractURl = ({
                                type = '',
                                warehouseRegNo = '',
                                cntrDvCd = '',
                                cntrYmdFrom = ''
                              }) => {
  return Axios.postRequest({
    url: `/api/v1/contract/${type}/oz/html`,
    payload: {
      warehouseId: warehouseRegNo,
      cntrDvCd: cntrDvCd,
      cntrYmdFr: moment(cntrYmdFrom).format('YYYYMMDD')
    },
    requiresToken: true, // set access_token
  });
};
