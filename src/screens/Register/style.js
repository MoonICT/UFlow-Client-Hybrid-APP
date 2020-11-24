/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-24 13:57:38
 * @modify date 2020-11-24 15:24:55
 * @desc [description]
 */

import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  appBarTitle: {
    fontSize: 16,
    fontFamily: 'NotoSansCJKkr-Medium',
    color: 'rgba(0, 0, 0, 0.76)',
  },
  container: {
    width: windowWidth,
    height: '100%',
    backgroundColor: 'white',
  },
  content: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  mrL10: {
    marginLeft: 10,
  },
  fontS14: {
    fontSize: 14,
  },
  titleLogin: {
    marginTop: 14,
    alignItems: 'stretch',
  },
  /**Font */
  fontRegular: {
    fontFamily: 'NotoSansCJKkr-Regular',
  },
  fontMedium: {
    fontFamily: 'NotoSansCJKkr-Medium',
  },
  fontBold: {
    fontFamily: 'NotoSansCJKkr-Bold',
  },

  formLogin: {
    // paddingLeft: 16,
    // paddingRight: 16,
  },

  inputPass: {
    marginTop: 18,
  },
  plusFormLogin: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rememberLogin: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  ortherLink: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  forgot: {
    justifyContent: 'center',
    marginTop: 12,
  },
  loginBtn: {
    width: '100%',
    color: 'white',
    marginTop: 27,
  },
  rectangle: {
    width: 1,
    height: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginLeft: 9,
    marginRight: 9,
  },

  ask: {
    color: 'rgba(0, 0, 0, 0.54)',
  },

  terms: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: 'gray',
    marginTop: 24,
  },
  termsText: {
    fontSize: 16,
  },
});
