import moment from 'moment';
// import {Axios, parseQuery} from '@Service/http'

export const moneyConvert = (value = 0, unitStr = '원') => {
  if (value === '' || value === undefined) return 0;
  return (
    value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' ' + unitStr
  );
};

export const money = (value, unitStr = '원') => {
  return value ? value.toLocaleString() + ' ' + unitStr : 0 + ' ' + unitStr;
};

export const numberComma = value => {
  return value ? value.toLocaleString() : 0;
};

export const dateStr = (date, format = 'YYYY.MM.DD') => {
  return date ? moment(date).format(format) : '';
};

export const dateStrBar = (date, format = 'YYYY-MM-DD') => {
  return date ? moment(date).format(format) : '';
};

export const toStdCd = (array, stdCd) => {
  console.log(array, 'toStdCd')
  let maps = array
    ? array.filter(item => {
        return item.stdDetailCode === stdCd;
      })
    : [];

  if (maps && maps.length > 0) {
    return maps[0];
  }
  return null;
};

export const toStdName = (array, stdCd) => {
  let maps = array
    ? array.filter(item => {
        return item.stdDetailCode === stdCd;
      })
    : [];

  if (maps && maps.length > 0) {
    return maps[0].stdDetailCodeName;
  }
  return stdCd;
};

export const stdToNumber = value => {
  return parseInt(value, 0);
};

export const numberToStd = value => {
  return value.toString();
};
