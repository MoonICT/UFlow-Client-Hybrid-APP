/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-09 15:58:28
 * @modify date 2020-11-16 18:43:31
 * @desc [description]
 */

import {StyleSheet} from 'react-native';
import {color} from '@Themes/colors';

export const styles = StyleSheet.create({
  font9: {
    fontSize: 9,
  },
  font14: {
    fontSize: 14,
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

  //colors
  defaultColor: {
    color: color.primary.main,
  },
  blueColor: {
    color: color.tertiary_02.main,
  },
  greenColor: {
    color: color.success.main,
  },
  grayColor: {
    color: color.grey._600,
  },

  //border
  blueActionBTN: {
    borderColor: color.tertiary_02.main,
    borderStyle: 'solid',
    marginLeft: 2,
  },
  greenActionBTN: {
    borderColor: color.success.main,
    borderStyle: 'solid',
    marginLeft: 2,
  },
  grayActionBTN: {
    borderColor: color.grey._600,
    borderStyle: 'solid',
    marginLeft: 2,
  },

  container: {
    borderRadius: 12,
    height: 261,
    overflow: 'hidden',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: 'rgba(0, 0, 0, 0.06)',
    shadowOpacity: 20,
    shadowRadius: 12,
    elevation: 8,
  },

  content: {
    padding: 16,
    display: 'flex',
  },
  cardImage: {
    width: '100%',
    height: 104,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  typeTitle: {
    color: 'rgba(0, 0, 0, 0.54)',
    margin: 0,
    padding: 0,
    lineHeight: 11,
  },
  titleType: {
    color: 'rgba(0, 0, 0, 0.87)',
    margin: 0,
    lineHeight: 22,
  },
  contentTitle: {
    color: 'rgba(0, 0, 0, 0.54)',
    lineHeight: 13,
  },
  contentBottomTitle: {
    marginTop: 22,
  },
  cardAction: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardActionTypeBTN: {
    width: 29,
    height: 15,
    fontSize: 9,
    borderWidth: 1,
    borderColor: color.primary.main,
    borderStyle: 'solid',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});
