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
  row: {
    flexDirection: 'row',
  },
  textTitleTenant: {
    paddingTop: 0,
    paddingBottom: 16,
  },
  steps: {
    padding: 16,
    paddingBottom: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  step: {
    flexDirection: 'row',
    maxWidth: '33%',
    width: '33%',
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  stepLeft: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },

  textStep: {
    // alignItems: 'center',
    lineHeight: 21,
    textAlign: 'left',
    // fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: 14,
    fontStyle: 'normal',
    color: color.text.primary,
    marginBottom: 8,
  },
  numberStep: {
    // flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textNumber: {
    backgroundColor: '#fafafa',
    borderRadius: 50,
    width: 50,
    height: 50,
    lineHeight: 50,
    textAlign: 'center',
    // fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: 16,
    fontStyle: 'normal',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  textNumberActive: {
    backgroundColor: '#ff6d00',
    color: '#ffffff',
  },
  rightStep: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  filter: {
    marginTop: 16,
    marginBottom: -16,
  },
  options: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
  optionSelect: {
    minWidth: 110,
    marginLeft: 8,
  },
  optionSelectLeft: {
    marginLeft: 0,
    marginRight: 8,
  },
  hyphen: {
    marginRight: 3,
    marginLeft: -3,
  },
  select: {
    paddingLeft: 0,
    height: 57.9,
    width: 'auto',
    lineHeight: 20,
    // fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 14,
    fontStyle: 'normal',
    color: 'rgba(0, 0, 0, 0.47)',
  },
  selectLong: {
    minWidth: 130,
  },
  avatarHeader: {
    backgroundColor: '#d8d8d8',
    padding: 16,
    width: 50,
    height: 50,
  },
  noticeWaitting: {
    color: 'rgba(0, 0, 0, 0.54)',
    padding: 13,
    paddingBottom: 62,
    paddingTop: 62,
    lineHeight: 20,
    // fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 14,
    fontWeight: 'normal',
    textAlign: 'center',
  },
  btnConfirm: {
    borderColor: 'rgba(255, 109, 0, 0.5)',
    borderWidth: 1,
    borderRadius: 18,
  },
  textConfirm: {
    color: 'rgba(255, 109, 0, 0.5)',
    padding: 6,
    lineHeight: 24,
    // fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: 14,
    fontWeight: 'normal',
    textAlign: 'center',
  },
  styleLeftTable: {
    backgroundColor: '#fff',
    paddingLeft: 0,
  },
  styleRightTable: {
    // fontFamily: 'NotoSansCJKkr-Medium',
    paddingLeft: 0,
  },
  btnMess: {
    marginBottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  searchInput: {
    padding: 4,
    paddingLeft: 15,
    fontSize: 14,
    lineHeight: 20,
  },
  listChecks: {
    flex: 1,
    marginBottom: 8,
  },
  checkItem: {
    flexDirection: 'row',
    flex: 1,
  },
  textCheck: {
    paddingTop: 8,
  },
  checks: {},
  listChecks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 23,
  },
  checkChildren: {
    marginLeft: 25,
  },
  textCheck: {
    color: '#000000',
    // fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 20,
  },
  btnFooter: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  textBtnFooter: {
    color: 'rgba(0, 0, 0, 0.87)',
    // fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 20,
    // textAlign: 'right',
    textDecorationLine: 'underline',
  },
  // listChecks: {
  //   flex: 1,
  //   marginBottom: 8,
  // },
  // checkItem: {
  //   flexDirection: 'row',
  //   flex: 1,
  // },
  // textCheck: {
  //   paddingTop: 8,
  // },
});
