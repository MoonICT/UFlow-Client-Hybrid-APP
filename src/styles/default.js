/**
 * Default Style
 * 앱에 사용되는 공통 스타일을 정의한다.
 * 2020.07.05 Deokin.
 * */

import { StyleSheet, Dimensions } from 'react-native';
import { color } from '../themes/colors';
import { theme } from '../themes/index';
const windowWidth = Dimensions.get('window').width;

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
    lineHeight: 21,
  },
  rightTitle: {
    fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: 'right',
    color: 'rgba(0, 0, 0, 0.47)',
  },
  titleDf: {
    marginTop: 20,
    fontSize: 16,
    color: 'black',
  },

  _textDF: {
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 14,
    letterSpacing: 0,
    color: 'rgba(0, 0, 0, 0.87)',
    lineHeight: 21,
  },
  _textDF2: {
    fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    color: 'rgba(0, 0, 0, 0.87)',
    lineHeight: 21,
  },
  _textTitleDF: {
    marginBottom: 20,
    marginTop: 20,
  },
  /**Body */
  // bodyContainer: {
  //   backgroundColor: 'white',
  //   paddingLeft: 16,
  //   paddingRight: 16,
  // },
  // titleBody: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  // },
  // textTitleBody: {
  //   maxWidth: '50%',
  //   color: color.text.primary,
  //   fontFamily: 'NotoSansCJKkr-Medium',
  //   fontSize: 16,
  //   fontWeight: '500',
  //   fontStyle: 'normal',
  //   lineHeight: 21,
  //   paddingTop: 24,
  //   paddingBottom: 24,
  // },
  childTextTitle: {
    color: color.text.primary,
    fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: 16,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 21,
    paddingTop: 24,
    paddingBottom: 24,
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
    height: 42,
    textAlign: 'center',
    color: color.primary.constrast,
    borderRadius: 30,
    flex: 1,
    justifyContent: 'center',
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
    // height: 56,
    lineHeight: 56,
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

  /** Selected*/
  _selected: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 4,
    marginBottom: 18,
  },
  _textSelected: {
    margin: 4,
    color: '#000000',
    borderRadius: 4,
    height: 'auto',
    minHeight: 50,
    lineHeight: 24,
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
  },
  _itemSelected: {
    paddingLeft: 16,
    color: 'red',
    backgroundColor: 'blue',
  },
  _lableSelected: {
    color: color.text.secondary,
    position: 'absolute',
    lineHeight: 14,
    top: -5,
    left: 14,
    zIndex: 99,
    backgroundColor: '#ffffff',
    paddingLeft: 5,
    paddingRight: 5,
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 12,
    fontWeight: 'normal',
    fontStyle: 'normal',
  },

  /**TextField */
  textField: {
    marginBottom: 18,
  },
  _labelTextField: {
    color: color.text.secondary,
    position: 'absolute',
    lineHeight: 14,
    top: -5,
    left: 14,
    zIndex: 99,
    backgroundColor: '#ffffff',
    paddingLeft: 5,
    paddingRight: 5,
    fontFamily: 'NotoSansCJKkr',
    fontSize: 12,
    fontWeight: 'normal',
    fontStyle: 'normal',
  },
  _inputTextField: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 4,
    color: '#000000',
    fontFamily: 'NotoSansCJKkr',
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    padding: 15,
    paddingRight: 50,
    lineHeight: 24,
    minHeight: 36,
  },
  _rightTextField: {
    position: 'absolute',
    right: 0,
    top: 14,
    color: color.text.secondary,
    lineHeight: 24,
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    paddingRight: 14,
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

  /**Popup custom*/
  imagePopup: {
    width: '100%',
    height: 181,
    backgroundColor: '#e0e0e0',
  },
  popup: {
    justifyContent: 'center',
    borderRadius: 8,
  },
  titleDialog: {
    textAlign: 'center',
  },
  contentDialog: {
    color: 'rgba(0, 0, 0, 0.54)',
    lineHeight: 24,
    textAlign: 'center',
    fontSize: 16,
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
    fontFamily: theme.fonts.regular.fontFamily,
    fontSize: 16,
    color: color.text.primary,
    padding: 0,
    margin: 0,
    height: 48,
    justifyContent: 'center',
  },
  _itemList: {
    fontFamily: theme.fonts.regular.fontFamily,
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
    borderBottomWidth: 1,
    borderColor: color.button.default_border,
  },
  _tabItem: {
    color: color.text.secondary,
    fontFamily: theme.fonts.medium.fontFamily,
    fontSize: 14,
    fontWeight: '500',
  },
  _tabItemActive: {
    borderBottomWidth: 2,
    borderColor: color.primary.main,
  },
  _contentGrid: {
    color: color.text.secondary,
    fontFamily: theme.fonts.regular.fontFamily,
    fontSize: 14,
    fontWeight: '500',
  },

  /** App Components**/
  _inputSearch: {
    height: 36,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(151, 151, 151, 0.54)',
    backgroundColor: '#fff',
    color: '#424242',
    justifyContent: 'center',
  },
  _searchIcon: {
    position: 'absolute',
    top: 0,
    fontSize: 24,
    lineHeight: 36,
    margin: 0,
  },
  _searchRightIcon: {
    position: 'absolute',
    top: 0,
    right: 10,
    // fontSize: 24,
    lineHeight: 36,
    margin: 0,
  },

  /** Footer**/
  _wrapperFooter: {
    backgroundColor: color.secondary.main,
    color: 'rgba(255, 255, 255, 0.87)',
    fontFamily: theme.fonts.regular.fontFamily,
    fontSize: 14,
    padding: 16,
  },
  _menuFooter: {
    borderBottomWidth: 1,
    borderColor: '#d2d2d7',
  },
  _menu: {
    backgroundColor: color.secondary.main,
    color: 'rgba(255, 255, 255, 0.87)',
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 0,
    borderWidth: 0,
  },
  _menuTitle: {
    color: 'rgba(255, 255, 255, 0.87)',
    paddingLeft: 0,
    marginLeft: 0,
  },
  _menuItem: {
    color: 'rgba(255, 255, 255, 0.87)',
    paddingLeft: 0,
    marginLeft: 0,
  },

  _mainFooter: {
    marginTop: 24,
    color: 'rgba(255, 255, 255, 0.54)',
  },
  _copyrightFooter: {
    color: 'rgba(255, 255, 255, 0.54)',
    fontFamily: theme.fonts.regular.fontFamily,
    fontSize: 14,
  },
  _titleFooter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  _textTitleFooter: {
    color: '#ffffff',
    lineHeight: 20,
    marginRight: 12,
    marginBottom: 8,
    fontFamily: theme.fonts.regular.fontFamily,
    fontSize: 14,
  },
  _contentFooter: {},
  _textContentFooter: {
    color: 'rgba(255, 255, 255, 0.54)',
    lineHeight: 20,
    fontFamily: theme.fonts.regular.fontFamily,
    fontSize: 12,
  },

  /**the boxes in the component */
  _cards: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    marginBottom: 10,
  },
  _titleWH: {
    backgroundColor: '#f2453d',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    lineHeight: 12,
    color: 'white',
    padding: 10,
    paddingTop: 5,
    paddingBottom: 3,
    fontFamily: 'AppleSDGothicNeo-Regular',
    fontSize: 12,
    fontWeight: 'normal',
    alignSelf: 'flex-start',
  },
  _titleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  _textTitleCard: {
    color: color.text.primary,
    fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: 16,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 21,
    // paddingTop: 8,
    paddingBottom: 6,
  },
  _textRightTitleCard: {
    color: color.text.primary,
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 14,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 20,
    textDecorationLine: 'underline',
  },
  _card: {
    borderWidth: 1,
    borderColor: '#e5e5ea',
    borderRadius: 8,
    marginTop: 12,
    marginBottom: 18,
  },
  _headerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  _headerCardTitle: {
    fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: 16,
    fontWeight: '500',
    color: color.text.primary,
    lineHeight: 21,
    padding: 16,
  },
  rightTitleHeader: {
    marginRight: 16,
  },
  _bodyCard: {
    padding: 16,
  },
  _border0: {
    borderWidth: 0,
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  _borderBottom: {
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  _margin0: {
    marginBottom: 0,
    margin: 0,
  },
  _footerCards: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  /**Button confirm footer*/
  footerRegister: {
    flex: 1,
    backgroundColor: 'white',
    paddingLeft: 14,
    paddingRight: 14,
  },
  btnSubmit: {
    borderRadius: 21,
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
    width: windowWidth - 32,
    justifyContent: 'center',
    marginBottom: 24,
    bottom: 0,
    alignItems: 'center',
    padding: 8,
  },
  activeBtnSubmit: { backgroundColor: '#ff6d00' },
  textSubmit: {
    textAlign: 'center',
    fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: 15,
    fontStyle: 'normal',
    color: 'rgba(0, 0, 0, 0.54)',
    lineHeight: 26,
  },
  textActiveSubmit: {
    color: '#ffffff',
  },

  backgroundGray: {
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
  },

  /**List Item */
  btnItem: {
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  titleItem: {
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 14,
    fontStyle: 'normal',
    color: 'rgba(0, 0, 0, 0.87)',
    lineHeight: 20,
  },
  contentItem: {
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 14,
    fontStyle: 'normal',
    color: 'rgba(0, 0, 0, 0.47)',
    lineHeight: 20,
  },

  /**Search */
  _search: {
    fontFamily: 'NotoSansCJKkr',
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 24,
    padding: 15,
  },

  /**Table */
  _infoTable: {
    margin: 0,
  },
  _rowTable: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
  },
  _leftInfoTable: {
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    flex: 1,
    padding: 6,
    paddingLeft: 16,
    paddingRight: 16,
  },
  _leftTitleTable: {
    lineHeight: 20,
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  _leftContentTable: {
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 9,
    lineHeight: 9,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: '#757575',
  },
  _rightInfoTable: {
    lineHeight: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 2,
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 0.87)',
    padding: 6,
    paddingLeft: 16,
    paddingRight: 16,
  },
  _highlightInfoTable: {
    color: '#ff6d00',
  },
  _completeInfoTable: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
  /**Button */
  _btnOutline: {
    borderColor: '#ff6d00',
    borderWidth: 1,
    borderRadius: 21,
    flex: 1,
    alignItems: 'center',
  },
  _btnInline: {
    alignItems: 'center',
    backgroundColor: '#ff6d00',
    borderRadius: 21,
    flex: 1,
  },
  _textButton: {
    lineHeight: 24,
    fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: 14,
    fontWeight: '500',
    color: '#ff6d00',
    padding: 6,
    paddingRight: 16,
    paddingLeft: 16,
  },
  _textInline: {
    color: '#ffffff',
  },
  /**List Button */
  _listBtn: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
    marginTop: 24,
  },
  _btnLeft: {
    marginRight: 6,
  },
  _btnRight: {
    marginLeft: 6,
  },

  /**Status text */
  _titleStatus: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  _statusProcessing: {
    backgroundColor: '#2196f3',
    borderRadius: 10,
    color: '#ffffff',
    marginLeft: 8,
    marginBottom: 6,
    paddingLeft: 6,
    paddingRight: 6,
    lineHeight: 20,
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 12,
    textAlign: 'center',
  },
  _statusSuccess: {
    backgroundColor: '#4caf50',
  },

  _listElement: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 'auto',
  },
  _element: {
    flex: 1,
    justifyContent: 'center',
  },
});
