import { Axios, parseQuery } from '@Services/http';

/**
 *
 * @param token FCM 토큰
 * @param code AND,IOS
 */
export const registFCMToken = async ({
                                       token = '',
                                       code = '',
                                       acToken = ''
                                     }) => {
  return Axios.postRequest({
    url: `/api/v1/fcm`,
    payload: {
      token: token,
      code: code
    },
    config: {
      headers: {
        Authorization: `Bearer ${acToken}`
      }
    }
  });
};

