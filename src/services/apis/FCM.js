import {Axios, parseQuery} from '@Services/http';
import {mainAxios} from '../libs/axios';
import AsyncStorage from '@react-native-community/async-storage';

import {TOKEN} from '@Constant';

/**
 *
 * @param token FCM 토큰
 * @param code AND,IOS
 */
export const sendEmail = async ({
                                  token = '',
                                  code = ''
                                }) => {

  const _token = await AsyncStorage.getItem(TOKEN);

  return await mainAxios.post(`/api/v1/fcm`,
    {
      token: token,
      code: code
    },
    {
      headers: {
        Authorization: `Bearer ${_token}`
      }
    });
};
