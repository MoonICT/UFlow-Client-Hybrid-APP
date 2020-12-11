/**
 * @create
 * @modify
 * @desc [description]
 */

import { StyleSheet, Dimensions } from 'react-native';
import { color } from '../../themes/colors';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: 'white',
    paddingBottom: 24,
  },
  containerRegister: {
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
  },

  bodyRegister: { flex: 1 },
  imageRegister: {
    backgroundColor: '#fafafa',
    height: 238,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageStyle: {
    height: 24,
    width: 24,
  },
  textImage: {
    textAlign: 'left',
    // fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 12,
    fontWeight: '500',
    fontStyle: 'normal',
    color: 'rgba(0, 0, 0, 0.87)',
    lineHeight: 20,
  },
  textRepresentative: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 99,
    backgroundColor: '#2196f3',
  },
  bgrRegister: {
    backgroundColor: '#fafafa',
    height: 622,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBgr: {
    textAlign: 'left',
    // fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 12,
    fontWeight: '500',
    fontStyle: 'normal',
    color: 'rgba(0, 0, 0, 0.54)',
    lineHeight: 20,
  },
  btnTypeRegister: {
    // alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  textLeftBtn: {
    textAlign: 'left',
    // fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 14,
    fontStyle: 'normal',
    color: 'rgba(0, 0, 0, 0.87)',
    lineHeight: 20,
  },
  rightBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 4,
  },
  textRightBtn: {
    textAlign: 'right',
    // fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 12,
    fontStyle: 'normal',
    color: 'rgba(0, 0, 0, 0.54)',
    lineHeight: 20,
    paddingRight: 20,
  },
  completeText: {
    backgroundColor: '#4caf50',
    borderRadius: 10,
    textAlign: 'right',
    // fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 12,
    fontStyle: 'normal',
    color: '#ffffff',
    lineHeight: 12,
    marginRight: 20,
    padding: 6,
    paddingBottom: 3,
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
    // fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: 15,
    fontStyle: 'normal',
    color: 'rgba(0, 0, 0, 0.54)',
    lineHeight: 26,
  },
  textActiveSubmit: {
    color: '#ffffff',
  },
  ImageUpload: {
    width: '100%',
    height: 238,
  },
  listImage: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    padding: 16,
  },
  itemImage: {
    height: 90,
    width: 104,
    marginBottom: 8,
    marginRight: 8,
    borderRadius: 4,
  },
  threeImage: {
    justifyContent: 'space-between',
  },
  btnRemove: {
    position: 'absolute',
    top: 0,
    right: 8,
    minWidth: 0,
    margin: 0,
  },
  bodyCard: {
    backgroundColor: 'white',
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 24,
    marginBottom: 10,
  },
  titleBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textTitleBody: {
    color: color.text.primary,
    // fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: 16,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 21,
    paddingTop: 24,
    paddingBottom: 24,
  },
  textNote: {
    color: color.primary.main,
  },
  rightTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnAdd: {
    borderWidth: 1,
    borderColor: color.primary.main,
    borderRadius: 18,
  },
  textAdd: {
    color: color.primary.main,
    lineHeight: 24,
    padding: 6,
    paddingLeft: 17,
    paddingRight: 17,
    // fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: 14,
    fontWeight: '500',
    fontStyle: 'normal',
  },
  cards: {
    borderWidth: 1,
    borderColor: '#e5e5ea',
    borderRadius: 8,
    padding: 16,
  },

  footerRegister: {
    flex: 1,
    backgroundColor: 'white',
    paddingLeft: 14,
    paddingRight: 14,
  },
  textFooter: { paddingBottom: 2 },
  searchRegister: {
    height: 56,
    alignSelf: 'center',
    // fontFamily: 'NotoSansCJKkr',
    fontSize: 16,
  },
  footerIntro: {
    marginTop: 0,
  },
  mrBottom0: {
    marginBottom: 0,
  },
  options: {
    flexDirection: 'row',
    marginTop: 20,
  },
  optionCheck: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  labelCheck: {
    color: color.text.primary,
    // fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 14,
    fontStyle: 'normal',
    lineHeight: 20,
    padding: 5,
  },
  optionsFooter: {
    marginBottom: 40,
  },
  // imagePopup: {
  //   width: '100%',
  //   height: 181,
  //   backgroundColor: '#e0e0e0',
  // },
  // popup: {
  //   justifyContent: 'center',
  // },
  // titleDialog: {
  //   textAlign: 'center',
  // },
  // contentDialog: {
  //   color: 'rgba(0, 0, 0, 0.54)',
  //   lineHeight: 24,
  //   textAlign: 'center',
  //   fontSize: 16,
  // },
});
