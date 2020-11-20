import * as homeAction from './homeAction';
import * as popupAction from './popup';
import * as registerAction from './registerWH';
import * as searchAction from './searchAction';

const ActionCreators = Object.assign(
  {},
  homeAction,
  popupAction,
  registerAction,
  searchAction,
  // TODO 각 분류된 액션을 아래에 추가.
);

export default ActionCreators;
