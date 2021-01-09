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
  bgrImage: {
    width: windowWidth,
    position: 'absolute',
    height: windowHeight,
  },
  contentCenter: {
    textAlign: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    alignItems: 'center',
    // marginTop: -100,
  },
  contentAlignLeft: {
    marginTop: -100,
    marginTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
  },
  inputNomarl: {
    height: 56,
    fontSize: 16,
    borderColor: '#d7d7d7',
    borderWidth: 1,
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    marginTop: 20,
    color: 'white',
  },
  styleH3: {
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: -0.5,
    textAlign: 'center',
    color: 'white',
  },
  styleTextNomarl: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 24,
    marginTop: 15,
  },
  styleTextTitleNomarl: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    marginTop: 15,
  },
  styleButton: {
    alignItems: 'center',
    backgroundColor: color.primary.main,
    borderRadius: 21,
    height: 42,
    marginTop: 25,
    paddingTop:2,
  },
  textButton: {
    color: 'white',
    fontSize: 15,
  },
  contentProgress: {
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    position: 'absolute',
    flex: 1,
    left: 0,
    right: 0,
    bottom: 50,
    flexDirection: 'row',
    height: 80,
    alignItems: 'center',
  },
  lineDefault: {
    width: windowWidth - 140,
    height: 4,
    borderRadius: 4,
    borderColor: '#d8d8d8',
    borderWidth: 1,
    marginRight: 30,
  },
  lineMove: {
    backgroundColor: '#ff6d00',
    height: 4,
    marginLeft:-1,
    borderRadius:4,
    marginTop: -1,
  },
  valueProgress: {
    fontSize: 14,
    color: 'white',
    marginBottom: 10,
  },
  itemNavigation: {
    width: 32,
    height: 32,
    borderColor: 'white',
    borderWidth: 1,
    fontSize: 16,
    paddingRight: 0,
    paddingLeft: 5,
  },
  itemNavigationNone: {
    width: 32,
    height: 32,
    borderColor: 'rgba(215, 215, 215, 0.5)',
    borderWidth: 1,
    fontSize: 16,
    paddingRight: 0,
    paddingLeft: 5,
  },
  boxBottom: {
    maxWidth: 70,
    height: 32,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
  },
  inputCheckbox: {
    width: 20,
    height: 20,
    borderColor: 'white',
    backgroundColor:'white',
    flex:1

  },
  // ====
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
    backgroundColor: 'red',
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
