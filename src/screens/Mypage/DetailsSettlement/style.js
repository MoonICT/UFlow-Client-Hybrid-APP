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
  fee: {
    borderColor: '#e5e5ea',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 16,
  },

  btnProcess: {
    borderColor: 'rgba(19, 19, 20, 0.5)',
    marginBottom: 1,
  },

  toggle: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 0,
    marginLeft: 0,
    height: 58,
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
  },
  textToggle: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 16,
    lineHeight: 21,
    // fontFamily: 'NotoSansCJKkr-Medium',
  },
  footerCheckInfo: {
    padding: 16,
    marginBottom: 14,
  },
  noteToggle: {
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    padding: 16,
  },
  textNote: {
    alignItems: 'center',
    color: '#000000',
    fontSize: 14,
    lineHeight: 21,
    fontFamily: 'NotoSansCJKkr-Bold',
  },
});
