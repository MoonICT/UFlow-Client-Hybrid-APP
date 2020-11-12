/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-12 10:38:24
 * @modify date 2020-11-12 16:39:02
 * @desc [description]
 */

import {StyleSheet} from 'react-native';
import {color} from '@Themes/colors.js';

export const styles = StyleSheet.create({
  overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.60)',
    position: 'absolute',
    zIndex: 888888,
  },
  appBar: {
    height: 47,
    backgroundColor: 'transparent',
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
  btnAction: {
    width: 88,
    lineHeight: 30,
    marginRight: 17,
    backgroundColor: color.primary.main,
    fontFamily: 'NotoSansCJKkr-Medium',
  },
  //Slide
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
  //Content
  //-->intro
  intro: {
    height: 349,
    paddingTop: 60,
    paddingRight: 37,
    paddingBottom: 60,
    paddingLeft: 34,
    backgroundColor: color.primary.main,
  },
  //-->main
  mainProduct: {
    height: 549,
  },
  mainCallForBinding: {
    width: 360,
    height: 210,
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: color.tertiary_01.main,
  },
  mainStep: {
    height: 'auto',
  },
});
