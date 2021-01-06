import types from './types';

export function loginAccount(isLogin) {
  return {
    type: types.LOGIN_ACCOUNT,
    isLogin: isLogin, // Boolean
  };
}
// TODO 위 형식과 같이 Action 함수 작성.
