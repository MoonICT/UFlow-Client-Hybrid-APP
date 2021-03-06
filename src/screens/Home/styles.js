/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-12 10:38:24
 * @modify date 2021-01-08 14:54:36
 * @desc [description]
 */

import { Dimensions, StyleSheet } from 'react-native';
import { color } from '@Themes/colors.js';

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
  font15: {
    fontSize: 15,
  },
  font24: {
    fontSize: 24,
  },
  font34: {
    fontSize: 34,
  },
  regular: {
    // fontFamily: 'NotoSansCJKkr-Regular',
  },
  medium: {
    // fontFamily: 'NotoSansCJKkr-Medium',
  },
  bold: {
    fontFamily: 'NotoSansCJKkr-Bold',
  },
  white: {
    color: color.misc.white,
  },
  overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.60)',
    position: 'absolute',
    zIndex: 888888,
  },
  appBar: {
    height: 50,
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
    // fontFamily: 'NotoSansCJKkr-Medium',
  },
  btnAction: {
    borderRadius: 15,
    width: 68,
    height: 30,
    marginRight: 17,
    backgroundColor: color.primary.main,
    // fontFamily: 'NotoSansCJKkr-Medium',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    // marginHorizontal: 10,
  },
  textBtnAction: {
    lineHeight: 23,
    margin: 0,
    color: 'white',
    fontSize: 13,
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
  introHide: {
    marginTop: 0,
    height: 349,
    paddingTop: 80,
    paddingRight: 37,
    paddingLeft: 34,
    backgroundColor: color.primary.main,
  },
  intro: {
    marginTop: 50,
    height: 349,
    paddingTop: 80,
    paddingRight: 37,
    paddingLeft: 34,
    backgroundColor: color.primary.main,
  },
  BoxContentTop:{
    position:'relative',
    top:-50
  },
  introImage: {
    // minWidth:167,
    // maxWidth:167,
    // marginLeft:(windowWidth/2)+84,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf:'center',
    position: 'relative',
    // marginBottom: 40,
    flex:1,
  },
  introFactoryImage: {
    
    minWidth:167,
    maxWidth:167,
    alignContent:'center',
    justifyContent:'center',
    height: 114,
    // position: 'absolute',
    // top: -6,
  },
  BoxSearch:{
    // backgroundColor:'blue'
    alignContent:'center',
    justifyContent:'center'
  },
  introDivider: {
    // width: 257,
    height: 2,
    backgroundColor: color.primary.constrast,
  },
  introInput: {
    width: 265,
    marginRight:10,
    borderBottomWidth:2,
    borderColor:'white',
    // fontFamily: 'NotoSansCJKkr-Bold',
    fontSize: 24,
    letterSpacing: -0.5,
    lineHeight: 32,
    fontWeight: 'bold',
    // lineHeight: 0,
    padding: 0,
    color: color.point.main,
  },
  introRow: {
    display: 'flex',
    position:'relative',
    // marginTop:-50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  introSymbolImage: {
    alignContent:'center',
    alignSelf:'center',
    width: 167,
    top: -6,
    height: 114,
    paddingBottom: 0,
    paddingTop: 0,
    marginTop: 0,
    marginBottom: 0,
  },
  introTitle: {
    fontFamily: 'NotoSansCJKkr-Bold',
    fontSize: 24,
    letterSpacing: -0.5,
    lineHeight: 28,
    color: color.primary.constrast,
  },
  searchInput: {
    // fontFamily: 'NotoSansCJKkr-Bold',
    fontSize: 24,
    // letterSpacing: -0.5,
    // lineHeight: 32,
  },

  introColum: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  introColumText: {
    // fontFamily: 'NotoSansCJKkr-Regular',
    fontWeight: 'normal',
    fontStyle: 'normal',
    color: color.primary.constrast,
    marginLeft: 6,
  },
  introBottom: {
    marginTop: 12,
  },

  //-->main
  mainProduct: {
    // height: 549,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 60,
    // paddingBottom: 60,
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
    // width: windowWidth,
    // height: '100%',
    // paddingBottom: 60,
    // display: 'flex',
    // flexDirection: 'row',
    // alignContent: 'stretch',
    // justifyContent: 'space-between',
    // backgroundColor: 'red',
    // flex: 1,

    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginLeft: -4,
    marginRight: -4,
  },

  mainProductItem: {
    width: '50%',
    paddingLeft: 4,
    paddingRight: 4,
    marginBottom: 8,
  },

  //--->main binding
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

  mainCallForBindingSearch: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 24,
    paddingTop: 15,
    alignItems: 'center',
  },

  mainCallForBindingSearchInput: {
    minWidth: 217,
    height: 42,
    borderRadius: 3,
    backgroundColor: color.misc.white,
    padding: 8,
  },

  mainCallForBindingSearchBTN: {
    minWidth: 99,
    height: 42,
    borderRadius: 21,
    backgroundColor: color.misc.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainCallForBindingSearchTextBTN: {
    color: color.tertiary_01.main,
    fontSize: 15,
  },

  //--->main step
  blueColor: {
    color: color.info.main,
  },
  mainStep: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 60,
  },
  mainStepViewTitle: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 26,
    paddingRight: 26,
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  mainStepTitle: {
    letterSpacing: -0.5,
    // lineHeight: 24,
  },

  carouselStep: {
    height: 500,
    textAlign: 'center',
  },

  //---->main slogan
  mainSlogan: {
    paddingTop: 60,
    paddingBottom: 60,
    paddingLeft: 16,
    paddingRight: 16,
    display: 'flex',
    alignItems: 'center',
  },
  mainSloganTitle: {
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  mainSloganContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  //--->main video
  mainVideo: {
    width: '100%',
    height: 224,
    paddingBottom: 60,
  },
  backgroundVideo: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    width: '100%',
    minWidth: 640,
  },

  //--->main Call
  yellowColor: {
    color: color.point.main,
  },
  mainCall: {
    // height: 163,
    backgroundColor: color.tertiary_02.main,
    paddingBottom: 24,
    paddingTop: 24,
    paddingLeft: 28,
    paddingRight: 28,
    display: 'flex',
    alignItems: 'center',
    marginTop: 80,
  },

  mainCallRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  mainCallTitle: {
    letterSpacing: -0.3,
    color: color.misc.white,
    lineHeight: 24,
  },

  mainCallBTN: {
    // width: 178,
    // height: 42,
    backgroundColor: color.misc.white,
    borderRadius: 21,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  btnMainCall: {
    padding: 8,
    paddingLeft: 22,
    paddingRight: 21,
    lineHeight: 26,
  },
  //--->main Help
  mainHelp: {
    backgroundColor: color.misc.white,
    // paddingTop: 12,
    // paddingBottom: 12,
    overflow: 'hidden',
  },
  mainHelpText: {
    width: '200%',
    color: color.secondary.main,
    marginLeft: 16,
    overflow: 'hidden',
  },

  //---->main App download
  mainAppDowload: {
    height: 190,
    display: 'flex',
    backgroundColor: color.primary.main,
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 32,
    paddingRight: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainAppDowloadTitle: {
    textAlign: 'center',
  },
  appSupport: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  appSupportBTN: {
    width: 142,
    height: 42,
  },
  copyRight: {
    backgroundColor: '#fafafa',
  },
  textCopyRight: {
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.47)',
    letterSpacing: -0.3,
    lineHeight: 13,
    padding: 20,
  },
});
