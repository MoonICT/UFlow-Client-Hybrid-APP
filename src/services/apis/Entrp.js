import { Axios, parseQuery } from '@Services/http';
import { mainAxios, mainAxiosToken } from '../libs/axios';
import AsyncStorage from '@react-native-community/async-storage';

//Contants
import { TOKEN } from '@Constant';

/**
 * [내정보수정] 사업자리스트
 * */

export const list = async () => {
  const token = await AsyncStorage.getItem(TOKEN);
  return await mainAxios.get('/api/v1/entrp', {
    headers: {
      Authorization: `Bearer ${token}`,
      // Accept: 'application/json',
    },
  });
};

/**
 * 중복체크
 * @param number 사업자 번호(수정용 자신 제외)
 * @returns {Promise<*>}
 */
export const duplicate = ({number = ""}) => {
  return Axios.getRequest({
    url: `/api/v1/entrp/${number}/duplicate`,
    requiresToken: true
  })
};

/**
 *
 * @param id : id
 * @param name : 사업자명
 * @param repreNm : 대표자명
 * @param inchgNm : 담당자명
 * @param position : 직위
 * @param corpNumber : 법인등록번호
 * @param number : 사업자번호
 * @param email : 담당자 이메일
 * @param taxBillEmail : 세금계산서이메일
 * @param regFile : 사업자등록증파일명
 * @param phone : 사업자전화번호
 * @param jibunAddr : 지번주소
 * {
 *    zipNo : "", 우편번호
 *    address : "", 주소
 *    detail : "" 상세 주소
 * }
 * @param roadAddr : 도로명주소
 * {
 *    zipNo : "", 우편번호
 *    address : "", 주소
 *    detail : "" 상세 주소
 * }
 * @param gps : 위치
 * @returns {Promise<*>}
 */
export const update = ({
                         oriId = "",
                         id = "",
                         name = "",
                         repreNm = "",
                         inchgNm = "",
                         position = "",
                         corpNumber = "",
                         number = "",
                         email = "",
                         taxBillEmail = "",
                         regFile = "",
                         phone = "",
                         jibunAddr = {},
                         roadAddr = {},
                         gps = {},
                       }) => {
  return Axios.putRequest({
    url: `/api/v1/entrp`,
    requiresToken: true,
    payload: {
      oriId: oriId,
      id: id,
      name: name,
      repreNm: repreNm,
      inchgNm: inchgNm,
      position: position,
      corpNumber: corpNumber,
      number: number,
      email: email,
      taxBillEmail: taxBillEmail,
      regFile: regFile,
      phone: phone,
      jibunAddr: jibunAddr,
      roadAddr: roadAddr,
      gps: gps,
    }
  })
};
