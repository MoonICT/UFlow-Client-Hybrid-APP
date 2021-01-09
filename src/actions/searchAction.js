import types from './types';

export function setSearchFilter (payload) {
  return {
    type: types.SEARCH_SET_FILTER,
    payload: payload, // Boolean
  };
}

export function searchToggle (payload) {
  return {
    type: types.SEARCH_OVERLAY_TOGGLE,
    payload: payload, // Boolean
  };
}

export function updateFilter ({ type, value }) {
  return {
    type: types.SEARCH_FILTER_UPDATE,
    payload: {
      type: type, // filter type
      value: value, // filter value
    }, // Object
  };
}

export function setSearchFilterCode (payload) {
  return {
    type: types.SEARCH_SET_FILTER_CODES,
    payload: payload, // Object
  };
}
// TODO 위 형식과 같이 Action 함수 작성.
