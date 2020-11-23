import types from './types';

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

// TODO 위 형식과 같이 Action 함수 작성.
