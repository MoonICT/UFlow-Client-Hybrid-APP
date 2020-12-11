/**
 * @create
 * @modify
 * @desc [description]
 */

import { StyleSheet, Dimensions } from 'react-native';
import { color } from '../../themes/colors';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: 'white',
    paddingBottom: 24,
  },
  row: {
    flexDirection: 'row',
  },
  textTitle: {
    paddingTop: 0,
    paddingBottom: 18,
  },
  options: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginTop: 8,
    marginBottom: 8,
  },
  textOption: {
    color: 'rgba(255, 109, 0, 0.5)',
    padding: 6,
    lineHeight: 24,
    // fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: 14,
    fontWeight: 'normal',
    textAlign: 'center',
  },

  attach: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  infoAttach: {
    borderColor: '#d7d7d7',
    borderWidth: 1,
    borderRadius: 4,
    flex: 1,
    marginRight: 12,
  },
  textInfoAttach: {
    color: color.text.primary,
    padding: 14,
    lineHeight: 24,
    // fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 16,
    fontWeight: 'normal',
  },
  btnAttach: {
    borderColor: '#d7d7d7',
    borderWidth: 1,
    borderRadius: 21,
    alignItems: 'flex-end',
  },
  textBtnAttach: {
    color: color.text.primary,
    padding: 22,
    paddingTop: 8,
    paddingBottom: 8,
    lineHeight: 24,
    // fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: 15,
    fontWeight: 'normal',
  },
  completeAttach: {
    color: '#4caf50',
    lineHeight: 20,
    letterSpacing: 0.4,
    // fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: 12,
    fontWeight: 'normal',
    marginBottom: 200,
  },

  footer: {
    backgroundColor: '#fafafa',
    borderTopWidth: 1,
    borderColor: '#d7d7d7',
    // marginLeft: -16,
    // marginRight: -16,
    padding: 16,
  },
  btnFooter: {
    marginTop: 35,
  },

  textTitleFooter: {
    // margin: 16,
    marginBottom: 16,
  },
  // checks: { padding: 16 },

  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 23,
    marginBottom: 8,
  },
  checkChildren: {
    marginLeft: 25,
  },
  textCheck: {
    color: '#000000',
    // fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 20,
  },
  textBtnFooter: {
    padding: 8,
    lineHeight: 26,
  },
});
