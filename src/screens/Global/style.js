/**
 * @author [Peter]
 * @email [hoangvanlam9988@mail.com]
 * @create date 2020-11-09 15:29:54
 * @modify date 2020-11-24 19:22:05
 * @desc [description]
 */

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    // paddingLeft: 16,
    // paddingRight: 16,
  },
  progressBarWrap: {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
    right: 0,
  },
  progressBar: {
    width: '100%',
    height: 5,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)'
  }
});
