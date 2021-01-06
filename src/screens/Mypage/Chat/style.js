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
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.06)',
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
    // fontFamily: 'NotoSansCJKkr-Medium',
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
    marginTop: 72,
    // backgroundColor: 'rgba(0, 0, 0, 0.06)',
    // // height: windowHeight
    marginBottom: 50,
  },
  dateTop: {
    marginTop: 26,
    marginBottom: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textDateTop: {
    borderColor: 'rgba(33, 33, 33, 0.12)',
    borderWidth: 1,
    borderRadius: 15,
    color: 'rgba(0, 0, 0, 0.54)',
    padding: 10,
    paddingTop: 5,
    paddingBottom: 2,
    lineHeight: 23,
    // fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: 13,
    fontWeight: '500',
  },
  user: {
    flex: 1,
    marginBottom: 8,
  },
  userMe: {
    alignItems: 'flex-end',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
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
  body: {
    maxWidth: '70%',
    padding: 16,
    backgroundColor: '#fafafa',
    borderRadius: 21,
    borderTopLeftRadius: 0,
    // marginTop: 12,
  },
  bodyMe: {
    backgroundColor: '#ff6d00',
    borderTopLeftRadius: 21,
    borderTopRightRadius: 0,
  },

  content: {
    // fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: 14,
    fontWeight: '500',
    color: color.text.primary,
    paddingLeft: 6,
    lineHeight: 20,
  },
  contentMe: {
    color: '#ffffff',
  },

  footer: {
    backgroundColor: '#fafafa',
    bottom: 0,
    left: 0,
    position: 'absolute',
    width: windowWidth,
    padding: 0,
  },
  footerItem: {
    flexDirection: 'row',
    padding: 16,
    paddingTop: 13,
    paddingBottom: 13,
  },
  inputChat: {
    flex: 1,
  },
  inputType: {
    minHeight: 34,
    padding: 2,
    paddingLeft: 8,
    paddingRight: 24,
    fontSize: 14,
    maxWidth: '100%',
  },
  iconRight: {
    position: 'absolute',
    right: 7,
    top: 5,
  },
  btnAdd: {
    margin: 0,
    marginLeft: 8,
    width: 34,
    height: 34,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 1,
    justifyContent: 'center',
  },
});
