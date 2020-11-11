/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-04 17:35:26
 * @modify date 2020-11-11 09:24:37
 * @desc [description]
 */

import {StyleSheet, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: 'white',
  },
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
  sendBTN: {
    width: '100%',
    color: '#ffffff',
    marginTop: 27,
  },
});
