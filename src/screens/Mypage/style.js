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
  check: {},
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkChildren: {
    marginLeft: 25,
  },
  textCheck: {
    color: '#000000',
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 20,
  },
});
