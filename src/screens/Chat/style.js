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
  listUser: {
    flexDirection: 'row',
  },
  btnUser: {
    flex: 1,
    width: windowWidth,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 45,
  },
  name: {
    lineHeight: 21,
    // fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: 15,
    fontWeight: '500',
    color: color.text.primary,
  },
  user: {
    flex: 1,
    marginBottom: 4,
    marginTop: 4,
  },
  titleUser: {
    flexDirection: 'row',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    lineHeight: 19,
    // fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 0.54)',
    paddingLeft: 6,
  },
  status: {
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: '#4caf50',
    borderWidth: 2,
    borderColor: '#fff',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  btnDelete: {
    backgroundColor: '#ff6d00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconDelete: {
    fontSize: 24,
    color: '#ffffff',
    padding: 30,
  },
});
