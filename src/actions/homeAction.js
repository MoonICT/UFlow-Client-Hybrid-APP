import types from './types';

export function countUp(payload) {
  return {
    type: types.HOME_COUNT_UP,
    payload: payload, // Boolean
  };
}
export function countDown(payload) {
  return {
    type: types.HOME_COUNT_DOWN,
    payload: payload, // Boolean
  };
}

// TODO 위 형식과 같이 Action 함수 작성.
