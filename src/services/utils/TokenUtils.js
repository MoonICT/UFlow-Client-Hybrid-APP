import AsyncStorage from '@react-native-community/async-storage';
import { TOKEN } from '@Constant';
import jwt_decode from 'jwt-decode';
import Moment from 'moment';

export const getToken = async () => {
  const token = await AsyncStorage.getItem(TOKEN);

  if (token) {
    var decoded = jwt_decode(token);

    console.log(decoded, 'TOKEN decoded');

    if (decoded && decoded.exp) {
      console.log(Moment(decoded.exp * 1000).diff(Moment(), 'time') < 0, 'decoded.exp');
      if (Moment(decoded.exp * 1000).diff(Moment(), 'time') < 0) {
        return '';
      }
    }
    return token;
  }
  return '';
};
