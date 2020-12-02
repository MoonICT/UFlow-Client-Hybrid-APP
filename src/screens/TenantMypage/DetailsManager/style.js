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
  totalFees: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
  },
  textTotalFees: {
    color: color.text.secondary,
    lineHeight: 21,
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 12,
  },
  textTotal: {
    color: color.text.primary,
    lineHeight: 21,
    fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: 16,
    marginLeft: 4,
  },
  textBody: {
    color: color.text.secondary,
    lineHeight: 20,
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 66,
    marginBottom: 66,
  },
  processing: {
    borderColor: '#e5e5ea',
    borderWidth: 1,
    borderRadius: 8,
  },
  textProcessing: {
    color: color.text.primary,
    lineHeight: 21,
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 16,
  },
  popupHeader: {
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    marginLeft: 0,
    marginRight: 0,
    paddingBottom: 16,
    paddingLeft: 24,
  },
  inputStyle: {
    padding: 0,
    paddingLeft: 15,
    marginBottom: -6,
  },
  attachments: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
  },
  infoAttach: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  textAttach: {
    color: color.text.secondary,
    lineHeight: 20,
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  btnRemove: {
    margin: 0,
    marginLeft: 6,
  },
  footerPopup: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  btnPopup: {
    paddingLeft: 12,
    paddingRight: 12,
    lineHeight: 24,
    fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: 14,
  },
});
