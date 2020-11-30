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
    fontFamily: 'NotoSansCJKkr-Medium',
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
    fontFamily: 'NotoSansCJKkr-Medium',
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
  options: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
  optionSelect: {
    minWidth: 110,
    marginLeft: 8,
  },
  select: {
    paddingLeft: 0,
    height: 36,
    width: 'auto',
    lineHeight: 20,
    fontFamily: 'NotoSansCJKkr-Regular',
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
    fontFamily: 'NotoSansCJKkr-Regular',
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
    fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: 14,
    fontWeight: 'normal',
    textAlign: 'center',
  },
  styleLeftTable: {
    backgroundColor: '#fff',
    paddingLeft: 0,
  },
  styleRightTable: {
    fontFamily: 'NotoSansCJKkr-Medium',
    paddingLeft: 0,
  },
  btnMess: {
    marginBottom: 0,
    flexDirection: 'row',
  },
});
