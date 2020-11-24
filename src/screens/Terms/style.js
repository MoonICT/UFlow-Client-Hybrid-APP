/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-24 13:57:38
 * @modify date 2020-11-24 17:21:22
 * @desc [description]
 */

import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  appBarTitle: {
    fontSize: 16,
    fontFamily: 'NotoSansCJKkr-Medium',
    color: 'rgba(0, 0, 0, 0.76)',
  },
  container: {
    width: windowWidth,
    height: '100%',
    backgroundColor: 'white',
  },
  content: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  mrL10: {
    marginLeft: 10,
  },
  fontS14: {
    fontSize: 14,
  },
  fontS16: {
    fontSize: 16,
  },

  /**Font */
  fontRegular: {
    fontFamily: 'NotoSansCJKkr-Regular',
  },
  fontMedium: {
    fontFamily: 'NotoSansCJKkr-Medium',
  },
  fontBold: {
    fontFamily: 'NotoSansCJKkr-Bold',
  },

  selectTerms: {
    marginTop: 24,
    // marginBottom: 24,
  },
  titleTerm: {
    margin: 0,
    alignItems: 'stretch',
  },
  contentTerm: {
    alignItems: 'stretch',
    flexWrap: 'wrap',
    color: 'rgba(0, 0, 0, 0.87)',
  },
});
