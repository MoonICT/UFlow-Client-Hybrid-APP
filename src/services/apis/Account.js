import { Axios, parseQuery } from '@Services/http';
import { mainAxios, mainAxiosToken } from '../libs/axios';
import AsyncStorage from '@react-native-community/async-storage';

//Contants
import { TOKEN } from '@Constant';

export const signIn = async data => {
  // console.log('data==>', data);
  let res = await mainAxios.post('/api/v1/account/login', {
    email: data.email,
    password: data.password,
  });

  return res;
};

export const signUp = async reqBody => {
  return await mainAxios.post('/api/v1/account/signup', {
    email: reqBody.email,
    password: reqBody.password,
    fullName: reqBody.fullName,
    mobile: reqBody.mobile,
    serviceTerms: reqBody.serviceTerms,
    terms: reqBody.terms,
    marketing: reqBody.marketing,
  });
};

export const getMe = async () => {
  const token = await AsyncStorage.getItem(TOKEN);
  return await mainAxios.get('/api/v1/me', {
    headers: {
      Authorization: `Bearer ${token}`,
      // Accept: 'application/json',
    },
  });
};

export const me = () => {
  return Axios.getRequest({
    url: `/api/v1/me`,
    requiresToken: true, // set access_token
    config: {
      headers: {
        contentType: 'application/json'
      }
    }
  })
};

export const editMyInfo = async payload => {
  console.log(payload);
  const token = await AsyncStorage.getItem(TOKEN);
  return await mainAxios.post(`/api/v1/me/update-info`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
};

// export const editMyInfo = (payload) => {
//   return Axios.postRequest({
//     url: '/api/v1/me/update-info',
//     payload: payload,
//     requiresToken: true,
//     });
//   };

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
// export const signUp = reqBody => {
//   return Axios.request({
//     methodType: 'POST',
//     url: `/api/v1/account/signup`,
//     payload: reqBody,
//     config: {
//       headers: {
//         contentType: 'application/json',
//       },
//     },
//   });
// };

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

/**
 * 로그인 애플
 * */
export const getAppleInfo = (data) => {
  return Axios.postRequest({
    url: '/api/v1/apple-login',
    payload: {
      snsType: 'APPL',
      code: data.code,
      idToken: data.idToken,
      state: data.state,
    },
  });
};

/**
 * 로그인 구글/카카오/네이버
 * FACE("페이스북"),
 * GOGL("구글"),프
 * KKAO("카카오톡"),
 * NVER("네이버"),
 * */
export const getSNSInfo = (data) => {
  console.log(data, 'getSNSInfo');
  switch (data.provider) {
    case 'kakao':
      console.log(data, 'getKakaoInfo');
      return Axios.postRequest({
        url: '/api/v1/kakao-login',
        payload: {
          snsType: 'KKAO',
          code: data.code,
          redirectUri: data.redirectUri,
          state: data.state,
        },
      });
    case 'naver':
      console.log(data, 'getNaverInfo');
      return Axios.postRequest({
        url: '/api/v1/naver-login',
        payload: {
          snsType: 'NVER',
          code: data.code,
          redirectUri: data.redirectUri,
          state: data.state,
        },
      });
    case 'google':
      console.log(data, 'getGoogleInfo');
      return Axios.postRequest({
        url: '/api/v1/google-login',
        payload: {
          snsType: 'GOGL',
          code: data.code,
          redirectUri: data.redirectUri,
          state: data.state,
        },
      });
  }
};
