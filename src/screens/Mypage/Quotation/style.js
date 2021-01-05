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
  optionSelect: {
    minWidth: 190,
    paddingLeft: 0,
    height: 36,
    width: 'auto',
    lineHeight: 20,
    // fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 14,
    fontStyle: 'normal',
    color: 'rgba(0, 0, 0, 0.47)',
  },
  titleCustom: {
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    marginLeft: -16,
    marginRight: -16,
    padding: 16,
    paddingTop: 0,
  },
});
