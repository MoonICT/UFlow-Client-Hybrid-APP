/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-17 06:16:40
 * @modify date 2020-11-24 18:37:30
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
    width: 156,
    display: 'flex',
    alignItems: 'center',
    alignContent: 'stretch',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderStyle: 'solid',
    borderRadius: 15,
    marginBottom: 16,
    shadowColor: 'rgba(0, 0, 0, 0.06)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.01,
    shadowRadius: 3.84,
    elevation: 10,
  },

  content: {
    padding: 16,
    display: 'flex',
    alignItems: 'center',
    alignContent: 'stretch',
  },

  sloganTitle: {
    width: '100%',
    marginTop: 8,
    lineHeight: 15,
    fontWeight: '500',
    letterSpacing: -0.3,
    textAlign: 'center',
  },
});
