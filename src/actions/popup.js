/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-06 11:00:16
 * @modify date 2020-11-06 11:20:31
 * @desc [description]
 */

import types from './types';

export function show(payload) {
  return {
    type: types.POPUP_SHOW,
    payload: payload, // Boolean
  };
}
export function hide(payload) {
  return {
    type: types.POPUP_HIDE,
    payload: payload, // Boolean
  };
}
