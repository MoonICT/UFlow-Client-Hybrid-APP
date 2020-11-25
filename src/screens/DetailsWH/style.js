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
    // padding: 24,
  },
  titleWH: {
    backgroundColor: '#f2453d',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    lineHeight: 12,
    width: 68,
    color: 'white',
    padding: 10,
    paddingTop: 5,
    paddingBottom: 3,
    fontFamily: 'AppleSDGothicNeo-Regular',
    fontSize: 12,
    fontWeight: 'normal',
  },
  describeTitle: {
    lineHeight: 20,
    color: 'rgba(0, 0, 0, 0.54)',
    paddingTop: 8,
    paddingBottom: 4,
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 14,
    fontWeight: 'normal',
  },
  header: {
    lineHeight: 32,
    letterSpacing: -0.5,
    color: '#000000',
    marginBottom: 12,
    paddingTop: 8,
    paddingBottom: 4,
    fontFamily: 'NotoSansCJKkr-Bold',
    fontSize: 24,
    fontWeight: 'normal',
  },
  labels: {
    flexDirection: 'row',
  },
  textlabel: {
    lineHeight: 18,
    letterSpacing: 0,
    color: 'rgba(0, 0, 0, 0.54)',
    marginRight: 4,
    paddingTop: 2,
    paddingLeft: 6,
    paddingRight: 6,
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 12,
    fontWeight: 'normal',
  },
  orange: {
    color: '#ff6d00',
    borderWidth: 1,
    borderColor: '#ff6d00',
  },
  azure: {
    color: '#2196f3',
    borderWidth: 1,
    borderColor: '#2196f3',
  },
  green: {
    color: '#4caf50',
    borderWidth: 1,
    borderColor: '#4caf50',
  },
  gray: {
    color: '#757575',
    borderWidth: 1,
    borderColor: '#757575',
  },
  background: {
    marginLeft: -16,
    marginTop: 24,
    marginBottom: 23,
  },
  iconBackground: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  title: {
    lineHeight: 21,
    letterSpacing: 0,
    color: color.text.primary,
    fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: 16,
    fontWeight: '500',
  },
  titleDescribe: {
    lineHeight: 20,
    letterSpacing: 0,
    color: color.text.secondary,
    marginTop: 8,
    marginBottom: 10,
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 14,
  },
  tabBar: {
    flexDirection: 'row',
    flex: 1,
    alignSelf: 'flex-start',
  },
  btnTabBarLeft: {
    borderWidth: 1,
    borderRightWidth: 0,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  btnTabBarRight: {
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  activeBtn: {
    backgroundColor: '#ff6d00',
    // borderWidth: 0,
  },
  textBtn: {
    lineHeight: 23,
    letterSpacing: 0,
    color: '#000000',
    fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: 13,
    fontWeight: '500',
    paddingTop: 4,
    paddingBottom: 3,
    paddingLeft: 16,
    paddingRight: 13,
  },
  activeText: {
    color: 'white',
  },
 
  imageHeader: {
    width: 50,
    height: 50,
    backgroundColor: '#d8d8d8',
  },
  textHeaderCard: {
    color: color.text.primary,
    lineHeight: 24,
    letterSpacing: 0,
    fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: 16,
    fontWeight: '500',
  },
  bodyCard: {},
  viewBody: {
    padding: 16,
    paddingTop: 0,
  },
  textBodyCard: {
    color: color.text.primary,
    lineHeight: 24,
    letterSpacing: 0,
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 16,
    fontWeight: '500',
  },
  table: {},
  tableRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#e5e5ea',
  },
  tableTitle: {},

  textTable: {
    flex: 2,
    color: color.text.primary,
    padding: 6,
    paddingLeft: 15,
    lineHeight: 20,
    letterSpacing: 0,
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 14,
    fontWeight: '500',
  },
  textLeftTable: {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    flex: 1,
  },
  imageMap: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    height: 218,
  },

  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rightTitle: {},
  btnInquiry: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.5)',
  },
  textInquiry: {
    color: color.text.primary,
    padding: 6,
    paddingLeft: 17,
    paddingRight: 17,
    lineHeight: 24,
    letterSpacing: 0,
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 14,
    fontWeight: '500',
  },
  inquirys: {
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleInquiry: {
    color: 'rgba(0, 0, 0, 0.47)',
    lineHeight: 20,
    letterSpacing: 0,
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 14,
    fontWeight: 'normal',
  },
  titleCompleted: {
    color: 'rgba(255, 109, 0, 0.87)',
  },
  contentInquiry: {
    color: 'rgba(0, 0, 0, 0.87)',
    lineHeight: 20,
    letterSpacing: 0,
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 14,
    fontWeight: 'normal',
  },
  footerInquiry: {
    color: 'rgba(0, 0, 0, 0.47)',
    marginTop: 2,
    lineHeight: 20,
    letterSpacing: 0,
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 14,
    fontWeight: 'normal',
  },
  detailInquiry: {
    width: '100%',
    marginTop: 24,
  },
  textDetail: {
    color: 'rgba(0, 0, 0, 0.87)',
    lineHeight: 20,
    letterSpacing: 0,
    fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 14,
    fontWeight: 'normal',
  },
  textViewAll: {
    color: '#000000',
    padding: 14,
    lineHeight: 24,
    letterSpacing: 0,
    fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  mainProductList: {
    marginTop: 24,
    marginBottom: 24,
  },
});
