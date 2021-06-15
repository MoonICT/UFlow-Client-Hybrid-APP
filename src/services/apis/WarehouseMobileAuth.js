import { Axios, parseQuery } from '@Services/http';
import { mainAxios, mainAxiosToken } from '../libs/axios';
import AsyncStorage from '@react-native-community/async-storage';

//Contants
import { TOKEN } from '@Constant';
/**
 * [warehouse-cert-1] Mobile authentication (회원가입 인증 요청)
 * @param mobile 모바일 번호 01012341234
 * @return        : Object: Promise
 * */

export const certMobile = async payload => {
  //const token = await AsyncStorage.getItem(TOKEN);
  return await mainAxios.post(`/api/v1/warehouse/cert/mobile`, payload, {
    headers: {
      //Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
};

/**
 *
 * @param code 인증번호
 * @param mobile 모바일 번호 01012341234
 * @returns {Promise<*>}
 */
export const certMobileConfirm = async payload => {
  //const token = await AsyncStorage.getItem(TOKEN);
  return await mainAxios.post(`/api/v1/warehouse/cert/mobile/confirm`, payload, {
    headers: {
      //Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
};
