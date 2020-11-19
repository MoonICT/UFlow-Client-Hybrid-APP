import types from './types';

export function searchToggle(payload) {
  return {
    type: types.SEARCH_OVERLAY_TOGGLE,
    payload: payload, // Boolean
  };
}

// TODO 위 형식과 같이 Action 함수 작성.
