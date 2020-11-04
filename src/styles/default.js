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
  _tertiary: {
    color: color.warning.main,
  },

  /** Text BTN */
  _textPrimary: {
    backgroundColor: 'white',
    borderColor: color.warning.main,
  },
  _textSecondary: {
    backgroundColor: 'white',
    borderColor: color.secondary.main,
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
