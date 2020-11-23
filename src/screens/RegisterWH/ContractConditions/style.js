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
  container: {
    flex: 1,
    paddingRight: 5,
    paddingLeft: 5,
  },
  inputIntro: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    lineHeight: 24,
    letterSpacing: 0.15,
    padding: 16,
    paddingRight: 24,
    color: 'rgba(0, 0, 0, 0.54)',
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 16,
  },
  inputLoction: {
    height: 56,
    marginTop: 24,
    fontFamily: 'NotoSansCJKkr',
  },
  titleRadio: {
    paddingBottom: 0,
  },
});
