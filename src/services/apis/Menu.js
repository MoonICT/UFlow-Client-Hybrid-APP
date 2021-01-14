import { Axios, parseQuery } from '@Services/http';

/**
 * [mang-menu-1] List Menu 서비스 페이지 메뉴
 * @returns {Promise<*>}
 */
export const menus = () => {
  return Axios.getRequest({
    methodType: 'GET',
    url: `/api/v1/mang/menus`,
  });
};

/**
 * [message] 메시지 목록 Key : Value
 * */
export const localization = ({
                               language = '',
                             }) => {
  return Axios.getRequest({
    methodType: 'GET',
    url: `/api/v1/message`,
    language: language,
  });
};
