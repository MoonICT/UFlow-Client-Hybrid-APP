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
  _fillInput: {
    backgroundColor: color.grey._300,
    color: color.text.secondary,
    borderBottomColor: color.grey._500,
    borderBottomWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  _fillValueInput: {
    color: color.text.primary,
    paddingBottom: 0,
    paddingTop: 20,
  },

  _fillDefaultInput: {
    borderBottomColor: color.grey._500,
    borderBottomWidth: 1,
  },
  _fillActiveInput: {
    borderBottomColor: color.primary.dark,
    borderBottomWidth: 1,
  },

  _fillHasValueInput: {
    backgroundColor: color.grey._300,
    color: color.text.primary,
    borderBottomColor: color.grey._500,
    borderBottomWidth: 1,
    paddingBottom: 0,
  },
  _fillDisableInput: {
    backgroundColor: color.grey._400,
    color: color.text.secondary,
    borderBottomColor: color.grey._500,
    borderBottomWidth: 1,
    paddingBottom: 0,
  },

  _labelInput: {
    color: color.primary.main,
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
  },
  _activeLabelInput: {
    color: color.primary.main,
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
  },
  _fillActiveLabelInput: {
    borderBottomColor: color.primary.dark,
    borderBottomWidth: 1,
  },
  _hasValueLabelInput: {
    color: color.text.secondary,
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
  },
  _notifiInput: {
    color: color.text.secondary,
    paddingLeft: 5,
    marginTop: 0,
  },
  _activeNotifiInput: {
    color: color.error.dark,
    paddingLeft: 5,
    marginTop: 0,
  },
  //Code input write at here
});
