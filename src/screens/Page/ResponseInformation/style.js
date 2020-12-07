/**
 * @create
 * @modify
 * @desc [description]
 */

import { StyleSheet, Dimensions } from 'react-native';
import { color } from '@Themes/colors';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  body: {
    marginBottom: 0,
    borderBottomWidth: 0,
  },
  title: {
    justifyContent: 'flex-start',
    marginTop: 6,
    marginBottom: 18,
  },
  select: {
    paddingLeft: 0,
    height: 56,
    width: 'auto',
    lineHeight: 24,
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 16,
    fontStyle: 'normal',
    color: color.text.secondary,
  },
  hyphen: {
    marginLeft: 2,
    marginRight: 2,
    lineHeight: 56,
  },
  textSubmit: {
    padding: 8,
    color: '#ffffff',
    lineHeight: 26,
    fontSize: 15,
  },

  btnDisabled: {
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
  },
  textDisabled: {
    color: 'rgba(0, 0, 0, 0.38)',
  },
  popupInfo: {
    position: 'absolute',
    top: '100%',
    left: 100,
    maxWidth: windowWidth - 132,
    backgroundColor: '#ffffff',
    borderColor: '#e5e5ea',
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    zIndex: 9,
    shadowColor: 'rgba(0, 0, 0, 0.06)',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 20,
  },
  btnClose: {
    position: 'absolute',
    right: 12,
    top: 12,
    zIndex: 10,
  },
});
