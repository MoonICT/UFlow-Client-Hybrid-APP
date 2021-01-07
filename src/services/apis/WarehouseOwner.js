import { Axios, parseQuery } from '@Services/http';
import { mainAxios } from '../libs/axios';
import AsyncStorage from '@react-native-community/async-storage';

//Contants
import { TOKEN } from '@Constant';
/**
 * [warehouse-owner-0] 사업자 중복체크
 * @returns {Promise<unknown>}
 */
export const duplicateEntrp = ({ entrpNo = '' } = {}) => {
  return Axios.getRequest({
    url: `/api/v1/warehouse/owner/duplicate-entrp${parseQuery({
      entrpNo: entrpNo,
    })}`,
    requiresToken: true, // set access_token
  })
};

/**
 * [warehouse-owner-1] 창고등록 가능 사업자 목록
 * @returns {Promise<unknown>}
 */

export const possibleEntrp = async () => {
  const token = await AsyncStorage.getItem(TOKEN);
  console.log('token1', token);

  return await mainAxios.get(`/api/v1/warehouse/owner/possible-entrp`, {
    headers: {
      Authorization: `Bearer ${token}`,
      // Accept: 'application/json',
    },
  });
};

/**
 * [warehouse-owner-2] status warehouse by owner (창고 정보 유/무 확인 by 창고주)
 * Status
 * NONE 등록된 사업자가 없음, 최초 창고주 등록, 창고등록 가능 200
 * PSB_REG 창고등록 가능 200
 * IMP_REG 창고등록 불가능 200
 * @returns {Promise<*>}
 */
export const statusWhrgByOwner = async () => {
  const token = await AsyncStorage.getItem(TOKEN);
  return await mainAxios.get(`/api/v1/warehouse/owner/status`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
};

/**
 * [warehouse-owner-3] Warehouse business information registration by Owner (창고 사업자 정보 등록)
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
export const regBusinessInfo = (businessInfo) => {
  return Axios.postRequest({
    url: `/api/v1/warehouse/owner/business-infos`,
    requiresToken: true, // set access_token
    payload: businessInfo
  })
};

/**
 * 내창고 목록
 * @returns {
        "id": "RG2020112635",
        "name": "에이아트 창고",
        "useTypeCode": {
          "stdCode": "MBSP0001",
          "stdCodeName": "사용자유형",
          "stdDetailCode": "0001",
          "stdDetailCodeName": "일반사용자",
          "remark1": ""
        },
        "sttsDbCode": {
          "stdCode": "MBSP0001",
          "stdCodeName": "사용자유형",
          "stdDetailCode": "0001",
          "stdDetailCodeName": "일반사용자",
          "remark1": ""
        },
        "cnsltPossYn": true, >>> 협의가능여부
        "address": "서울시 마포구 독막로 9길 13 101",
        "keep": {
          "subTitle": "10일",
          "gdsTypeCodes": [
            {
              "stdCode": "WHRG0001",
              "stdCodeName": "상품보관형태",
              "stdDetailCode": "0001",
              "stdDetailCodeName": "냉동",
              "remark1": ""
            }
          ],
          "splyAmount": 100000, >> 보관비
          "mgmtChrg": 100000, >> 관리비
          "unit": "일" >> 단위
        },
        "trust": {
          "subTitle": "20일",
          "gdsTypeCodes": [
            {
              "stdCode": "WHRG0001",
              "stdCodeName": "상품보관형태",
              "stdDetailCode": "0002",
              "stdDetailCodeName": "냉장",
              "remark1": ""
            },
            {
              "stdCode": "WHRG0001",
              "stdCodeName": "상품보관형태",
              "stdDetailCode": "0001",
              "stdDetailCodeName": "냉동",
              "remark1": ""
            }
          ],
          "whinChrg": 200000, >> 입고단가
          "whoutChrg": null, >> 출고단가
          "unit": "일"
        }
      }
 */
export const myWarehouses = ({ config = '' } = {}) => {
  return Axios.getRequest({
    url: `/api/v1/warehouse/owner`,
    requiresToken: true, // set access_token
    config,
  })
};

/**
 * 협의가능여부 Toggle
 * @returns
 *
 */
export const cnsltPossYn = ({
  warehouseId: warehouseId
}) => {
  return Axios.postRequest({
    url: `/api/v1/warehouse/owner/cnslt-poss-toggle`,
    requiresToken: true, // set access_token
    payload: {
      warehouseId: warehouseId
    }
  })
};
