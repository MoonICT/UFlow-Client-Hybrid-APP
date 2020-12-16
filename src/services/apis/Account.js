import { Axios, parseQuery } from '@Services/http';
import { mainAxios, mainAxiosToken } from '../libs/axios';

export const signIn = async data => {
  return await mainAxios.post('/api/v1/account/login', {
    email: data.email,
    password: data.password,
  });
};

export const getMe = async () => {
  return await mainAxiosToken.get('/api/v1/me');
};

// export const signIn = ({ email = '', password = '' }) => {
//   console.log('email :>> ', email);
//   return Axios.request({
//     methodType: 'POST',
//     url: '/api/v1/account/login',
//     payload: {
//       email: email,
//       password: password,
//     },
//     config: {
//       headers: {
//         contentType: 'application/json',
//       },
//     },
//   });
// };

/**
 * 회원가입 체크
 * @param reqBody
 * {
 *
 * }
 * @returns
 */
export const signUp = reqBody => {
  return Axios.request({
    methodType: 'POST',
    url: `/api/v1/account/signup`,
    payload: reqBody,
    config: {
      headers: {
        contentType: 'application/json',
      },
    },
  });
};

/**
 * 이메일 체크
 * @param reqBody
 * {
 *   email : ""
 * }
 * @returns {success: true, message: "가입이 가능한 이메일 주소입니다."}
 */
export const validEmail = reqBody => {
  return Axios.request({
    methodType: 'POST',
    url: `/api/v1/account/valid-email`,
    payload: reqBody,
    config: {
      headers: {
        contentType: 'application/json',
      },
    },
  });
};