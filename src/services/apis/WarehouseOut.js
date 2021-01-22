import { Axios, parseQuery } from '@Services/http'

/**
 * Question List
 * @return        : Object: Promise
 * */
export const list = ({
                               query = '',
                               startDate = '',
                               endDate = '',
                               size = '',
                               page = '',
                               sort = '',
                             } = {}) => {
  return Axios.request({
    methodType: 'GET',
    // url: `/api/v1/whout${parseQuery(arguments)}`,
    url: `/api/v1/test/lang/country`,
  })
};


/**
 * 고유창고 페이징 가져오기 (임차인/창고주)
 *
 * @param userType : tenant / owner 임차인 / 창고주
 * @returns {Promise<*>}
 */
export const getInOutGroups = ({userType = ""}) => {
  return Axios.request({
    methodType: "GET",
    // url: `/api/v1/rtwh/warehouse-rented/owner`,
    url: `/api/v1/rtwh/warehouse-rented/${userType}`,
    requiresToken: true,
    config: {
      headers: {
        // Authorization: `Bearer ${this.accessToken}`,
        contentType: "application/json",
      },
    },
  });
};

/**
 * 입고/출고 내역 가져오기
 *
 * @param userType : tenant / owner 임차인 / 창고주
 * @param rentWarehNo : 임차인 ID
 * @returns {Promise<Promise<unknown> | Promise<unknown>>}
 */
export const getDetailInOut = (params) => {
  let userType = params.userType || ''
  let rentWarehNo = params.rentWarehNo || ''
  return Axios.request({
    methodType: "GET",
    url: `/api/v1/rtwh/transaction/${userType}/${rentWarehNo}${parseQuery(params)}`,
    requiresToken: true
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
export const postImportOwner = ({
                                  rentWarehNo = "",
                                  whinExpct = "",
                                  whinDecisQty = "",
                                  whinDecis = "",
                                  expctSeq = "",
                                  reason = "",
                                  filename = "",
                                }) => {
  return Axios.request({
    methodType: "POST",
    url: `/api/v1/rtwh/whin/owner`,
    payload: {
      // rentWarehNo: "RT2020121419",
      rentWarehNo: rentWarehNo,
      whinExpct: whinExpct,
      whinDecisQty: whinDecisQty,
      whinDecis: whinDecis,
      whinExpctSeq: expctSeq,
      reason: reason,
      filename: filename,
    },
    requiresToken: true,
    config: {
      headers: {
        // Authorization: `Bearer ${this.accessToken}`,
        contentType: "application/json",
      },
    },
  });
};

/**
 * 임차인 입고 하기
 *
 * @param rentWarehNo : 공유창고 ID
 * @param whinExpct : 입고예정일
 * @param whinExpctQty : 입고예정량
 */
export const postImportTenant = ({
                                   rentWarehNo = "",
                                   whinExpct = "",
                                   whinExpctQty = "",
                                 }) => {
  return Axios.request({
    methodType: "POST",
    url: `/api/v1/rtwh/whin/tenant`,
    payload: {
      rentWarehNo: rentWarehNo,
      whinExpct: whinExpct,
      whinExpctQty: whinExpctQty
    },
    requiresToken: true,
  });
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
export const postExportOwner = ({
                                  rentWarehNo = "",
                                  whoutExpct = "",
                                  decisQty = "",
                                  decis = "",
                                  reason = "",
                                  whoutExpctSeq = "",
                                  filename = "",
                                }) => {
  return Axios.request({
    methodType: "POST",
    url: `/api/v1/rtwh/whout/owner`,
    payload: {
      rentWarehNo: rentWarehNo,
      whoutExpct: whoutExpct,
      decisQty: decisQty,
      decis: decis,
      reason: reason,
      whoutExpctSeq: whoutExpctSeq,
      filename: filename,
    },
    requiresToken: true,
    config: {
      headers: {
        // Authorization: `Bearer ${this.accessToken}`,
        contentType: "application/json",
      },
    },
  });
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
export const postExportTenant = ({
                                   rentWarehNo = "",
                                   whoutExpct = "",
                                   expctQty = "",
                                   decis = "",
                                 }) => {
  return Axios.request({
    methodType: "POST",
    url: `/api/v1/rtwh/whout/tenant`,
    payload: {
      rentWarehNo: rentWarehNo,
      whoutExpct: whoutExpct,
      expctQty: expctQty,
      // decis: decis,
    },
    requiresToken: true,
  });
};

/**
 * 임고 취소
 *
 * @param rentWarehNo 공유창고 ID
 * @param whinExpct : 입고예정일자(YYYYMMDD)
 * @param whinExpctSeq : 출고 SEQ
 * @returns {Promise<Promise<unknown> | Promise<unknown>>}
 */
export const postCancelImport = ({
                                   rentWarehNo = "",
                                   whinExpct = "",
                                   whinExpctSeq = "",
                                 }) => {
  return Axios.request({
    methodType: "POST",
    url: `/api/v1/rtwh/${rentWarehNo}/whin/cancel/${whinExpct}-${whinExpctSeq}`,
    payload: {
      rentWarehNo: rentWarehNo,
      whinExpct: whinExpct,
      whinExpctSeq: whinExpctSeq,
    },
    requiresToken: true,
  });
};
/**
 * 출고 취소
 *
 * @param rentWarehNo 공유창고 ID
 * @param whoutExpct : 출고예정일자(YYYYMMDD)
 * @param whoutExpctSeq : 출고 SEQ
 * @returns {Promise<Promise<unknown> | Promise<unknown>>}
 */
export const postCancelExport = ({
                                   rentWarehNo = "",
                                   whoutExpct = "",
                                   whoutExpctSeq = "",
                                 }) => {
  return Axios.request({
    methodType: "POST",
    url: `/api/v1/rtwh/${rentWarehNo}/whout/cancel/${whoutExpct}-${whoutExpctSeq}`,
    payload: {
      rentWarehNo: rentWarehNo,
      whoutExpct: whoutExpct,
      whoutExpctSeq: whoutExpctSeq,
    },
    requiresToken: true,
    config: {
      headers: {
        // Authorization: `Bearer ${this.accessToken}`,
        contentType: "application/json",
      },
    },
  });
};

// /**
//  * 송장 업로드
//  *
//  * @param formData
//  * @returns {Promise<*>}
//  */
// export const uploadImage = (formData) => {
//   return Axios.postRequest({
//     url: `/api/v1/rtwh/upload`,
//     payload: formData,
//     requiresToken: true, // set access_token
//     config: {
//       headers: {
//         contentType: 'multipart/form-data'
//       }
//     }
//   });
// };
