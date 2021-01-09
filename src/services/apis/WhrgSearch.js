/**
 * /warehouse 참고 지도 검색 API
 */
import { Axios, parseQuery } from '@Services/http';
import { mainAxios } from '../libs/axios';
import AsyncStorage from '@react-native-community/async-storage';

//Contants
import { TOKEN } from '@Constant';

export const pageSearchWhrg = ({
                                 query = '',
                                 startDate = '',
                                 endDate = '',
                                 size = 20,
                                 page = 0,
                                 sort = 'createdDate,desc',

                                 typeCodes = '', // 보관/수탁 KEEP/TRUST (,구분)
                                 gdsKeepTypeCodes = '', // 상품보관형태 WHRG0001 (,구분)

                                 keepFrom = '', // YYYY-MM-DD
                                 keepTo = '', // YYYY-MM-DD
                                 trustFrom = '', // YYYY-MM-DD
                                 trustTo = '', // YYYY-MM-DD


                                 splyAmount = '', // Trust : 보관비 max
                                 mgmtChrg = '', // Keep : 관리비 max
                                 whinChrg = '', // Trust : 입고비 max
                                 whoutChrg = '', // Trust: 출고비 max


                                 prvtArea = '', // Master : 전용면적 max
                                 cmnArea = '', // Master, Trust, Keep : 공용면적 max


                                 siteArea = '', // Master : 대지면적 max
                                 bldgArea = '', // Master : 건축면적 max
                                 totalArea = '', // Master : 연면적 max
                                 flrDvCodes = '', // WHRG0010 층 구분 (복수) (,구분)
                                 flrHi = '',//  Floor : 층고 max
                                 cmpltYmds = '', // Master: 준공일자
                                 aprchMthdDvCodes = '', // Floor : WHRG0011 접안 방식 (복수) (,구분)
                                 insrDvCodes = '', // Master : WHRG0009 보험 (복수) (,구분)
                                 calUnitDvCodes = '', // Trust/Keep : WHRG0013 정산단위구분 (복수) (,구분)
                                 calStdDvCodes = '', // Trust/Keep : WHRG0014 산정기준(정산기준구분) (복수) (,구분)


                                 latitude = '',
                                 longitude = '',
                                 distance = 20,
                               }) => {

  return Axios.getRequest({
    url: `/api/v1/warehouse${parseQuery({
      query: query,
      startDate: startDate,
      endDate: endDate,
      size: size,
      page: page,
      sort: sort,
      
      typeCodes: typeCodes, // 보관/수탁 KEEP/TRUST (,구분)
      gdsKeepTypeCodes: gdsKeepTypeCodes, // 상품보관형태 WHRG0001 (,구분)

      keepFrom: keepFrom, // YYYY-MM-DD
      keepTo: keepTo, // YYYY-MM-DD
      trustFrom: trustFrom, // YYYY-MM-DD
      trustTo: trustTo, // YYYY-MM-DD


      splyAmount: splyAmount, // Trust : 보관비 max
      mgmtChrg: mgmtChrg, // Keep : 관리비 max
      whinChrg: whinChrg, // Trust : 입고비 max
      whoutChrg: whoutChrg, // Trust: 출고비 max


      prvtArea: prvtArea, // Master : 전용면적 max
      cmnArea: cmnArea, // Master, Trust, Keep : 공용면적 max


      siteArea: siteArea, // Master : 대지면적 max
      bldgArea: bldgArea, // Master : 건축면적 max
      totalArea: totalArea, // Master : 연면적 max
      flrDvCodes: flrDvCodes, // WHRG0010 층 구분 (복수) (,구분)
      flrHi: flrHi,//  Floor : 층고 max
      cmpltYmds: cmpltYmds, // Master: 준공일자 (,구분) A,B,C
      aprchMthdDvCodes: aprchMthdDvCodes, // Floor : WHRG0011 접안 방식 (복수) (,구분)
      insrDvCodes: insrDvCodes, // Master : WHRG0009 보험 (복수) (,구분)
      calUnitDvCodes: calUnitDvCodes, // Trust/Keep : WHRG0013 정산단위구분 (복수) (,구분)
      calStdDvCodes: calStdDvCodes, // Trust/Keep : WHRG0014 산정기준(정산기준구분) (복수) (,구분)


      latitude: latitude, // 위도
      longitude: longitude, // 걍도
      distance: distance, // 검색거리
    })}`
  });
};

/**
 * 창고검색 리스트
 * @param query 검색키드
 * @returns {null}
 */
