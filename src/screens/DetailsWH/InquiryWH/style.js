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
  tabBar: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
  },
  btnTabBar: {
    borderColor: '#ff6d00',
    borderBottomWidth: 2,
  },
  textTabBar: {
    fontFamily: 'NotoSansCJKkr',
    fontSize: 14,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 24,
    padding: 14,
  },
  bodyTabBar: {
    backgroundColor: 'white',
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 24,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    paddingRight: 5,
    paddingLeft: 5,
  },
  textField: {
    marginBottom: 30,
  },
  textsFooter: {
    marginBottom: 40,
  },
  textFooter: {
    color: color.text.secondary,
    lineHeight: 20,
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 12,
    fontWeight: '500',
    fontStyle: 'normal',
  },
});
