/**
 * @create
 * @modify
 * @desc [description]
 */

import { StyleSheet, Dimensions } from 'react-native';
import { color } from '@Themes/colors.js';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  bodyAgreement: {
    backgroundColor: '#fafafa',
    padding: 14,
    maxHeight: 461,
  },
  checkAccept: {
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 23,
    paddingBottom: 23,
  },
  listInfo: {
    padding: 16,
  },
  describe: {
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 12,
    letterSpacing: 0,
    color: color.text.secondary,
    lineHeight: 24,
  },
  infoRegister: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 4,
    marginTop: 16,
  },
  textRegister: {
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 16,
    letterSpacing: 0.15,
    color: color.text.primary,
    lineHeight: 24,
    padding: 16,
    paddingLeft: 14,
  },
  textSuccess: {
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 12,
    letterSpacing: 0.4,
    color: '#4caf50',
    lineHeight: 20,
    paddingLeft: 14,
  },
  btnAttach: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 21,
    alignSelf: 'flex-end',
  },
  textAttach: {
    fontFamily: 'NotoSansCJKkr-파일첨부',
    fontSize: 15,
    letterSpacing: 0,
    color: color.text.primary,
    lineHeight: 26,
    padding: 8,
    paddingLeft: 22,
    paddingRight: 22,
  },
});
