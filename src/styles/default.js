/**
 * Default Style
 * 앱에 사용되는 공통 스타일을 정의한다.
 * 2020.07.05 Deokin.
 * */

import {StyleSheet} from 'react-native';
import {color} from '../themes/colors';

export default StyleSheet.create({
  // 페이지 공통 스타일.
  container: {
    flex: 1,
  },
  btn: {
    marginBottom: 12,
    backgroundColor: '#e1e1e1',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
    textAlign: 'center',
  },
  header: {
    height: 64,
    backgroundColor: color.primary.main,
  },
  /** Container button */
  containerBTN: {
    width: 120,
    height: 36,
    textAlign: 'center',
    color: color.primary.constrast,
    borderRadius: 30,
  },
  //---> Background
  _primary: {
    backgroundColor: color.primary.main,
  },
  _secondary: {
    backgroundColor: color.secondary.main,
  },
  _error: {
    backgroundColor: color.error.main,
  },
  _success: {
    backgroundColor: color.success.main,
  },
  _tertiary: {
    color: color.tertiary_01.main,
  },
  _warning: {
    color: color.warning.main,
  },

  /** Text BTN */
  _textPrimary: {
    backgroundColor: 'white',
    color: color.warning.main,
  },
  _textSecondary: {
    backgroundColor: 'white',
    color: color.secondary.main,
  },
  _textDisabled: {
    backgroundColor: color.action.disabled_bg,
    color: color.action.disabled,
  },

  /** Ouline BTN */
  _oulinePrimary: {
    backgroundColor: 'white',
    borderColor: color.warning.main,
  },
  _oulineSecondary: {
    backgroundColor: 'white',
    borderColor: color.secondary.main,
  },
  _oulineDisabled: {
    backgroundColor: color.action.disabled_bg,
    color: color.action.disabled,
  },
  //--> Vertical group
  _oulinePrimaryActive: {
    color: 'white',
    backgroundColor: color.primary.dark,
  },
  _oulineWarningActive: {
    color: color.warning.dark,
    backgroundColor: color.warning.background,
  },

  /** Input */
  //Code input write at here
});
