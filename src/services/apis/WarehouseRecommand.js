/**
 * /warehouse 참고 지도 검색 API
 */
import {Axios, parseQuery} from '@Services/http';

/**
 * access_token : option
 * @param page : pc(default) 6 mobile 4
 * @param typeCodes
 * @param gdsKeepTypeCodes
 * @returns {Promise<*>}
 */
export const recommendWarehouse = ({
                                     page = 6, // 썸네이 노출 개수 pc(default) 6 mobile 4
                                     typeCodes = '', // 보관/수탁 KEEP/TRUST (,구분)
                                     gdsKeepTypeCodes = '', // 상품보관형태 WHRG0001 (,구분)
                                   } = {}) => {

  return Axios.getRequest({
    url: `/api/v1/warehouse/recommend${parseQuery({
      page: page, // index
      typeCodes: typeCodes, // 보관/수탁 KEEP/TRUST (,구분)
      gdsKeepTypeCodes: gdsKeepTypeCodes, // 상품보관형태 WHRG0001 (,구분)
    })}`,
    requiresToken: true
  })
};
