import {combineReducers} from 'redux';
import HomeReducer from './homeReducer';
import PopupReducer from './popupReducer';
import RegisterWH from './registerWH';

export default combineReducers({
  home: HomeReducer,
  popup: PopupReducer,
  registerWH: RegisterWH,
  // TODO 분류된 리듀서를 아래에 추가.
});
