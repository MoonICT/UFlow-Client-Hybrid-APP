import { Axios, parseQuery } from '@Services/http';
import { mainAxios, mainAxiosToken } from '../libs/axios';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export const createQuestion = async data => {
  console.log('formData :>> ', data);
  return await mainAxios.post('/api/v1/question/create', { email: data.email, content: data.content });
};