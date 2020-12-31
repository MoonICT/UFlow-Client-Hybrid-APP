/**
 * @create
 * @modify
 * @desc [description]
 */

import { StyleSheet, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: 'white',
  },
  filter: {
    padding: 16,
    paddingBottom: 0,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  listSelect: {
    flexDirection: 'row',
    maxWidth: '100%',
    marginTop: 8,
  },
  selectItem: {
    minWidth: 90,
    marginRight: 6,
  },
  select: {
    color: 'rgba(0, 0, 0, 0.47)',
    paddingRight: 0,
    lineHeight: 20,
    height: 36,
    width: 110,
    fontSize: 14,
  },
  search: {
    padding: 5,
  },
  status: {
    color: 'rgba(0, 0, 0, 0.47)',
    // fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 20,
  },
  statusComplete: {
    color: 'rgba(255, 109, 0, 0.87)',
  },
  titleItem: {
    color: 'rgba(0, 0, 0, 0.87)',
    // fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 24,
  },
  answers: {
    backgroundColor: '#fafafa',
    marginLeft: -16,
    marginRight: -16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 24,
  },
  textContent: {
    color: 'rgba(0, 0, 0, 0.87)',
    // fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 20,
    marginTop: 24,
    marginBottom: 24,
  },
  textAnswers: {
    color: 'rgba(0, 0, 0, 0.87)',
    // fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 20,
  },
  answerContents: {
    borderTopWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    paddingTop: 16,
    paddingBottom: 16,
  },
  hyphen: {
    marginLeft: 2,
    marginRight: 2,
    lineHeight: 56,
  },
  row: {
    flexDirection: 'row',
  },
  select: {
    height: 56,
    lineHeight: 20,
    fontSize: 14,
    fontStyle: 'normal',
    color: 'rgba(0, 0, 0, 0.47)',
    // backgroundColor: 'red'
  },
  optionSelect: {
    marginLeft: 8,
  },
  selectLong: {
    minWidth: 100,
  },
});
