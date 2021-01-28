import { Axios, parseQuery } from '@Services/http';
import { mainAxios } from '../libs/axios';
import AsyncStorage from '@react-native-community/async-storage';


//Contants
import { TOKEN } from '@Constant';
/**
 * [warehouse-tenant-0] 사업자 중복체크
 * @returns {Promise<unknown>}
 */
export const duplicateEntrp = () => {
  return Axios.getRequest({
    url: `/api/v1/warehouse/tenant/duplicate-entrp`,
    requiresToken: true, // set access_token
  })
};


/**
 * [warehouse-tenant-1] list Business Info by tenant (사업자 항목 by 임차인)
 * @returns {Promise<unknown>}
 */
export const listBusinessInfoByTenant = () => {
  return Axios.getRequest({
    url: `/api/v1/warehouse/tenant/business-infos`,
    requiresToken: true, // set access_token
  })
};


/**
 * [warehouse-tenant-2] 창고 사업자 정보(임차인) 등록
 * @param businessInfo 사업자 정보
 * {
 *   name: {사업자명},
 *   position: {직함},
 *   corpNumber: {법인등록번호},
 *   number: {사업자번호},
 *   regFile: {사업자등록증파일명},
 *   phone: {사업자전화번호},
 *   email: {담당장이메일},
 *
 *   taxBillEmail: {세금계산서이메일},
 *
 *   jibunAddr: {
 *     zipNo: {지번우편번호},
 *     address: {지번 주소},
 *     detail: {지번 상세 주소}
 *   },
 *   roadAddr: {
 *     zipNo: {도로명우편번호},
 *     address: {도로명주소},
 *     detail: {도로명 상세 주소}
 *   },
 *   gps {
 *     latitude: {위도},
 *     longitude: {경도}
 *   }
 * }
 * @returns EntrpResBody
 */

export const regBusinessInfoByTenant = async businessInfo => {
  const token = await AsyncStorage.getItem(TOKEN);
  console.log('tenantData', businessInfo)
  return await mainAxios.post(`/api/v1/warehouse/tenant/business-infos`, businessInfo, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
};


/**
 * [warehouse-tenant-3] possible Contract by tenant (창고 견적요청 가능 유/무 확인 by 임차인)
 * @param contractType : 계약유형(KEEP(임대)/TRUST(수탁))
 * @param warehouseRegNo : 창고 ID
 * @param seq : KEEP seq or TRUST seq
 * @returns {Promise<*>}
 */
export const possibleContract = async ({
    contractType = '',
    warehouseRegNo = '',
    seq = null,
  }) => {
  const token = await AsyncStorage.getItem(TOKEN);

  return await mainAxios.get(`/api/v1/warehouse/tenant/possible-contract`, {
    params: {
      contractType: contractType,
      warehouseRegNo: warehouseRegNo,
      seq: seq
    },
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
};

/**
 * 임차인 창고 사업자 유/무
 * @returns {Promise<*>}
 */
export const emptyBusinessInfo = () => {
  return Axios.getRequest({
    url: `/api/v1/warehouse/tenant/empty-business-info`,
    requiresToken: true, // set access_token
  })
};
