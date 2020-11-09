/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-04 17:35:26
 * @modify date 2020-11-09 15:29:28
 * @desc [description]
 */

import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  mrL10: {
    marginLeft: 10,
  },
  titleLogin: {
    textAlign: 'center',
    fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: 16,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 1.31,
    color: 'rgba(0, 0, 0, 0.87)',
  },
  formLogin: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  inputs: {
    height: 56,
  },
  inputPass: {
    marginTop: 24,
    marginBottom: 25,
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
    color: '#ffffff',
    marginTop: 27,
  },
  rectangle: {
    width: 1,
    height: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginLeft: 9,
    marginRight: 9,
  },
});
