import { Axios, parseQuery } from '@Services/http';
import { mainAxios, mainAxiosToken } from '../libs/axios';
import AsyncStorage from '@react-native-community/async-storage';

/**
 * getListQuestion
 */

export const getListQuestion = () => {
  return Axios.request({
    methodType: "GET",
    url: `/api/v1/advisory`,
    requiresToken: true,
    config: {
      headers: {
        // Authorization: `Bearer ${this.accessToken}`,
        contentType: "application/json",
      },
    },
  });
};

// 20210225 변경함 (아래)
// export const submitAdvisory = (payload) => {
//   return Axios.request({
//     methodType: "POST",
//     url: `/api/v1/advisory/answer`,
//     payload: payload,
//     requiresToken: true,
//     config: {
//       headers: {
//         // Authorization: `Bearer ${this.accessToken}`,
//         contentType: "application/json",
//       },
//     },
//   });
// };

/**
 *
 * @param listAnswer
 *
 [
 userAnswer; // 사용자답안
 userDv; // SRVY0003	사용자구분(1100:내부, 2100:외부)
 userDlcm; // 사용자거래처
 srvyMgmtNo; // 설문관리번호 발생일자(YYYYMMDD)+(SEQ)
 questSeq; // 문항SEQ
 ]
 * @param name // 이름
 * @param company // 회사명
 * @param email // 이메일
 * @returns {Promise<Promise<unknown> | Promise<unknown>>}
 */
export const submitAdvisory = ({
                                 listAnswer= [],
                                 name= '',
                                 company= '',
                                 email= '',
                               }) => {
  return Axios.request({
    methodType: "POST",
    url: `/api/v1/advisory/answer`,
    payload: {
      listAnswer,
      name,
      company,
      email
    },
    requiresToken: true, //
    config: {
      headers: {
        // Authorization: `Bearer ${this.accessToken}`,
        contentType: "application/json",
      },
    },
  });
};



export const result = ({email = ''}) => {
  return Axios.getRequest({
    url: `/api/v1/advisory/results?email=${email}`,
    requiresToken: true
  });
};
