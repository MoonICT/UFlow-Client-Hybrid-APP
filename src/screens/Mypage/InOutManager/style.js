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
  infoContent: {
    color: 'rgba(0, 0, 0, 0.54)',
    lineHeight: 20,
    fontSize: 14,
    margin:0,
    padding:0,
    marginBottom:16,
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
    // fontFamily: 'NotoSansCJKkr-Regular',
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
    // fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: 14,
  },
  listBtnProcess: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  btnProcess: {
    borderColor: 'rgba(19, 19, 20, 0.5)',
    marginBottom: 1,
  },
  viewProgress: {
    flexDirection: 'column',
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
  },
  footerCheckInfo: {
    padding: 16,
    marginBottom: 14,
  },
  popup: {
  }
});
