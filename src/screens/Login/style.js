/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-04 17:35:26
 * @modify date 2020-11-24 18:31:33
 * @desc [description]
 */

import { StyleSheet, Dimensions } from 'react-native';

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
  fontS14: {
    fontSize: 14,
  },
  titleLogin: {
    width: 152,
    height: 36,
    marginTop: 40,
    marginBottom: 37,
    marginLeft: 'auto',
    marginRight: 'auto',
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
  loginBtn: {
    width: '100%',
    color: 'white',
    marginTop: 27,
  },
  snsBtn: {
    width: '100%',
    borderWidth: 1,
    fontSize: 12,
    borderColor: '#d7d7d7',
    marginBottom: 8,
    height: 30,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  snsText: {},
  snsImg: {
    marginRight: 8,
    width: 17,
    height: 17,
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
});
