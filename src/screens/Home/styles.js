/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-12 10:38:24
 * @modify date 2020-11-17 08:38:29
 * @desc [description]
 */

import {Dimensions, StyleSheet} from 'react-native';
import {color} from '@Themes/colors.js';

const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  font9: {
    fontSize: 9,
  },
  font14: {
    fontSize: 14,
  },
  font16: {
    fontSize: 16,
  },
  font24: {
    fontSize: 24,
  },
  regular: {
    fontFamily: 'NotoSansCJKkr-Regular',
  },
  medium: {
    fontFamily: 'NotoSansCJKkr-Medium',
  },
  bold: {
    fontFamily: 'NotoSansCJKkr-Bold',
  },
  overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.60)',
    position: 'absolute',
    zIndex: 888888,
  },
  appBar: {
    height: 47,
    // backgroundColor: 'transparent',
    backgroundColor: color.misc.black,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999999,
  },
  actionBar: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notifiAppbar: {
    color: 'white',
    letterSpacing: -0.3,
    fontFamily: 'NotoSansCJKkr-Medium',
  },
  btnAction: {
    width: 88,
    lineHeight: 30,
    marginRight: 17,
    backgroundColor: color.primary.main,
    fontFamily: 'NotoSansCJKkr-Medium',
  },
  //====================Slide==============================
  carousel: {
    height: 640,
  },
  slide: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    marginVertical: 32,
  },
  content: {
    position: 'absolute',
    zIndex: 888888,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    letterSpacing: -0.3,
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    height: 100,
    display: 'flex',
    flexWrap: 'wrap',
  },
  title: {
    width: 290,
    fontSize: 34,
    color: 'white',
    letterSpacing: -2,
    textAlign: 'center',
    fontFamily: 'NotoSansCJKkr-Bold',
  },
  //=====================Content=========================
  //-->intro
  intro: {
    height: 349,
    paddingTop: 60,
    paddingRight: 37,
    paddingLeft: 34,
    backgroundColor: color.primary.main,
  },
  introImage: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 40,
  },
  introFactoryImage: {
    width: 167,
    height: 114,
    position: 'absolute',
    top: -6,
  },
  introSymbolImage: {
    width: 91,
    height: 122,
  },
  introTitle: {
    fontFamily: 'NotoSansCJKkr-Bold',
    fontSize: 24,
    letterSpacing: -0.5,
    lineHeight: 28,
    color: color.primary.constrast,
  },
  introRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  introColum: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  introColumText: {
    fontFamily: 'NotoSansCJKkr-Regular',
    fontWeight: 'normal',
    fontStyle: 'normal',
    color: color.primary.constrast,
    marginLeft: 6,
  },
  introDivider: {
    width: 257,
    height: 2,
    backgroundColor: color.primary.constrast,
  },
  introBottom: {
    marginTop: 12,
  },

  //-->main
  mainProduct: {
    height: 549,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 60,
    paddingBottom: 60,
  },
  mainProductTitle: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  mainProductTitleName: {
    letterSpacing: -0.5,
    lineHeight: 30,
    margin: 0,
  },
  mainProductTitleContent: {
    letterSpacing: -0.3,
    marginBottom: 0,
    textAlign: 'left',
  },
  mainProductMore: {
    width: windowWidth,
    height: 'auto',
  },
  mainProductSeeMoreBTN: {
    width: 173,
    height: 36,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    lineHeight: 36,
    color: color.primary.main,
    marginTop: 20,
    marginBottom: 24,
  },
  mainProductSeeMoreTextBTN: {
    color: color.primary.main,
  },

  mainProductList: {
    paddingBottom: 60,
  },

  //--->binding
  mainCallForBinding: {
    width: 360,
    height: 210,
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: color.tertiary_01.main,
  },
  mainCallForBindingTitle: {
    color: color.misc.white,
    letterSpacing: -0.3,
    lineHeight: 20,
  },
  mainCallForBindingTitleSub: {
    color: color.point.main,
  },
  mainCallForBindingContent: {
    letterSpacing: -0.3,
    color: color.misc.white,
  },

  //--->main step
  blueColor: {
    color: color.info.main,
  },
  mainStep: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  mainStepTitle: {
    letterSpacing: -0.5,
  },
  //---->main slogan
  mainSlogan: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  mainSloganTitle: {
    letterSpacing: -0.5,
  },
  mainSloganContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
});
