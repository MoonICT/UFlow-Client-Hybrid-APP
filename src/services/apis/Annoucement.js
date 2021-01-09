import { Axios, parseQuery } from '@Services/http';
import { mainAxios, mainAxiosToken } from '../libs/axios';
import AsyncStorage from '@react-native-community/async-storage';

//Contants
import { TOKEN } from '@Constant';

export const getListAnnoucement = async type => {
  const token = await AsyncStorage.getItem(TOKEN);
  console.log('type :>> ', type);
  let url = type ? type : '';
  return await mainAxios.get(`/api/v1/annoucement/${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
};
