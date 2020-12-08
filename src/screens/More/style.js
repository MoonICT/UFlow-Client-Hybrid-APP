import { StyleSheet, Dimensions } from 'react-native';

import { color } from '@Themes/colors';

const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: '100%',
    backgroundColor: 'white',
  },
  infoUser: {
    borderWidth: 0,
    borderColor: '#d7d7d7',
    borderRadius: 8,
    borderBottomRightRadius: 35,
    borderTopRightRadius: 35,
    paddingTop: 14,
    paddingBottom: 14,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.06,
    shadowRadius: 1,
    elevation: 3,
  },
  textInfo: {
    color: '#000',
    fontWeight: '500',
    fontFamily: 'NotoSansCJKkr-Medium',
  },
  listPage: {
    padding: 0,
  },
  textTitle: {
    marginTop: 24,
    marginLeft: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconItem: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  footerMore: {
    backgroundColor: '#fafafa',
    paddingBottom: 40,
  },
  textLogout: {
    color: 'rgba(0, 0, 0, 0.47)',
    fontWeight: '500',
    fontFamily: 'NotoSansCJKkr-Medium',
    fontSize: 14,
    lineHeight: 48,
    paddingLeft: 16,
  },
});
