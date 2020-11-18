/**
 * @create
 * @modify
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
    paddingBottom: 24,
  },
  bodyRegister: {flex: 1},
  imageRegister: {
    backgroundColor: '#fafafa',
    height: 238,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageStyle: {
    height: 24,
    width: 24,
  },
  textImage: {
    textAlign: 'left',
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 12,
    fontWeight: '500',
    fontStyle: 'normal',
    color: 'rgba(0, 0, 0, 0.87)',
    lineHeight: 20,
  },
  bgrRegister: {
    backgroundColor: '#fafafa',
    height: 622,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBgr: {
    textAlign: 'left',
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 12,
    fontWeight: '500',
    fontStyle: 'normal',
    color: 'rgba(0, 0, 0, 0.54)',
    lineHeight: 20,
  },
  btnTypeRegister: {
    // alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  textLeftBtn: {
    textAlign: 'left',
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 14,
    fontStyle: 'normal',
    color: 'rgba(0, 0, 0, 0.87)',
    lineHeight: 20,
  },
  rightBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 4,
  },
  textRightBtn: {
    textAlign: 'right',
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 12,
    fontStyle: 'normal',
    color: 'rgba(0, 0, 0, 0.54)',
    lineHeight: 20,
    paddingRight: 20,
  },
  btnSubmit: {
    // flex: 1,
    borderRadius: 21,
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
    width: windowWidth - 32,
    justifyContent: 'center',
    margin: 16,
    marginBottom: 24,
    bottom: 0,
    // marginTop: 148,
    alignItems: 'center',
    padding: 8,
  },
  textSubmit: {
    textAlign: 'center',
    fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: 15,
    fontStyle: 'normal',
    color: 'rgba(0, 0, 0, 0.54)',
    lineHeight: 26,
  },

  ImageUpload: {
    width: '100%',
    height: 238,
  },
});
