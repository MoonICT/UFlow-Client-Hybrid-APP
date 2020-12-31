/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-09 15:58:28
 * @modify date 2020-12-31 14:23:46
 * @desc [description]
 */

import { StyleSheet } from 'react-native';
import { color } from '@Themes/colors';

export const styles = StyleSheet.create({
  /************* Commons **************/
  // Fonts
  font9: {
    fontSize: 9,
    lineHeight: 13,
  },
  font14: {
    fontSize: 14,
    lineHeight: 19,
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
  fontColor1: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
  fontColor2: {
    color: 'rgba(0, 0, 0, 0.87)',
  },
  blackColor: {
    color: color.misc.black,
  },
  // Colors
  primaryColor: {
    color: color.primary.main,
  },
  blueColor: {
    color: color.tertiary_02.main,
  },
  greenColor: {
    color: color.success.main,
  },
  redColor: {
    color: color.secondary.main,
  },
  grayColor: {
    color: color.grey._600,
  },
  browColor: {
    color: color.brow.main,
  },

  /************* Margin **************/
  mrb12: {
    marginBottom: 12,
  },
  mrt2: {
    marginTop: 2,
  },

  /************* Layout **************/
  container: {
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  shadow: {
    // for iOS
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    // for Android
    elevation: 5,
  },
  innerWrap: {
    flex: 1,
    flexDirection: 'column',
    overflow: 'scroll',
  },
  innerWrapHorizon: {
    flex: 1,
    flexDirection: 'row',
  },
  imageWrap: {
    // flex: 1,
    minHeight: 104,
  },
  contentWrap: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 16,
  },
  contentWrapHorizon: {
    paddingVertical: 0,
    paddingLeft: 8,
    paddingRight: 0,
  },

  /************* Image **************/
  cardImage: {
    width: '100%',
    height: 104,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    flex: 1,
  },
  cardImageHorizon: {
    height: 124,
    borderRadius: 12,
  },
  badge: {
    position: 'absolute',
    left: 16,
    top: 0,
    backgroundColor: color.primary.main,
    width: 46,
    height: 38,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeRed: {
    backgroundColor: '#f2453d',
  },
  badgeLabel: {
    top: -3,
    fontSize: 9,
    color: '#fff',
  },

  /************* Contents **************/
  // Label
  label: {
    width: 29,
    height: 15,
    borderWidth: 1,
    marginRight: 2,
    borderStyle: 'solid',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  labelPrimary: {
    borderColor: color.primary.main,
  },
  labelBlue: {
    borderColor: color.tertiary_02.main,
  },
  labelGreen: {
    borderColor: color.success.main,
  },
  labelRed: {
    borderColor: color.secondary.main,
  },
  labelGray: {
    borderColor: color.grey._600,
  },
  labelBrow: {
    borderColor: color.brow.main,
  },
  cardAction: {
    flexDirection: 'row',
    marginBottom: 4,
  },

  /************ Line ************** */
  line: {
    borderTopColor: color.line.main,
    borderTopWidth: 1,
    marginTop: 6,
    marginBottom: 6,
  },
});
