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
  headerChat: {
    padding: 16,
    margin: 0,
    marginTop: 0,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  name: {
    lineHeight: 21,
    fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: 15,
    fontWeight: '500',
    color: color.text.primary,
  },
});
