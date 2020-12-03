/**
 * @create
 * @modify
 * @desc [description]
 */

import { StyleSheet } from 'react-native';
import { color } from '@Themes/colors';

export const styles = StyleSheet.create({
  content: {
    backgroundColor: '#fafafa',
    padding: 16,
  },
  textContent: {
    marginBottom: 15,
    color: 'rgba(0, 0, 0, 0.87)',
    lineHeight: 20,
    letterSpacing: 0,
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 14,
    fontWeight: 'normal',
  },
  bodyCard: {
    backgroundColor: 'white',
    paddingLeft: 16,
    paddingRight: 16,
    // paddingBottom: 24,
    marginBottom: 10,
  },

  titleBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textTitleBody: {
    color: color.text.primary,
    fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: 16,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 21,
    paddingTop: 24,
    paddingBottom: 24,
  },
});
