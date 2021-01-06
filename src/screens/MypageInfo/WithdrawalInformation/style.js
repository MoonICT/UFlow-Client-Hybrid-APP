/**
 * @create
 * @modify
 * @desc [description]
 */

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  listBtn: {
    flexDirection: 'row',
    marginBottom: 24,
    marginTop: 100,
  },
  btnCancel: {
    borderColor: 'rgba(0, 0, 0, 0.12)',
    borderWidth: 1,
    borderRadius: 21,
    flex: 1,
    marginRight: 6,
  },
  btnUnsubscribe: {
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
    borderRadius: 21,
    marginLeft: 6,
    flex: 1,
  },
  textBtn: {
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.38)',
    // fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: 15,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 26,
    padding: 8,
  },
  textInput: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});
