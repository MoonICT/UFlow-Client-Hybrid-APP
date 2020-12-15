/**
 * Http service with axios
 * Created by Deokin on 2020-10-28.
 */
// Global Imports
import axios, { AxiosResponse } from 'axios';
// import getConfig from 'next/config';
// import Cookies from 'js-cookie';

// Local Imports

// const {
//   publicRuntimeConfig: {
//     env: {
//       API_SERVER_ADDRESS,
//       API_CLIENT_ADDRESS,
//       ACCESS_TOKEN_NAME,
//       LANGUAGE_KEY_NAME,
//     },
//   },
// } = getConfig();

// TODO  언어 쿠키 설정 필요.
// const lang = Cookies.get(LANGUAGE_KEY_NAME) ? Cookies.get(LANGUAGE_KEY_NAME) : 'ko-KR'

// eslint-disable-next-line no-underscore-dangle
const _axios = axios.create({
  // baseURL: API_SERVER_ADDRESS,
});

const Axios = {
  request: async parameter => {
    const {
      methodType,
      url,
      payload,
      requiresToken,
      language,
      config,
    } = parameter;

    return new Promise((resolve, reject) => {
      // axios request default options
      const headers = config || { headers: {} };

      // if accept language
      if (language) {
        headers['accept-language'] = language;
      }

      // if API endpoint requires a token
      if (requiresToken) {
        // const acToken = Cookies.get(ACCESS_TOKEN_NAME);
        // headers.Authorization = `Bearer ${acToken}`;
      }

      // console.log('API_SERVER_ADDRESS', API_SERVER_ADDRESS);
      // Request with axios
      _axios
        .request({
          url,
          method: methodType,
          data: payload,
          headers,
        })
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
};

// Parse Query String
const parseQuery = params => {
  if (typeof params === 'object') {
    return (
      '?' +
      Object.keys(params)
        .reduce(function(a, k) {
          a.push(k + '=' + encodeURIComponent(params[k]));
          return a;
        }, [])
        .join('&')
    );
  } else {
    return '';
  }
};

export { Axios, parseQuery };
