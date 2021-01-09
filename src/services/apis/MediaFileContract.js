/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2021-01-09 16:20:38
 * @modify date 2021-01-09 16:57:39
 * @desc [description]
 */

// import { Axios } from '@Services/http';
import { mainAxios } from '../libs/axios';
import AsyncStorage from '@react-native-community/async-storage';

//Contants
import { TOKEN } from '@Constant';

export const getMediaFile = async type => {
  const token = await AsyncStorage.getItem(TOKEN);
  return await mainAxios.get(`/api/v1/contract/${type}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
