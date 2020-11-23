/**
 * @create
 * @modify
 * @desc [description]
 */

import { StyleSheet, Dimensions } from 'react-native';
import { color } from '@Themes/colors.js';

export const styles = StyleSheet.create({
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
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 14,
    fontStyle: 'normal',
    lineHeight: 20,
    padding: 5,
  },
  optionsFooter: {
    marginBottom: 40,
  },
});
