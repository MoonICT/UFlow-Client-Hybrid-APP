import { Axios, parseQuery } from '@Services/http';
import { mainAxios, mainAxiosToken } from '../libs/axios';
import AsyncStorage from '@react-native-community/async-storage';

/**
 *
 * @param code 0001	긴급차량지원, 0002	물류컨설팅
 * @returns {Promise<Promise<unknown> | Promise<unknown>>}
 * @constructor
 */
export const GetEvs = ({ code = '0001'}) => {
  return Axios.request({
    methodType: "GET",
    url: `/api/v1/evs${parseQuery({code: code})}`,
    requiresToken: true,
    config: {
      headers: {
        // Authorization: `Bearer ${this.accessToken}`,
        contentType: "application/json",
      },
    },
  });
};

export const SendEvs = ({ email = "", content = "" }) => {
  return Axios.request({
    methodType: "POST",
    url: `/api/v1/evs`,
    payload: {
      email,
      content,
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





// export const getListQuestion = () => {
//   return Axios.request({
//     methodType: "GET",
//     url: `/api/v1/advisory`,
//     requiresToken: true,
//     config: {
//       headers: {
//         // Authorization: `Bearer ${this.accessToken}`,
//         contentType: "application/json",
//       },
//     },
//   });
// };


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


// export const result = ({email = ''}) => {
//   return Axios.getRequest({
//     url: `/api/v1/advisory/results?email=${email}`,
//     requiresToken: true
//   });
// };
