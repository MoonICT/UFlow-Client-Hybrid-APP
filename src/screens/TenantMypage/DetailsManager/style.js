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
  infoContent: {
    color: 'rgba(0, 0, 0, 0.54)',
    lineHeight: 20,
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 12,
    // textAlign: 'center',
  },
});