export const listSearchWhrg = ({
                                 query = '',
                                 startDate = '',
                                 endDate = '',
                                 sort = 'createdDate,desc',

                                 typeCodes = '', // 보관/수탁 KEEP/TRUST (,구분)
                                 gdsKeepTypeCodes = '', // 상품보관형태 WHRG0001 (,구분)

                                 keepFrom = '', // YYYY-MM-DD
                                 keepTo = '', // YYYY-MM-DD
                                 trustFrom = '', // YYYY-MM-DD
                                 trustTo = '', // YYYY-MM-DD


                                 splyAmount = '', // Trust : 보관비 max
                                 mgmtChrg = '', // Keep : 관리비 max
                                 whinChrg = '', // Trust : 입고비 max
                                 whoutChrg = '', // Trust: 출고비 max


                                 prvtArea = '', // Master : 전용면적 max
                                 cmnArea = '', // Master, Trust, Keep : 공용면적 max


                                 siteArea = '', // Master : 대지면적 max
                                 bldgArea = '', // Master : 건축면적 max
                                 totalArea = '', // Master : 연면적 max
                                 flrDvCodes = '', // WHRG0010 층 구분 (복수) (,구분)
                                 flrHi = '',//  Floor : 층고 max
                                 cmpltYmds = '', // Master: 준공일자
                                 aprchMthdDvCodes = '', // Floor : WHRG0011 접안 방식 (복수) (,구분)
                                 insrDvCodes = '', // Master : WHRG0009 보험 (복수) (,구분)
                                 calUnitDvCodes = '', // Trust/Keep : WHRG0013 정산단위구분 (복수) (,구분)
                                 calStdDvCodes = '', // Trust/Keep : WHRG0014 산정기준(정산기준구분) (복수) (,구분)


                                 latitude = '',
                                 longitude = '',
                                 distance = 20,
                               }) => {

  return Axios.getRequest({
    url: `/api/v1/warehouse/list-all${parseQuery({
      query: query,
      startDate: startDate,
      endDate: endDate,
      sort: sort,

      typeCodes: typeCodes, // 보관/수탁 KEEP/TRUST (,구분)
      gdsKeepTypeCodes: gdsKeepTypeCodes, // 상품보관형태 WHRG0001 (,구분)

      keepFrom: keepFrom, // YYYY-MM-DD
      keepTo: keepTo, // YYYY-MM-DD
      trustFrom: trustFrom, // YYYY-MM-DD
      trustTo: trustTo, // YYYY-MM-DD


      splyAmount: splyAmount, // Trust : 보관비 max
      mgmtChrg: mgmtChrg, // Keep : 관리비 max
      whinChrg: whinChrg, // Trust : 입고비 max
      whoutChrg: whoutChrg, // Trust: 출고비 max


      prvtArea: prvtArea, // Master : 전용면적 max
      cmnArea: cmnArea, // Master, Trust, Keep : 공용면적 max


      siteArea: siteArea, // Master : 대지면적 max
      bldgArea: bldgArea, // Master : 건축면적 max
      totalArea: totalArea, // Master : 연면적 max
      flrDvCodes: flrDvCodes, // WHRG0010 층 구분 (복수) (,구분)
      flrHi: flrHi,//  Floor : 층고 max
      cmpltYmds: cmpltYmds, // Master: 준공일자
      aprchMthdDvCodes: aprchMthdDvCodes, // Floor : WHRG0011 접안 방식 (복수) (,구분)
      insrDvCodes: insrDvCodes, // Master : WHRG0009 보험 (복수) (,구분)
      calUnitDvCodes: calUnitDvCodes, // Trust/Keep : WHRG0013 정산단위구분 (복수) (,구분)
      calStdDvCodes: calStdDvCodes, // Trust/Keep : WHRG0014 산정기준(정산기준구분) (복수) (,구분)


      latitude: latitude, // 위도
      longitude: longitude, // 걍도
      distance: distance, // 검색거리
    })}`
  });
};


/**
 * 검색 필드 자동완성
 * @param query 검색키드
 * @returns {null}
 */
export const listAutoSearchBar = ({
                                    query = ""
                                  }) => {

  return Axios.getRequest({
    url: `/api/v1/warehouse/auto-search-bar${parseQuery({query: query})}`
  });
}

/**
 * 준공 연차 타입
 * @returns {null}
 */
export const getCmpltTypes = () => {
  console.log(':::::::DEOKIN getCmpltTypes')
  return Axios.getRequest({
    url: `/api/v1/warehouse/cmplt-types`
  });
}

/**
 *
 * @param query
 * @returns {Promise<*>}
 */
export const searchKeywords = ({query = ""}) => {
  return Axios.getRequest({
    url: `/api/v1/warehouse/locations?query=${query}`
  });
};


/* *
 * @param query
 * @returns {Promise<*>}
 *!/*/
export const searchGoData = ({query = ""}) => {
  return Axios.getRequest({
    url: `/api/v1/warehouse/godatas?query=${query}`
  });
};
