import { Axios, parseQuery } from '@Services/http';

/**
 * [estmt-cntr-1] 마이페이지 견적·계약 (창고주) pagination
 * @param userType: TENANT(임차인)/OWNER(창고주)
 * @param contractType: TRUST(수탁)/KEEP(보관)
 * @param status:
 *          1. RQ00 : 견적요청
 *          2. RS00 : 견적응답
 *          3. 1100 : 계약협의
 *          4. 2100 : 계약요청대기
 *          5. 4100 : 계약중
 *          6. 5100 : 계약완료
 * @returns {Promise<unknown>}
 */
export const pageEstmtCntr = ({
                                userType = "",
                                status = "",
                                contractType = ""
                              }) => {
    contractType = contractType.toUpperCase();

  let objectData = {}
  if (status) {
    objectData = {
      userType: userType,
      contractType: contractType,
      status: status,
    }
  } else {
    objectData = {
      userType: userType,
      contractType: contractType
    }
  }

  return Axios.getRequest({
    url: `/api/v1/mypage/estmt-cntr${parseQuery(objectData)}`,
    requiresToken: true
  });
};

/**
 * [mypage-estimate-owner-1]
 * [mypage-estimate-tenant-1]
 * 상세 견적
 * @param warehouseRegNo : 창고 ID
 * @param mgmtWareHSeq : 보관·수탁 단가의 seq
 * @param type : tenant/owner 임차인/창고주
 * @param contractType : 계약유형 (keep/trust) 보관·수탁
 * @param rentUserNo : 임차인 ID
 * @returns {Promise<unknown>}
 */
export const getContract = ({
                              warehouseRegNo = "",
                              mgmtWareHSeq = null,
                              type = "owner",
                              contractType = 'trust',
                              rentUserNo = ''
                            }) => {

  type = type.toLowerCase();
  contractType = contractType.toLowerCase();

  let urlRes;
  if (rentUserNo && type === 'owner') {
    // 창고주 상세 견적 mypage-estimate-owner-1
    urlRes = `/api/v1/estimate/${type}/${warehouseRegNo}-${mgmtWareHSeq}/${contractType}/${rentUserNo}`
  } else if (type === 'tenant') {
    // 임차인 mypage-estimate-tenant-1
    urlRes = `/api/v1/estimate/${type}/${warehouseRegNo}-${mgmtWareHSeq}/${contractType}`
  }

  return Axios.getRequest({
    url: urlRes,
    requiresToken: true
  });
};

/**
 * [mypage-estimate-owner-2] 마이페이지 견적 상세정보 (창고주 전용)
 *
 * @param warehouseRegNo : 창고ID
 * @param contractType : 계약유형 (keep/trust) 보관·수탁
 * @param warehSeq : 보관·수탁 단가의 seq
 * @param rentUserNo
 * @returns {Promise<unknown>}
 */
