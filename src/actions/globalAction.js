import types from './types';

export function setLangData (payload) {
  return {
    type: types.SET_LANGUAGE_DATA,
    payload: payload,
  };
}

export function setProgress (payload) {
  return {
    type: types.SET_PROGRESS,
    payload: payload,
  };
}

// TODO 위 형식과 같이 Action 함수 작성.
