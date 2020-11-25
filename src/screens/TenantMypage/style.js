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
  textTitleTenant: {
    paddingTop: 0,
    paddingBottom: 16,
  },
  steps: {
    padding: 16,
    paddingBottom: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  step: {
    flexDirection: 'row',
    maxWidth: '33%',
    width: '33%',
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  stepLeft: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },

  textStep: {
    // alignItems: 'center',
    lineHeight: 21,
    textAlign: 'left',
    fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: 14,
    fontStyle: 'normal',
    color: color.text.primary,
    marginBottom: 8,
  },
  numberStep: {
    // flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textNumber: {
    backgroundColor: '#fafafa',
    borderRadius: 50,
    width: 50,
    height: 50,
    lineHeight: 50,
    textAlign: 'center',
    fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: 16,
    fontStyle: 'normal',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  textNumberActive: {
    backgroundColor: '#ff6d00',
    color: '#ffffff',
  },
  rightStep: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  options: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
  optionSelect: {
    minWidth: 110,
    marginLeft: 8,
  },
  select: {
    paddingLeft: 0,
    height: 36,
    width: 'auto',
    lineHeight: 20,
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 14,
    fontStyle: 'normal',
    color: 'rgba(0, 0, 0, 0.47)',
  },
  selectLong: {
    minWidth: 130,
  },
  imgAva: {
    borderRadius: 12,
    maxWidth: '100%',
    height: 190,
    resizeMode: 'cover',
    // flex: 1,
    // aspectRatio: 1,
  },
  info: {
    marginTop: 16,
    marginBottom: 16,
  },
  leftInfo: {
    lineHeight: 20,
    flex: 1,
    fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: 'rgba(0, 0, 0, 0.87)',
    marginBottom: 10,
  },
  rightInfo: {
    lineHeight: 20,
    flex: 2,
    fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 0.87)',
    marginBottom: 10,
  },
  highlightInfo: {
    color: '#ff6d00',
  },
  button: {
    borderRadius: 21,
    borderWidth: 1,
    borderColor: 'rgba(255, 109, 0, 0.5)',
    justifyContent: 'center',
    marginBottom: 24,
    bottom: 0,
    alignItems: 'center',
    padding: 8,
  },
  textButton: {
    lineHeight: 24,
    fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: 14,
    fontWeight: '500',
    color: '#ff6d00',
  },
});
