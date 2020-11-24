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
  imageMap: {
    width: windowWidth,
    height: windowHeight - 48,
  },
  location: {
    position: 'absolute',
    top: 12,
    left: '15%',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
  },
  textLocation: {
    color: 'rgba(0, 0, 0, 0.54)',
    paddingRight: 13,
    lineHeight: 23,
    letterSpacing: 0,
    fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
  },
  icon: {
    margin: 0,
    marginLeft: 5,
    marginRight: 4,
  },
});
