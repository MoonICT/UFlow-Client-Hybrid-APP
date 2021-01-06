import moment from 'moment';
import {Axios, parseQuery} from '@Service/http'

export const money = (value, unitStr = '원') => {
  return value ? (value.toLocaleString() + ' ' + unitStr) : 0 + ' ' + unitStr;
};

export const numberComma = (value) => {
  return value ? value.toLocaleString() : 0;
};

export const dateStr = (date, format = 'YYYY.MM.D') => {
  return date ? moment(date).format(format) : '';
}

export const toStdCd = (array, stdCd) => {

  let maps = array ? array.filter(item => {
    return item.stdDetailCode === stdCd;
  }) : [];

  if(maps && maps.length > 0) {
    return maps[0];
  }
  return null;
}

export const toStdName = (array, stdCd) => {

  let maps = array ? array.filter(item => {
    return item.stdDetailCode === stdCd;
  }) : [];

  if(maps && maps.length > 0) {
    return maps[0].stdDetailCodeName;
  }
  return stdCd;
}

