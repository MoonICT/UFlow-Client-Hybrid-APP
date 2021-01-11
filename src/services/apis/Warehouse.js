import { Axios, parseQuery } from '@Services/http';
import { mainAxios } from '../libs/axios';
import AsyncStorage from '@react-native-community/async-storage';

//Contants
import { TOKEN } from '@Constant';

export const uploadImage = async formData => {
  // const token = await AsyncStorage.getItem(TOKEN);
  // console.log('token :>> ', token);
  console.log('formData :>> ', formData);
  return await mainAxios.post('/api/v1/file/images', {
    formData,
    headers: {
      // Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });
};
export const registerWH = async data => {
  console.log('dataregisterWH :>> ', data);
  const token = await AsyncStorage.getItem(TOKEN);
  return await mainAxios.post('/api/v1/warehouse', data, {
    headers: {
      Authorization: `Bearer ${token}`,
      // Accept: 'application/json',
    },
  });
};
export const updateWH = async value => {
  console.log('dataregisterWH :>> ', value);
  let url = value.url;
  let data = value.data;
  const token = await AsyncStorage.getItem(TOKEN);
  return await mainAxios.put(`/api/v1/warehouse/${url}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
};
export const myWH = async () => {
  const token = await AsyncStorage.getItem(TOKEN);
  return mainAxios.get('/api/v1/warehouse/owner', {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
};
export const detailWH = async url => {
  const token = await AsyncStorage.getItem(TOKEN);
  return await mainAxios.get(`/api/v1/warehouse/${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
};
export const contractManager = async type => {
  const token = await AsyncStorage.getItem(TOKEN);
  return await mainAxios.get(`/api/v1/mypage/estmt-cntr?userType=${type}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
};
export const quotation = async type => {
  const token = await AsyncStorage.getItem(TOKEN);
  return await mainAxios.get(`/api/v1/estimate/${type}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
};
export const responQuotation = async value => {
  const token = await AsyncStorage.getItem(TOKEN);
  console.log('value.data', value.data);
  return await mainAxios.post(`/api/v1/estimate/${value.type}`, value.data, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
};

export const requestContract = async value => {
  const token = await AsyncStorage.getItem(TOKEN);
  console.log('value', value);
  return await mainAxios.post(`/api/v1/contract/${value.typeWH}`, value.data, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
};

export const listChat = async url => {
  const token = await AsyncStorage.getItem(TOKEN);

  return await mainAxios.get(`/api/v1/chat/contract/${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
};

export const chatting = async value => {
  const token = await AsyncStorage.getItem(TOKEN);

  return await mainAxios.post(
    `/api/v1/chat/contract/${value.url}`,
    value && value.data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    },
  );
};

export const termsContract = async value => {
  const token = await AsyncStorage.getItem('token');
  // return await mainAxios.post(
  //   `/api/v1/chat/contract/4100/${value.url}`,
  //   value && value.data,
  //   {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       Accept: 'application/json',
  //     },
  //   },
  // );
};

export const searchAddressKakao = async ({
  query = '',
  page = 0,
  size = 20,
}) => {
  let url = parseQuery({
    query: query,
    page: page,
    size: size,
  });
  return await mainAxios.get(`/api/v1/kakao-map/address${url}`);
};
/**
 * 회원 계정에 창고 사업자 정보가 등록되어있는지 확인
 * @returns {Promise<unknown>}
 */
export const hasWarehouse = () => {
  return Axios.request({
    methodType: 'GET',
    url: `/api/v1/warehouse/has`,
    requiresToken: true, // set access_token
    config: {
      headers: {
        contentType: 'application/json',
      },
    },
  });
};

/**
 * 회원 계정에 창고 사업자 등록
 * @param businessInfo 사업자 정보
 * {
 *   name: {사업자명},
 *   position: {직위},
 *   corpNumber: {법인등록번호},
 *   number: {사업자번호},
 *   regFile: {사업자등록증파일명},
 *   phone: {사업자전화번호},
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
 * @returns {Promise<unknown>}
 */
export const addBusinessInfo = businessInfo => {
  return Axios.request({
    methodType: 'POST',
    url: `/api/v1/warehouse/business-info`,
    requiresToken: true, // set access_token
    payload: businessInfo,
    config: {
      headers: {
        contentType: 'application/json',
      },
    },
  });
};

/**
 * 지번주소,도로명주소,위/경도 검색 (회원전용)
 * @param addressQuery 주소 (지번주소,도로명주소, 지번또는 빌딩번호까지 입력해야함)
 * @param page (페이지 0부터)
 * @param size (노출 사이즈 20)
 * @returns {Promise<unknown>}
 */
export const searchAddress = ({ addressQuery = '', page = 0, size = 20 }) => {
  console.log(addressQuery, 'addressQuery');
  return Axios.request({
    methodType: 'GET',
    url: `/api/v1/warehouse/address${parseQuery({
      addressQuery: addressQuery,
      page: page,
      size: size,
    })}`,
    requiresToken: true, // set access_token
    config: {
      headers: {
        contentType: 'application/json',
      },
    },
  });
};

/**
 * 추가옵션구분코드 WHRG0008 (0001:보세, 0002:의약품, 0003:위험물), 다중입력시 '|' 구분자로 처리"
 * @returns {Promise<unknown>}
 */
export const listAddOptDvCode = () => {
  return Axios.request({
    methodType: 'GET',
    url: `/api/v1/warehouse/add-opt-dv-code`,
    requiresToken: true, // set access_token
    config: {
      headers: {
        contentType: 'application/json',
      },
    },
  });
};

/**
 * 추가옵션구분코드 WHRG0009 보험구분(0001:건물보험, 0002:재고보험, 0003:영업배상보험), 다중입력시 '|' 구분자로 처리"
 * @returns {Promise<unknown>}
 */
export const listInsrDvCode = () => {
  return Axios.request({
    methodType: 'GET',
    url: `/api/v1/warehouse/insr-dv-code`,
    requiresToken: true, // set access_token
    config: {
      headers: {
        contentType: 'application/json',
      },
    },
  });
};

/**
 * 상태구분코드 WHRG1001 상태(0001:공실등록, 1100:공실검증완료, 4100:계약진행중, 5100:계약체결, 9100:공실검증실패)"
 * @returns {Promise<unknown>}
 */
export const listSttsDbCode = () => {
  return Axios.request({
    methodType: 'GET',
    url: `/api/v1/warehouse/stts-dv-code`,
    requiresToken: true, // set access_token
    config: {
      headers: {
        contentType: 'application/json',
      },
    },
  });
};

/**
 * 상태구분코드 WHRG0011 접안방식구분코드 (0001:도크, 0002:컨테이너, 0003:화물EV, 0004:수직반송기)"
 * @returns {Promise<unknown>}
 */
export const listAprchMthdDvCode = () => {
  return Axios.request({
    methodType: 'GET',
    url: `/api/v1/warehouse/aprch-mthd-dv-code`,
    requiresToken: true, // set access_token
    config: {
      headers: {
        contentType: 'application/json',
      },
    },
  });
};

/**
 * 층구분코드 WHRG0010 (F1:1층, F2:2층, F3:3층, B1:지하1층)"
 * @returns {Promise<unknown>}
 */
export const listFlrDvCode = () => {
  return Axios.request({
    methodType: 'GET',
    url: `/api/v1/warehouse/flr-dv-code`,
    requiresToken: true, // set access_token
    config: {
      headers: {
        contentType: 'application/json',
      },
    },
  });
};

/**
 * 상태구분코드 WHRG0001 상품보관유형코드 (0001:냉동, 0002:냉장, 0003:상온, 0004:위험물, 9100:기타)"
 * @returns {Promise<unknown>}
 */
export const listGdsTypeCode = () => {
  return Axios.request({
    methodType: 'GET',
    url: `/api/v1/warehouse/gds-type-code`,
    // requiresToken: true, // set access_token
    config: {
      headers: {
        contentType: 'application/json',
      },
    },
  });
};

/**
 * 상태구분코드 WHRG0013 정산단위구분 (CU01:㎡, CU02:평, CU03:파렛트)"
 * @returns {Promise<unknown>}
 */
export const listCalUnitDvCode = () => {
  return Axios.request({
    methodType: 'GET',
    url: `/api/v1/warehouse/cal-unit-dv-code`,
    // requiresToken: true, // set access_token
    config: {
      headers: {
        contentType: 'application/json',
      },
    },
  });
};

/**
 * 상태구분코드 WHRG0014 정산기준구분코드 (CS03:일, CS04:월, CS05:분기, CD06:반기, CD07:연)"
 * @returns {Promise<unknown>}
 */
export const listCalStdDvCode = () => {
  return Axios.request({
    methodType: 'GET',
    url: `/api/v1/warehouse/cal-std-dv-code`,
    requiresToken: true, // set access_token
    config: {
      headers: {
        contentType: 'application/json',
      },
    },
  });
};

/**
 * 창고등록
 * @param whrgBody
 * {
 *     name: "에이아트 창고",
 *     description: "에이아트 창고 소개",
 *     telNo: "0222876875",
 *     address: {
 *       zipNo: "123456",
 *       sidoName: "서울시",
 *       skkCd: "",
 *       skkName: "마포구",
 *       bjdongCd: "",
 *       bjdongName: "서교동",
 *       hjdongCd: "",
 *       hjdongName: "서교동",
 *       roadNmCd: "도로명 코드",
 *       address: "서울시 마포구 독막로 9길 13",
 *       detail: "101"
 *     },
 *     roadAddr: {
 *       zipNo: "123456",
 *       address: "서울시 마포구 독막로 9길 13",
 *       detail: "101"
 *     },
 *     gps: {
 *       latitude: 0,
 *       longitude: 0
 *     },
 *     cmpltYmd: 1606316400000,
 *     bldgArea: 10,
 *     siteArea: 10,
 *     totalArea: 10,
 *     prvtArea: 10,
 *     cmnArea: 10,
 *     addOptDvCodes: ["0001", "0003"],
 *     insrDvCodes: ["0001", "0002"],
 *     cnsltPossYn: true,
 *     sttsDbCode: "0001",
 *     vrfctFailReason: "",
 *     floors: [
 *       {
 *         flrDvCode: "F1",
 *         flrArea: 100,
 *         parkArea: 100,
 *         opcArea: 100,
 *         prvtArea: 100,
 *         cmnArea: 100,
 *         flrHi: 10,
 *         efctvHi: 15,
 *         aprchMthdDvCode: "0001",
 *         dockQty: 2
 *       }
 *     ],
 *     images: [
 *       {
 *         name: "A.jpg"
 *       }
 *     ],
 *     keeps: [
 *       {
 *         typeCode: "0001",
 *         calUnitDvCode: "CU01",
 *         calStdDvCode: "CS03",
 *         mgmtChrgDvCode: "0001",
 *         usblYmdFrom: 1606310400000,
 *         usblYmdTo: 1606316400000,
 *         usblValue: 10,
 *         cmnArea: 100,
 *         splyAmount: 100000,
 *         mgmtChrg: 100000,
 *         remark: "비고란.."
 *       }
 *     ],
 *     trusts: [
 *       {
 *         typeCode: "0002",
 *         calUnitDvCode: "CU02",
 *         calStdDvCode: "CS03",
 *         usblYmdFrom: 1606310400000,
 *         usblYmdTo: 1606316400000,
 *         usblValue: 20,
 *         cmnArea: 300,
 *         whinChrg: 100000,
 *         whoutChrg: 200000,
 *         psnChrg: 200000,
 *         mnfctChrg: 200000,
 *         dlvyChrg: 2000,
 *         shipChrg: 2000,
 *         remark: "비고란.."
 *       },
 *       {
 *         typeCode: "0001",
 *         calUnitDvCode: "CU03",
 *         calStdDvCode: "CS01",
 *         usblYmdFrom: 1606310400000,
 *         usblYmdTo: 1606316400000,
 *         usblValue: 20,
 *         cmnArea: 300,
 *         whinChrg: 100000,
 *         whoutChrg: 200000,
 *         psnChrg: 200000,
 *         mnfctChrg: 200000,
 *         dlvyChrg: 2000,
 *         shipChrg: 2000,
 *         remark: "비고란.."
 *       }
 *     ]
 *   }
 * @returns {Promise<unknown>}
 */
export const registWhrg = whrgBody => {
  return Axios.request({
    methodType: 'POST',
    url: `/api/v1/warehouse`,
    payload: whrgBody,
    requiresToken: true, // set access_token
    config: {
      headers: {
        contentType: 'application/json',
      },
    },
  });
};

/**
 * 창고 상세
 * @param id 창고 ID
 * @param context NextJS Context
 * @returns {Promise<unknown>}
 */
export const getWhrg = async ({ id = '', config = '' }) => {
  let configDefault = {
    headers: {
      contentType: 'application/json',
    },
  };
  if (config) {
    configDefault = {
      ...configDefault,
      ...config,
    };
  }
  console.log('API :::::', config);
  // return Axios.request({
  //   methodType: 'GET',
  //   url: `/api/v1/warehouse/${id}`,
  //   requiresToken: true,
  //   config: configDefault,
  // });

  const token = await AsyncStorage.getItem(TOKEN);

  return await mainAxios.get(`/api/v1/warehouse/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
    // config: configDefault
  });
};

/**
 * 창고 검색
 * @param id 창고 ID
 * @returns {Promise<unknown>}
 */
export const pageWhrg = ({
  query = '',
  startDate = '',
  endDate = '',
  size = 20,
  page = 0,
  sort = 'createdDate,desc',
}) => {
  return Axios.request({
    methodType: 'GET',
    url: `/api/v1/warehouse${parseQuery({
      query: query,
      startDate: startDate,
      endDate: endDate,
      size: size,
      page: page,
      sort: sort,
    })}`,
    config: {
      headers: {
        contentType: 'application/json',
      },
    },
  });
};

//=====================================================================================================================
/** WareHouse Home Page */

/**
 * 추천 알고리즘 창고
 * @returns {Promise<unknown>}
 **/
export const listRecommend = async params => {

  return await mainAxios.get(`/api/v1/warehouse/recommend`, {
    params: {
      ...params,
    },
    headers: {
      // Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
};

/**
 * List All Bussiness Info
 */
export const listAllBussinessInfo = () => {
  return Axios.request({
    methodType: 'GET',
    url: `/api/v1/warehouse/tenant/list-all-bussiness-info`,
    requiresToken: true, // set access_token
    config: {
      headers: {
        contentType: 'application/json',
      },
    },
  });
};

export const pageWhrgQnA = ({
  id = '',
  query = '',
  startDate = '',
  endDate = '',
  size = 15,
  page = 0,
  sort = 'createdDate,desc',
  requiresToken = false,
}) => {
  console.log('idcc', id)
  return Axios.getRequest({
    methodType: 'GET',
    requiresToken: requiresToken,
    url: `/api/v1/warehouse/question${parseQuery({
      idWarehouse: id,
      query: query,
      startDate: startDate,
      endDate: endDate,
      size: size,
      page: page,
      sort: sort,
    })}`,
  });
};

export const toggleFav = async idWarehouse => {
  const token = await AsyncStorage.getItem(TOKEN);
  console.log(token)
  console.log('url',`/api/v1/warehouse/${idWarehouse}/favorite` )
  return await mainAxios.post(`/api/v1/warehouse/${idWarehouse}/favorite`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const getLinkContract = body => {
  let url = `/api/v1/contract/${body.type}/oz/html`;
  return Axios.request({
    methodType: 'POST',
    url: url,
    requiresToken: true, // set access_token
    payload: body,
    config: {
      headers: {
        contentType: 'application/json',
      },
    },
  });
};
