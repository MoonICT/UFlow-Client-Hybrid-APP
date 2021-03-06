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
    paddingBottom: 32,
  },
  bodyView: {
    padding: 16,
  },
  textContent: {
    fontSize: 14,
    fontStyle: 'normal',
    color: 'rgba(0, 0, 0, 0.87)',
    lineHeight: 20,
    marginTop: 24,
  },
  viewSearch: {
    padding: 16,
  },
  searchInput: {
    lineHeight: 24,
  },
  title: {
    lineHeight: 20,
    fontSize: 14,
  },
  descript:{
    color: 'rgba(0, 0, 0, 0.87)',
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 14,
    fontStyle: 'normal',
  },
  divider: {
    height: 1,
    backgroundColor: '#d7d7d7',
  }
});
