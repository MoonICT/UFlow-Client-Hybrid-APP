/**
 * Default Style
 * 앱에 사용되는 공통 스타일을 정의한다.
 * 2020.07.05 Deokin.
 * */

import { StyleSheet } from 'react-native';
import { color } from '../themes/colors';

export default StyleSheet.create({
  // 페이지 공통 스타일.
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    margin: 'auto',
    marginRight: 10,
    marginLeft: 10,
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
    height: 48,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    color: 'black',
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
    fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: 14,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 1.71,
    letterSpacing: 0,
    textAlign: 'center',
    color: color.primary.main,
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
  /** Fill Input */
  inputs: {
    height: 56,
    backgroundColor: 'white',
  },
  _fillInput: {
    backgroundColor: color.input.default_bgr,
    color: color.text.secondary,
    borderColor: color.input.default_border,
    borderBottomWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  _fillValueInput: {
    color: color.text.primary,
    paddingBottom: 1,
    paddingTop: 20,
  },

  _activeInput: {
    borderColor: color.primary.main,
  },
  _disableInput: {
    backgroundColor: color.action.disabled_bg,
    color: color.text.disabled,
  },
  _errorInput: {
    borderColor: color.error.main,
  },
  /** Line Input */
  _lineInput: {
    color: color.text.secondary,
    borderColor: color.input.default_border,
    borderBottomWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  _lineDisableInput: {
    color: color.text.disabled,
  },

  /** Outline Input */
  _outLineInput: {
    color: color.text.secondary,
    borderColor: color.input.default_border,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  _outLineValueInput: {
    color: color.text.primary,
    paddingBottom: 1,
    paddingTop: 20,
  },

  _outLineDisableInput: {
    backgroundColor: 'transparent',
    color: color.text.disabled,
  },

  /** Label*/
  _labelInput: {
    color: color.text.secondary,
    position: 'absolute',
    top: 5,
    left: 10,
    zIndex: 1,
  },
  _activeLabelInput: {
    color: color.primary.main,
  },
  _errorLabelInput: {
    color: color.error.main,
  },

  /** Notifi Input*/
  _notifiInput: {
    color: color.text.secondary,
    paddingLeft: 5,
    marginTop: 0,
  },
  _errorNotifiInput: {
    color: color.error.dark,
  },
  //Code input write at here

  /** Dialog **/
  _titleDialog: {
    fontSize: 20,
    color: color.text.primary,
    fontWeight: '500',
    fontFamily: 'NotoSansCJKkr-Medium',
    marginTop: 15,
    marginBottom: 17,
  },
  /** Dialog popup**/
  _buttonPopup: {
    flexDirection: 'row',
    padding: 0,
    margin: 0,
    borderTopWidth: 1,
    borderColor: color.input.default_border,
  },
  _buttonElement: {
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: color.input.default_border,
    justifyContent: 'center',
    flex: 1,
    padding: 0,
    margin: 0,
    borderRadius: 0,
  },

  snackbar: {
    // backgroundColor: color.misc.snackbar,
    color: 'green'
  },

  _labelSwitch: {
    fontFamily: 'NotoSansCJKkr',
    fontSize: 16,
  }
});