export const getDetailEstmtCntrOwner = ({
                                          warehouseRegNo = "",
                                          contractType = "",
                                          warehSeq = "",
                                          rentUserNo = ""
                                        }) => {
  contractType = contractType.toLowerCase();

  return Axios.request({
    methodType: "GET",
    url: `/api/v1/estimate/owner/${warehouseRegNo}/${contractType}/${warehSeq}/${rentUserNo}`,
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
 * [mypage-estimate-tenant-2] 마이페이지 견적 상세정보 (임차인 전용)
 *
 * @param warehouseRegNo : 창고ID
 * @param contractType : 계약유형 (keep/trust) 보관·수탁
 * @param warehSeq : 보관·수탁 단가의 seq
 * @returns {Promise<unknown>}
 */
export const getDetailEstmtCntrTenant = ({
                                           warehouseRegNo = "",
                                           contractType = "",
                                           warehSeq = null
                                         }) => {
  contractType = contractType.toLowerCase();

  return Axios.getRequest({
    url: `/api/v1/estimate/tenant/${warehouseRegNo}/${contractType}/${warehSeq}`,
    requiresToken: true
  });
};

/**
 * [estimate-keep-tenant-1] 임차인 보관 견적 요청 Create request estimate keep by tenant
 * [estimate-keep-owner-1] 창고주 보관 견적 응답 Create response estimate keep by owner
 *
 * @param type: 사용자 유형
 * @param warehouseRegNo : 창고 ID
 * @param seq : 보관계약유형 seq
 * @param rentUserNo : 임차인
 * @param from : 보관기간FROM
 * @param to : 보관기간TO
 * @param rntlValue : 임대수치 (전용면적)
 * @param splyAmount : 공급금액 (보관단가)
 * @param mgmtChrg : 관리단가
 * @param remark : 비고
 * @returns {Promise<unknown>}
 */
export const postQuoteReqResKeep = ({
                                    type = 'owner',
                                    warehouseRegNo = "",
                                    seq = null,

                                    rentUserNo = '',
                                    from = "",
                                    to = "",
                                    rntlValue = null,
                                    splyAmount = null,
                                    mgmtChrg = null,
                                    remark = ""
                                  }) => {
  let urlRes;
  if (rentUserNo && type === 'owner') {
    urlRes = `/api/v1/estimate/${type}/warehouse/${warehouseRegNo}/keep/${seq}/${rentUserNo}`
  } else if(type === 'tenant') {
    urlRes = `/api/v1/estimate/${type}/warehouse/${warehouseRegNo}/keep/${seq}`
  }
  return Axios.postRequest({
    url: urlRes,
    payload: {
      warehouseRegNo: warehouseRegNo,
      seq: seq,
      from: from,
      to: to,
      rntlValue: rntlValue,
      splyAmount: splyAmount,
      mgmtChrg: mgmtChrg,
      remark: remark,
    },
    requiresToken: true,
  });
};

/**
 * [estimate-trust-tenant-1] 임차인 수탁 견적 요청 Create request estimate trust by tenant
 * [estimate-trust-owner-1] 창고주 수탁 견적 응답 response estimate trust by owner
 *
 * @param type : 임차인/창고주 tenant/owner
 * @param warehouseRegNo : 창고 ID
 * @param seq : 보관계약유형 seq
 * @param rentUserNo : 임차인 ID
 * @param from : 수탁기간FROM
 * @param to : 수탁기간TO
 * @param rntlValue : 임대수치(수탁가용수량)
 * @param splyAmount : 공급금액(보관단가)
 * @param whinChrg : 입고단가
 * @param whoutChrg : 출고단가
 * @param psnChrg : 인건단가
 * @param mnfctChrg : 가공단가
 * @param dlvyChrg : 택배단가
 * @param shipChrg : 운송단가
 * @param remark : 비고
 * @returns {Promise<unknown>}
 */
export const postQuoteReqResTrust = ({
                                         type = 'owner',
                                         warehouseRegNo = "",
                                         seq = "",
                                         rentUserNo = null,

                                         from = "",
                                         to = "",
                                         rntlValue = null,
                                         splyAmount = null,
                                         whinChrg = null,
                                         whoutChrg = null,
                                         psnChrg = null,
                                         mnfctChrg = null,
                                         dlvyChrg = null,
                                         shipChrg = null,
                                         remark = ""
                                       }) => {
  let urlRes;
  if (rentUserNo && type === 'owner') {
    // 창고주의 응답
    urlRes = `/api/v1/estimate/${type}/warehouse/${warehouseRegNo}/trust/${seq}/${rentUserNo}`
  } else if(type === 'tenant') {
    urlRes = `/api/v1/estimate/${type}/warehouse/${warehouseRegNo}/trust/${seq}`
  }
  return Axios.postRequest({
    url: urlRes,
    payload: {
      warehouseRegNo: warehouseRegNo,
      seq: seq,

      from: from,
      to: to,
      rntlValue: rntlValue,
      splyAmount: splyAmount,
      whinChrg: whinChrg,
      whoutChrg: whoutChrg,
      psnChrg: psnChrg,
      mnfctChrg: mnfctChrg,
      dlvyChrg: dlvyChrg,
      shipChrg: shipChrg,
      remark: remark
    },
    requiresToken: true
  });
};

// TODO 어디에서 사용되는지 모르겠음.
export const acceptEstmtOwner = ({
                                   warehouseRegNo = "",
                                   seq = null,
                                   rentUserNo = null,
                                   type2 = ""
                                 }) => {
  return Axios.request({
    methodType: "POST",
    url: `/api/v1/estimate/owner/accept/${warehouseRegNo}/${type2}/${seq}/${rentUserNo}`,
    requiresToken: true
  });
};

