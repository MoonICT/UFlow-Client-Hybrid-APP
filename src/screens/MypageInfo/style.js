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
  multiTextField: {
    flexDirection: 'row',
  },
  cardFooter: {
    marginBottom: 0,
    paddingBottom: 0,
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
});
