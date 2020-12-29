import { Axios, parseQuery } from '@Services/http';
import { mainAxios, mainAxiosToken } from '../libs/axios';
import AsyncStorage from '@react-native-community/async-storage';


export const getListAnnoucement = async () => {
    const token = await AsyncStorage.getItem('token');
    return await mainAxios.get('/api/v1/annoucement', {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    });
};