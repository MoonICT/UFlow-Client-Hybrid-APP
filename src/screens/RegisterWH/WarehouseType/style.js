/**
 * @create
 * @modify
 * @desc [description]
 */

import { StyleSheet, Dimensions } from 'react-native';
import { color } from '@Themes/colors.js';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    padding: 25,
  },
  underlined: {
    borderBottomWidth: 1,
    borderColor: '#d7d7d7',
    width: '100%',
    height: 1,
  },
  image: {
    width: 102,
    height: 120,
  },
  title: {
    lineHeight: 32,
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 12,
  },
  content: {
    lineHeight: 24,
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: 16,
    textAlign: 'center',
  },
  btnType: {
    marginTop: 32,
    marginBottom: 40,
  },
});
