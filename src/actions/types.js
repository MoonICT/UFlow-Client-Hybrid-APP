const types = {
  HOME_COUNT_UP: 'HOME_COUNT_UP',
  HOME_COUNT_DOWN: 'HOME_COUNT_DOWN',
  POPUP_SHOW: 'POPUP_SHOW',
  POPUP_HIDE: 'POPUP_HIDE',

  // Search WH
  SEARCH_OVERLAY_TOGGLE: 'SEARCH_OVERLAY_TOGGLE', // 검색어 입력 오버레이 토클.
  SEARCH_FILTER_UPDATE: 'SEARCH_FILTER_UPDATE', // 필터 리스트 업데이
  SEARCH_SET_FILTER: 'SEARCH_SET_FILTER', // 필터 변경.
  SEARCH_SET_FILTER_CODES: 'SEARCH_SET_FILTER_CODES', // 필터 코드 저장.
  SEARCH_SET_SEARCH_QUERY: 'SEARCH_SET_SEARCH_QUERY', // 컴색어.
  // TODO 추가 타입 작성.
  LOGIN_ACCOUNT: 'LOGIN_ACCOUNT',

  //REGISTER WH
  DATA_IMAGE_REGISTER: 'DATA_IMAGE_REGISTER',
  UPLOAD_IMAGE_REGISTER: 'UPLOAD_IMAGE_REGISTER',
  REMOVE_IMAGE_REGISTER: 'REMOVE_IMAGE_REGISTER',
  CONTRACT_CONDITIONS: 'CONTRACT_CONDITIONS',
  UPDATE_INFO_WH: 'UPDATE_INFO_WH',
  REMOVE_INFO_WH: 'REMOVE_INFO_WH',

  //WARE_HOUSE
  DATA_CONTRACT_MANAGER: 'DATA_CONTRACT_MANAGER',
  FILTER_CONTRACT_MANAGER: 'FILTER_CONTRACT_MANAGER',

  // Global
  SET_LANGUAGE_DATA: 'SET_LANGUAGE_DATA',
  SET_PROGRESS: 'SET_PROGRESS',
};

export default types;
