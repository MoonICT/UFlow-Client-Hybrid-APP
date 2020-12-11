/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-24 13:57:38
 * @modify date 2020-11-24 18:35:46
 * @desc [description]
 */

import { StyleSheet, Dimensions } from 'react-native';

import { color } from '@Themes/colors';

const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  appBarTitle: {
    fontSize: 16,
    // fontFamily: 'NotoSansCJKkr-Medium',
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
  fontS16: {
    fontSize: 16,
  },
  titleLogin: {
    marginTop: 14,
    alignItems: 'stretch',
  },
  /**Font */
  fontRegular: {
    // fontFamily: 'NotoSansCJKkr-Regular',
  },
  fontMedium: {
    // fontFamily: 'NotoSansCJKkr-Medium',
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

  //--------terms---------
  terms: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: '#fafafa',
    marginTop: 24,
  },
  termsText: {
    fontSize: 16,
  },

  termsList: {
    display: 'flex',
  },
  itemTerm: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTermCL: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
  },
  itemTermMr: {
    marginLeft: 30,
  },

  /** -----------------------Done Register------------------- */
  doneImage: {
    width: '100%',
    minHeight: 181,
    marginTop: 24,
    marginLeft: 16,
    marginRight: 16,
    backgroundColor: color.grey._300,
  },
  contentDone: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentDoneNoti: {
    textAlign: 'center',
    color: color.text.secondary,
  },
});
