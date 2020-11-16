/**
 * Default Style
 * 앱에 사용되는 공통 스타일을 정의한다.
 * 2020.07.05 Deokin.
 * */

import {StyleSheet} from 'react-native';
import {color} from '../themes/colors';
import {theme} from '../themes/index';

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
  titleDf: {
    marginTop: 20,
    fontSize: 16,
    color: 'black',
  },
  /** Divider */
  divider: {
    width: '100%',
    height: 1,
    opacity: 0.23,
    backgroundColor: '#ffffff',
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
    color: 'green',
  },

  _labelSwitch: {
    fontFamily: 'NotoSansCJKkr',
    fontSize: 16,
  },

  _pagination: {
    fontFamily: 'NotoSansCJKkr',
    fontSize: 14,
  },

  /** AppBar**/
  tabBar: {
    flex: 1,
    margin: 'auto',
    justifyContent: 'space-around',
    alignItems: 'center',
    textAlign: 'center',
    height: 'auto',
  },
  _itemBar: {
    // color: 'red',
    opacity: 0.6,
    alignItems: 'center',
  },
  _itemBarActive: {
    opacity: 1,
  },
  _rightTitle: {
    color: 'rgba(255, 109, 0, 0.87)',
    marginRight: 0,
    textAlign: 'right',
    fontSize: 16,
    fontFamily: 'NotoSansCJKkr',
    fontWeight: '500',
  },
  _leftTitle: {
    color: 'rgba(255, 109, 0, 0.87)',
    textAlign: 'left',
    fontSize: 16,
    fontFamily: 'NotoSansCJKkr',
    fontWeight: '500',
  },
  _contentApp: {
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 0,
    marginRight: 0,
  },

  /** toggle Button**/
  _toggleButton: {
    borderWidth: 1,
    borderColor: color.button.default_border,
    width: 48,
    height: 48,
  },
  _toggleBtnActive: {
    backgroundColor: color.button.active,
  },

  /** Breadcrumbs**/
  _breadcrumb: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  _itemBreadcrumb: {
    fontFamily: 'NotoSansCJKkr',
    fontSize: 16,
    color: color.text.primary,
    flexDirection: 'row',
    alignItems: 'center',
  },
  _iconBreadcrumb: {
    color: color.text.secondary,
    padding: 0,
    marginLeft: 0,
    minWidth: 20,
    maxWidth: 25,
    margin: 'auto',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  _activeIconBreadcrumb: {
    color: color.text.primary,
  },
  _separator: {
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 14,
    color: color.text.secondary,
    paddingLeft: 10,
    paddingRight: 10,
    // lineHeight: 1.43,
  },

  /** Accordion**/
  _titleAccordion: {
    fontFamily: 'AppleSDGothicNeo-Regular',
    fontSize: 15,
    color: '#000000',
  },

  _contentAccordion: {
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 16,
    color: '#000000',
  },

  /** SpeedDial**/
  _wrapperDial: {
    backgroundColor: color.misc.backdrop,
  },
  _btnDial: {
    backgroundColor: color.secondary.main,
  },

  /** List**/
  _list: {
    backgroundColor: color.primary.constrast,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
  },
  _titleList: {
    fontFamily: theme.fonts.regular,
    fontSize: 16,
    color: color.text.primary,
    padding: 0,
    margin: 0,
    height: 48,
    justifyContent: 'center',
  },
  _itemList: {
    fontFamily: theme.fonts.regular,
    fontSize: 16,
    color: color.text.primary,
    padding: 0,
    margin: 0,
    height: 48,
    justifyContent: 'center',
    paddingLeft: 32,
  },

  /** Table**/
  _table: {
    backgroundColor: color.misc.white,
    borderRadius: 4,
  },
  _headerTable: {
    backgroundColor: '#fafafa',
    fontFamily: 'AppleSDGothicNeo-Medium',
    fontSize: 14,
    color: color.text.primary,
    fontWeight: '500',
  },
  _tableRow: {},
  _borderTableRow: {
    borderColor: '#e0e0e0',
    borderTopWidth: 1,
  },

  /** Tab Grid**/
  _tabGrid: {
    flexDirection: 'row',
    maxWidth: '100%',
  },
  _tabItem: {
    color: color.text.secondary,
    fontFamily: theme.fonts.medium,
    fontSize: 14,
    fontWeight: '500',
    borderBottomWidth: 1,
    borderColor: color.button.default_border,
  },
  _tabItemActive: {
    borderColor: color.primary.main,
  },
  _contentGrid: {
    color: color.text.secondary,
    fontFamily: theme.fonts.regular,
    fontSize: 14,
    fontWeight: '500',
  },
});
