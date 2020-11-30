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
  header: {
    position: 'absolute',
    top: 0,
    zIndex: 99,
    flex: 1,
    width: windowWidth,
    backgroundColor: '#ffffff',
  },
  headerChat: {
    padding: 16,
    margin: 0,
    marginTop: -10,
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
    paddingLeft: 6,
  },
  popupBtn: {
    padding: 0,
    paddingLeft: 0,
  },

  btnConfirm: {
    paddingLeft: 16,
    paddingRight: 16,
    marginLeft: 0,
  },
  listBtn: {
    paddingLeft: 16,
    paddingRight: 16,
    marginLeft: 0,
    marginTop: 0,
    marginBottom: 16,
  },
  chatting: {
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
  },
  dateTop: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textDateTop: {
    borderColor: 'rgba(33, 33, 33, 0.12)',
    borderWidth: 1,
    borderRadius: 15,
    color: 'rgba(0, 0, 0, 0.54)',
    padding: 10,
    paddingTop: 4,
    paddingBottom: 3,
    lineHeight: 23,
    fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: 13,
    fontWeight: '500',
  },
  user: {
    flex: 1,
    marginBottom: 16,
  },
  userMe: {
    alignItems: 'flex-end',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    lineHeight: 19,
    fontFamily: 'NotoSansCJKkr-Medium',
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
  body: {
    maxWidth: '70%',
    padding: 16,
    backgroundColor: '#fafafa',
    borderRadius: 21,
    borderTopLeftRadius: 0,
    marginTop: 12,
  },
  bodyMe: {
    backgroundColor: '#ff6d00',
    borderTopLeftRadius: 21,
    borderTopRightRadius: 0,
  },

  content: {
    fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: 14,
    fontWeight: '500',
    color: color.text.primary,
    paddingLeft: 6,
    lineHeight: 20,

  },
  contentMe: {
    color: '#ffffff',
  },
});
