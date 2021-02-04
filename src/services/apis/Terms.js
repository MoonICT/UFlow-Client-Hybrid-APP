/**
 * /warehouse 참고 지도 검색 API
 */
import { Axios, parseQuery } from '@Services/http';

/**
 * 약관 타입
 * @returns {Promise<*>}
 */
export const types = () => {
  return Axios.getRequest({
    url: `api/v1/terms/types`
  });
};


/**
 * 약관 조회.
 * @param code
 *  0001	서비스
 *  0002	개인정보
 *  0003	위치기반
 *  0004	전자금융거래
 *  0005	마케팅
 *  0006	창고
 * @returns {Promise<*>}
 */
export const getTerms = ({ code = "" }) => {
  return Axios.getRequest({
    url: `/api/v1/terms/code/${code}`
  });
};
