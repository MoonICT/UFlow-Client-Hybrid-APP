/**
 * @author [Deokin]
 * @modify date 2020-11-13
 */

import { StyleSheet } from 'react-native';
import { theme } from '@Themes';

export const styles = StyleSheet.create({
  swipeBar: {
    paddingTop: 6,
    paddingBottom: 18,
    alignItems: 'center',
  },
  bar: {
    width: 30,
    height: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
  },
  /******** Bottom Sheet **********/
  sheetHandleBar: {
    backgroundColor: '#e0e0e0',
    width: 30,
    height: 5,
  },
  sheetContent:{
    // backgroundColor: 'red',
    marginTop: 30,
  },
  /******** List **********/
  counterText: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.87)',
    lineHeight: 20,
    marginBottom: 12,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1);',
    marginVertical: 16,
  },
});
