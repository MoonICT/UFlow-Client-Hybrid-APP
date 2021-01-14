/**
 * 번역 언어 표시 함수.
 * 기능1. 서버로부터 빈 값을 받는경우 기본 문자열로 표시.
 * */
export const getMsg = (originData, key, defaultStr) => {
  return originData && originData[key] ? originData[key] : defaultStr;
};
