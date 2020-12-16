import {combineReducers} from 'redux';
import HomeReducer from './homeReducer';
import PopupReducer from './popupReducer';
import RegisterWH from './registerWH';
import SearchReducer from './searchReducer';
import loginReducer from './loginReducer';

export default combineReducers({
  // HomeReducer,
  // PopupReducer,
  // SearchReducer,
  home: HomeReducer,
  popup: PopupReducer,
  registerWH: RegisterWH,
  search: SearchReducer,
  login: loginReducer,
  // TODO 분류된 리듀서를 아래에 추가.
});
