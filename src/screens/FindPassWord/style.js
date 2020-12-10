/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-04 17:35:26
 * @modify date 2020-11-05 18:30:20
 * @desc [description]
 */

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  mrL10: {
    marginLeft: 10,
  },
  titleLogin: {
    fontSize: 36,
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 40,
    // fontWeight: 'bold',
    fontFamily: 'NotoSansCJKkr-Bold',
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

  body: {
    paddingRight: 16,
    paddingLeft: 16,
  },
  textConfirm: {
    color: '#ffffff',
    lineHeight: 26,
    fontSize: 15,
    padding: 8,
  },
});
