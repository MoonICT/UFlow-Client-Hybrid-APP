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
    height: windowHeight - 30,
    backgroundColor: 'white',
  },
  bodyView: {
    padding: 16,
  },
  textContent: {
    // fontFamily: 'NotoSansCJKkr-Regular',
    fontSize: 14,
    fontStyle: 'normal',
    color: 'rgba(0, 0, 0, 0.87)',
    lineHeight: 20,
    marginTop: 24,
  },
  contentQuestion:{
    fontSize: 12,
  },
  titleQuestion:{
    margin: 0,
    textAlign: 'center'
  },
  headerButon:{
    // color: 'rgba(0, 0, 0, 0.47)',
    color: '#ff6d00',
  },
});
