import { Axios, parseQuery } from '@Services/http';
import { mainAxios, mainAxiosToken } from '../libs/axios';
import AsyncStorage from '@react-native-community/async-storage';

//Contants
import { TOKEN } from '@Constant';

// export const page = ({ query = '', startDate = '', endDate = '', size = 20, page = 0, sort = "createdDate,desc" }) => {
//   return Axios.getRequest({
//     url: `/api/v1/fav${parseQuery({
//       query: query,
//       startDate: startDate,
//       endDate: endDate,
//       size: size,
//       page: page,
//       sort: sort
//     })}`,
//     requiresToken: true, // set access_token
//   })
// };

export const page = async () => {
  const token = await AsyncStorage.getItem(TOKEN);
  return await mainAxios.get(`/api/v1/fav`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
};